import { spawnSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { performance } from "node:perf_hooks";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = {
  runs: 50, // Probe-Lauf; danach auf 50 ändern
  spec: "e2e/material-einkaufsliste.spec.js",
};

const playwrightDir = path.resolve(__dirname, "../playwright");

const resultsDir = path.resolve(
  __dirname,
  "results/playwright/playwright_official_2026-09-13"
);

mkdirSync(resultsDir, { recursive: true });

const results = [];

for (let run = 1; run <= config.runs; run++) {
  const start = performance.now();

  const playwrightCli = path.join(
    playwrightDir,
    "node_modules",
    "@playwright",
    "test",
    "cli.js"
  );

  const execution = spawnSync(
    process.execPath,
    [
      playwrightCli,
      "test",
      config.spec,
    ],
    {
      cwd: playwrightDir,
      encoding: "utf8",
    }
  );

  const durationMs = Math.round(performance.now() - start);

  const result = execution.status === 0 ? "PASS" : "FAIL";

  const log = [
    execution.stdout ?? "",
    execution.stderr ?? "",
    execution.error
      ? `Process error: ${execution.error.message}`
      : "",
  ].join("\n");

  writeFileSync(
    path.join(
      resultsDir,
      `run-${String(run).padStart(2, "0")}.log`
    ),
    log
  );

  results.push({
    run,
    result,
    durationMs,
  });

  console.log(
    `Run ${run}/${config.runs}: ${result} - ${durationMs} ms`
  );
}

const csv = [
  "Run;Result;DurationMs",
  ...results.map(
    (result) =>
      `${result.run};${result.result};${result.durationMs}`
  ),
].join("\n");

writeFileSync(
  path.join(resultsDir, "playwright-measurements.csv"),
  csv
);

console.log("\nMessung abgeschlossen.");