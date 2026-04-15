#!/usr/bin/env bun

import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { spawnSync } from "node:child_process";

const [category, project, target] = Bun.argv.slice(2);

if (!category || !project || !target) {
  console.error("Usage: bun scripts/run-app.ts <category> <project> <frontend|backend>");
  process.exit(1);
}

if (target !== "frontend" && target !== "backend") {
  console.error(`Unknown target: ${target}`);
  process.exit(1);
}

const appDir = resolve(import.meta.dir, "..", "apps", category, project);

if (!existsSync(appDir)) {
  console.error(`App not found: ${appDir}`);
  process.exit(1);
}

const result = spawnSync("bun", ["run", `${target}:dev`], {
  cwd: appDir,
  stdio: "inherit",
});

if (result.error) {
  console.error(result.error.message);
  process.exit(1);
}

process.exit(result.status ?? 1);
