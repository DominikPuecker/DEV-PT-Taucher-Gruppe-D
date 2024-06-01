const express = require('express');
const assert = require('assert');
const http = require('http');
const app = require('../src/index');

describe('Notes API', () => {
  // Testfall für die GET-Anfrage auf die Startseite '/'
  describe('GET /', () => {
    it('should return Hello World', (done) => {
      http.get('http://localhost:3000/', (res) => {
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => {
          assert.strictEqual(res.statusCode, 200); // Statuscode sollte 200 sein
          assert.strictEqual(data, '<h1>Hello World!</h1>'); // Antwort sollte 'Hello World!' sein
          done();
        });
      });
    });
  });

  // Testfall für die GET-Anfrage auf der '/api/notes'-Route
  describe('GET /api/notes', () => {
    it('should return all notes', (done) => {
      http.get('http://localhost:3000/api/notes', (res) => {
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => {
          const notes = JSON.parse(data);
          assert.strictEqual(res.statusCode, 200); // Statuscode sollte 200 sein
          assert(Array.isArray(notes)); // Antwort sollte ein Array sein
          assert.strictEqual(notes.length, 3); // Es sollten 3 Notizen zurückgegeben werden
          done();
        });
      });
    });
  });

  // Testfall für die GET-Anfrage auf der '/api/notes/:id'-Route
  describe('GET /api/notes/:id', () => {
    it('should return a note by the given id', (done) => {
      const id = 1;
      http.get(`http://localhost:3000/api/notes/${id}`, (res) => {
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => {
          const note = JSON.parse(data);
          assert.strictEqual(res.statusCode, 200); // Statuscode sollte 200 sein
          assert.strictEqual(note.id, id); // Die zurückgegebene Notiz sollte die erwartete ID haben
          done();
        });
      });
    });

    it('should return 404 if note is not found', (done) => {
      const id = 999;
      http.get(`http://localhost:3000/api/notes/${id}`, (res) => {
        assert.strictEqual(res.statusCode, 404); // Statuscode sollte 404 sein, wenn die Notiz nicht gefunden wurde
        done();
      });
    });
  });

  // Testfall für die POST-Anfrage auf der '/api/notes'-Route
  describe('POST /api/notes', () => {
    it('should create a new note', (done) => {
      const newNote = {
        content: 'Test note',
        important: true,
      };
      const postData = JSON.stringify(newNote);

      const options = {
        hostname: 'localhost',
        port: 3000,
        path: '/api/notes',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(postData),
        },
      };

      const req = http.request(options, (res) => {
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => {
          const createdNote = JSON.parse(data);
          assert.strictEqual(res.statusCode, 200); // Statuscode sollte 200 sein
          assert.deepStrictEqual(createdNote.content, newNote.content); // Inhalt der erstellten Notiz sollte dem erwarteten Inhalt entsprechen
          assert.deepStrictEqual(createdNote.important, newNote.important); // Wichtigkeit der erstellten Notiz sollte der erwarteten Wichtigkeit entsprechen
          assert(createdNote.id); // Die erstellte Notiz sollte eine ID haben
          done();
        });
      });

      req.write(postData);
      req.end();
    });

    it('should return 400 if content is missing', (done) => {
      const newNote = {
        important: true,
      };
      const postData = JSON.stringify(newNote);

      const options = {
        hostname: 'localhost',
        port: 3000,
        path: '/api/notes',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(postData),
        },
      };

      const req = http.request(options, (res) => {
        assert.strictEqual(res.statusCode, 400); // Statuscode sollte 400 sein, wenn der Inhalt fehlt
        done();
      });

      req.write(postData);
      req.end();
    });
  });

  // Testfall für die DELETE-Anfrage auf der '/api/notes/:id'-Route
  describe('DELETE /api/notes/:id', () => {
    it('should delete a note by the given id', (done) => {
      const id = 1;
      const options = {
        hostname: 'localhost',
        port: 3000,
        path: `/api/notes/${id}`,
        method: 'DELETE',
      };

      const req = http.request(options, (res) => {
        assert.strictEqual(res.statusCode, 204); // Statuscode sollte 204 sein, wenn die Notiz erfolgreich gelöscht wurde
        done();
      });

      req.end();
    });
  });

  // Funktion zum Herunterfahren des Servers
  const shutdownServer = () => {
    console.log('Server wird heruntergefahren...');
    process.exit(0); // Beende den Prozess mit Erfolg (0)
  };

  // Nachdem alle Tests ausgeführt wurden, rufe die Funktion zum Herunterfahren des Servers auf
  after(() => {
    setTimeout(shutdownServer, 2000); // Warte 2 Sekunden, bevor der Server heruntergefahren wird um passing der tests anzuzeigen
  });
});
