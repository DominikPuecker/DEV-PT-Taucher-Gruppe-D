# ESLint-Konfiguration

Die ESLint-Konfiguration wurde wie folgt festgelegt:

```javascript
import eslintPluginJs from '@stylistic/eslint-plugin-js';
import globals from 'globals'; // Ensure 'globals' is installed and imported correctly

export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      parserOptions: {
        sourceType: "script",
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    ...eslintPluginJs.configs.recommended,
  },
];
```

Diese Konfiguration ermöglicht die statische Analyse von JavaScript-Dateien gemäß den empfohlenen Regeln von ESLint und berücksichtigt globale Variablen aus Browser- und Node.js-Umgebungen.

## Durchgeführte Tests

Die Tests für die Notes API decken verschiedene Aspekte der API-Endpunkte ab und stellen sicher, dass sie wie erwartet funktionieren.

GET /: Überprüft, ob die Startseite die erwartete Antwort "Hello World!" zurückgibt und ob der Statuscode 200 ist.

GET /api/notes: Überprüft, ob alle Notizen korrekt zurückgegeben werden und ob der Statuscode 200 ist. Es wird auch überprüft, ob die Antwort ein Array ist und ob die Anzahl der zurückgegebenen Notizen korrekt ist.

GET /api/notes/:id: Überprüft, ob eine Notiz anhand der ID korrekt zurückgegeben wird und ob der Statuscode 200 ist. Wenn die Notiz nicht gefunden wird, sollte der Statuscode 404 sein.

POST /api/notes: Überprüft, ob eine neue Notiz erfolgreich erstellt wird und ob der Statuscode 200 ist. Es wird auch überprüft, ob der Inhalt und die Wichtigkeit der erstellten Notiz korrekt sind. Wenn der Inhalt fehlt, sollte der Statuscode 400 sein.

DELETE /api/notes/:id: Überprüft, ob eine Notiz erfolgreich anhand der ID gelöscht wird und ob der Statuscode 204 ist.

Nachdem alle Tests ausgeführt wurden, wird der Server heruntergefahren, um den Testlauf abzuschließen.

Diese Tests gewährleisten, dass die Notes API ordnungsgemäß funktioniert und die erwarteten Ergebnisse liefert.

## Starten der Tests mit npx

Um die Tests mit `npx` zu starten wird folgender Befehl verwendet:

```
npx mocha
```
Dies führt die Mocha-Tests aus, die in den Testdateien definiert sind.

## Ausgabe von Mocha-Tests in JSON

Um die Mocha-Tests in JSON auszugeben, kannst du den entsprechenden Reporter verwenden. Zum Beispiel:

```
npx mocha test/index.test.js --reporter json > test-report.json
```

Dieser Befehl exportiert den Testbericht im JSON-Format in die Datei `test-report.json`.

## package.json "type" auf "commonjs" setzen

In der `package.json` wurde der Typ auf "commonjs" gesetzt, um anzugeben, dass es sich um eine CommonJS-Anwendung handelt. Dies ist wichtig, um sicherzustellen, dass Node.js die Module entsprechend interpretiert.
