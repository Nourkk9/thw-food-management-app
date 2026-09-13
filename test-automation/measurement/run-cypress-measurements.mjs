import { spawnSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { performance } from "node:perf_hooks";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Zentrale Einstellungen der Messung
const config = {
  runs: 50,
  browser: "chrome",
  spec: "cypress/e2e/material-einkaufsliste.cy.js",
};

const cypressDir = path.resolve(__dirname, "../cypress");

const resultsDir = path.resolve(
  __dirname,
  "results/cypress/cypress_official_2026-09-12"
);

mkdirSync(resultsDir, { recursive: true });

const results = [];

for (let run = 1; run <= config.runs; run++) {
    const start = performance.now();
    const cypressCli = path.join(
    cypressDir,
    "node_modules",
    "cypress",
    "bin",
    "cypress"
    );

    const execution = spawnSync(
    process.execPath,
    [
        cypressCli,
        "run",
        "--headless",
        "--browser",
        config.browser,
        "--spec",
        config.spec,
    ],
    {
        cwd: cypressDir,
        encoding: "utf8",
    }
);

  const durationMs = Math.round(performance.now() - start);
  const result = execution.status === 0 ? "PASS" : "FAIL";

  // Vollständige Ausgabe des einzelnen Testlaufs speichern
  const log = [
  execution.stdout ?? "",
  execution.stderr ?? "",
  execution.error ? `Process error: ${execution.error.message}` : "",
].join("\n");

  writeFileSync(
    path.join(resultsDir, `run-${String(run).padStart(2, "0")}.log`),
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

// Messergebnisse als CSV speichern
const csv = [
  "Run;Result;DurationMs",
  ...results.map(
    (result) =>
      `${result.run};${result.result};${result.durationMs}`
  ),
].join("\n");

writeFileSync(
  path.join(resultsDir, "cypress-measurements.csv"),
  csv
);

console.log("\nMessung abgeschlossen.");