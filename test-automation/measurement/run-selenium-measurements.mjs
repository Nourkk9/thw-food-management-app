import { spawnSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { performance } from "node:perf_hooks";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const runs = 50;

const seleniumDir = path.resolve(
  __dirname,
  "../selenium"
);

const resultsDir = path.resolve(
  __dirname,
  "results/selenium/selenium_official_2026-09-13"
);

mkdirSync(resultsDir, { recursive: true });

const results = [];

for (let run = 1; run <= runs; run++) {
  const start = performance.now();

  const execution = spawnSync(
    process.execPath,
    ["e2e/material-einkaufsliste.test.js"],
    {
      cwd: seleniumDir,
      encoding: "utf8",
    }
  );

  const durationMs = Math.round(
    performance.now() - start
  );

  const result =
    execution.status === 0 ? "PASS" : "FAIL";

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
    `Run ${run}/${runs}: ${result} - ${durationMs} ms`
  );
}

const csv = [
  "Run;Result;DurationMs",
  ...results.map(
    ({ run, result, durationMs }) =>
      `${run};${result};${durationMs}`
  ),
].join("\n");

writeFileSync(
  path.join(resultsDir, "selenium-measurements.csv"),
  csv
);

console.log("\nMessung abgeschlossen.");