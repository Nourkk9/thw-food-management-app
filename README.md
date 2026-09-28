# THW Food Management App – System under Test

Dieses Repository enthält die Webanwendung, die im Rahmen meiner Bachelorarbeit als
System under Test (SUT) verwendet wurde, sowie die dazugehörigen
Testautomatisierungsprojekte für Cypress, Playwright und Selenium.

## Bachelorarbeit

**Thema:**  
Bestimmung des geeignetsten Frontend-Testautomatisierungsframeworks auf Basis
empirischer und technischer Kriterien im definierten Unternehmenskontext.

Die Anwendung wurde lokal ausgeführt, damit für alle drei untersuchten Frameworks
dieselbe Anwendung, dieselben Testdaten und dieselben Testbedingungen verwendet
werden konnten.

## Repository-Struktur

```text
.
├── .github/workflows/
├── public/
├── src/
├── test-automation/
│   ├── cypress/
│   ├── measurement/
│   ├── playwright/
│   └── selenium/
├── package.json
└── package-lock.json
```
## Webanwendung

Die Webanwendung befindet sich hauptsächlich im Verzeichnis `src/`.

## Testautomatisierung

Im Verzeichnis `test-automation/` befinden sich die Implementierungen der drei im Rahmen
der Bachelorarbeit untersuchten Frameworks:

- Cypress
- Playwright
- Selenium

Das Verzeichnis `measurement/` enthält Skripte und Dateien für die technische
Messdurchführung.

## GitHub Actions

Unter `.github/workflows/` befinden sich die im Rahmen der Untersuchung verwendeten
CI-Workflows für Cypress, Playwright und Selenium.

Dazu gehören:
- reguläre CI-Ausführungen,
- kontrollierte Fehlerszenarien,
- Parallelisierungstests.

## Anwendung lokal starten

Abhängigkeiten installieren:

```bash
npm install
```
Anwendung starten:

```bash
npm run dev
```
Die Anwendung ist anschließend standardmäßig unter folgendem lokalen Endpunkt
erreichbar: 
```text
http://localhost:3000
```

## Nachvollziehbarkeit der Untersuchung

Die drei Frameworks wurden gegen dieselbe lokal ausgeführte Webanwendung eingesetzt.
Die detaillierte Beschreibung der Testfälle, der Testumgebung, der Messdurchführung
und der Ergebnisse ist Bestandteil der Bachelorarbeit und ihres Anhangs.
Dieses Repository dient der technischen Nachvollziehbarkeit der beschriebenen
praktischen Untersuchung.
