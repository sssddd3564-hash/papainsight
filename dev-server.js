const http = require("http");
const fs = require("fs");
const path = require("path");
const zlib = require("zlib");

const port = 4175;
const root = __dirname;
const dataDir = path.join(root, "data");
const materialsStatePath = path.join(dataDir, "materials-state.json");
const materialAssetsDir = path.join(dataDir, "material-assets");
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".pdf": "application/pdf",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".mov": "video/quicktime",
  ".ico": "image/x-icon",
};

function ensureMaterialsState() {
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
  if (!fs.existsSync(materialAssetsDir)) fs.mkdirSync(materialAssetsDir, { recursive: true });
  if (!fs.existsSync(materialsStatePath)) {
    fs.writeFileSync(
      materialsStatePath,
      JSON.stringify({ materials: [], deletedAssetIds: [], deleteLogs: [] }, null, 2),
    );
  }
}

function getExtensionFromMime(mimeType = "") {
  if (mimeType.includes("jpeg")) return "jpg";
  if (mimeType.includes("png")) return "png";
  if (mimeType.includes("webp")) return "webp";
  if (mimeType.includes("gif")) return "gif";
  if (mimeType.includes("pdf")) return "pdf";
  if (mimeType.includes("mp4")) return "mp4";
  if (mimeType.includes("webm")) return "webm";
  if (mimeType.includes("quicktime")) return "mov";
  return "png";
}

function safeFilePart(value = "material") {
  return String(value)
    .replace(/\.[^.]+$/, "")
    .replace(/[^a-zA-Z0-9가-힣_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80) || "material";
}

function extractMaterialAssets(state) {
  ensureMaterialsState();
  const nextState = {
    materials: Array.isArray(state.materials) ? state.materials : [],
    deletedAssetIds: Array.isArray(state.deletedAssetIds) ? state.deletedAssetIds : [],
    deleteLogs: Array.isArray(state.deleteLogs) ? state.deleteLogs : [],
  };
  let changed = false;

  nextState.materials = nextState.materials.map((material) => {
    if (typeof material.image !== "string" || !material.image.startsWith("data:")) return material;

    const match = material.image.match(/^data:([^;]+);base64,(.+)$/);
    if (!match) return material;

    const extension = getExtensionFromMime(match[1]);
    const fileBase = safeFilePart(material.fileName || material.title || material.id);
    const fileName = `${material.id || Date.now()}-${fileBase}.${extension}`;
    const filePath = path.join(materialAssetsDir, fileName);
    fs.writeFileSync(filePath, Buffer.from(match[2], "base64"));
    changed = true;

    const mediaType = match[1].startsWith("video/")
      ? "video"
      : match[1] === "application/pdf"
        ? "pdf"
        : "image";

    return {
      ...material,
      image: `/data/material-assets/${encodeURIComponent(fileName)}`,
      fileName: material.fileName || fileName,
      mimeType: material.mimeType || match[1],
      mediaType: material.mediaType || mediaType,
    };
  });

  return { state: nextState, changed };
}

function readMaterialsState() {
  ensureMaterialsState();
  const rawState = JSON.parse(fs.readFileSync(materialsStatePath, "utf-8"));
  const { state, changed } = extractMaterialAssets(rawState);
  if (changed) fs.writeFileSync(materialsStatePath, JSON.stringify(state, null, 2));
  return state;
}

function writeMaterialsState(state) {
  const normalized = extractMaterialAssets(state).state;
  fs.writeFileSync(materialsStatePath, JSON.stringify(normalized, null, 2));
  return normalized;
}

function sendJson(request, response, statusCode, payload) {
  const body = Buffer.from(JSON.stringify(payload));
  const headers = {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store, max-age=0",
  };

  if ((request.headers["accept-encoding"] || "").includes("gzip")) {
    zlib.gzip(body, (error, compressedBody) => {
      if (error) {
        response.writeHead(500, { "Content-Type": "application/json; charset=utf-8" });
        response.end(JSON.stringify({ ok: false, message: error.message }));
        return;
      }

      response.writeHead(statusCode, {
        ...headers,
        "Content-Encoding": "gzip",
      });
      response.end(compressedBody);
    });
    return;
  }

  response.writeHead(statusCode, headers);
  response.end(body);
}

function readRequestBody(request) {
  return new Promise((resolve, reject) => {
    let body = "";
    request.on("data", (chunk) => {
      body += chunk;
    });
    request.on("end", () => resolve(body));
    request.on("error", reject);
  });
}

async function handleMaterialsApi(request, response) {
  ensureMaterialsState();

  if (request.method === "GET") {
    const state = readMaterialsState();
    sendJson(request, response, 200, state);
    return true;
  }

  if (request.method === "PUT") {
    try {
      const body = await readRequestBody(request);
      const nextState = JSON.parse(body || "{}");
      const safeState = {
        materials: Array.isArray(nextState.materials) ? nextState.materials : [],
        deletedAssetIds: Array.isArray(nextState.deletedAssetIds) ? nextState.deletedAssetIds : [],
        deleteLogs: Array.isArray(nextState.deleteLogs) ? nextState.deleteLogs : [],
      };

      const normalizedState = writeMaterialsState(safeState);
      sendJson(request, response, 200, { ok: true, ...normalizedState });
    } catch (error) {
      sendJson(request, response, 400, { ok: false, message: error.message });
    }
    return true;
  }

  sendJson(request, response, 405, { ok: false, message: "Method not allowed" });
  return true;
}

const server = http.createServer(async (request, response) => {
  const requestedPath = decodeURIComponent(request.url.split("?")[0]);

  if (requestedPath === "/api/materials") {
    await handleMaterialsApi(request, response);
    return;
  }

  if (requestedPath === "/favicon.ico") {
    const faviconPath = path.join(root, "favicon.ico");
    fs.readFile(faviconPath, (error, content) => {
      if (error) {
        response.writeHead(204, { "Cache-Control": "public, max-age=86400" });
        response.end();
        return;
      }
      response.writeHead(200, {
        "Content-Type": "image/x-icon",
        "Cache-Control": "public, max-age=86400",
      });
      response.end(content);
    });
    return;
  }

  const filePath = path.join(root, requestedPath === "/" ? "index.html" : requestedPath);

  if (!filePath.startsWith(root)) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  fs.readFile(filePath, (error, content) => {
    if (error) {
      response.writeHead(404);
      response.end("Not found");
      return;
    }

    response.writeHead(200, {
      "Content-Type": types[path.extname(filePath)] || "application/octet-stream",
      "Cache-Control": "no-store, max-age=0",
    });
    response.end(content);
  });
});

server.listen(port, () => {
  console.log(`Papa Insight MVP running at http://localhost:${port}`);
});
