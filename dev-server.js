const http = require("http");
const fs = require("fs");
const path = require("path");

const port = 4175;
const root = __dirname;
const dataDir = path.join(root, "data");
const materialsStatePath = path.join(dataDir, "materials-state.json");
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
};

function ensureMaterialsState() {
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
  if (!fs.existsSync(materialsStatePath)) {
    fs.writeFileSync(
      materialsStatePath,
      JSON.stringify({ materials: [], deletedAssetIds: [], deleteLogs: [] }, null, 2),
    );
  }
}

function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store, max-age=0",
  });
  response.end(JSON.stringify(payload));
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
    const state = JSON.parse(fs.readFileSync(materialsStatePath, "utf-8"));
    sendJson(response, 200, state);
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

      fs.writeFileSync(materialsStatePath, JSON.stringify(safeState, null, 2));
      sendJson(response, 200, { ok: true, ...safeState });
    } catch (error) {
      sendJson(response, 400, { ok: false, message: error.message });
    }
    return true;
  }

  sendJson(response, 405, { ok: false, message: "Method not allowed" });
  return true;
}

const server = http.createServer(async (request, response) => {
  const requestedPath = decodeURIComponent(request.url.split("?")[0]);

  if (requestedPath === "/api/materials") {
    await handleMaterialsApi(request, response);
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
