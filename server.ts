import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Mock API for AIOps Metrics
  app.get("/api/metrics", (req, res) => {
    const metrics = {
      cpu: Math.floor(Math.random() * 100),
      memory: Math.floor(Math.random() * 100),
      latency: Math.floor(Math.random() * 200) + 50,
      throughput: Math.floor(Math.random() * 1000) + 500,
      timestamp: new Date().toISOString(),
    };
    res.json(metrics);
  });

  // Mock API for CI/CD Status
  app.get("/api/deployments", (req, res) => {
    res.json([
      { id: "dep-1", service: "auth-api", status: "success", version: "v2.4.1", time: "2m ago" },
      { id: "dep-2", service: "model-server", status: "running", version: "v1.0.5-beta", time: "now" },
      { id: "dep-3", service: "data-pipeline", status: "failed", version: "v0.9.2", time: "15m ago" },
    ]);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
