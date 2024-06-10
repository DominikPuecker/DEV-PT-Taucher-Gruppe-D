const assert = require('assert');
const http = require('http');
const app = require('../src/index');

describe('Notes API', () => {
  /*check GET '/'
    check Statuscode 200 
    check response 'Hello World!'
  */
  describe('GET /', () => {
    it('Return Hello World', (done) => {
      http.get('http://localhost:3000/', (res) => {
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => {
          assert.strictEqual(res.statusCode, 200); 
          assert.strictEqual(data, '<h1>Hello World!</h1>'); 
          done();
        });
      });
    });
  });

  /*check GET '/api/notes'
    check Statuscode 200 
    check response is Array'
    check Array.lenght = 3 (3 Notes) 
  */
  describe('GET /api/notes', () => {
    it('Return all notes', (done) => {
      http.get('http://localhost:3000/api/notes', (res) => {
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => {
          const notes = JSON.parse(data);
          assert.strictEqual(res.statusCode, 200);
          assert(Array.isArray(notes));
          assert.strictEqual(notes.length, 3);
          done();
        });
      });
    });
  });

   /*check GET '/api/notes/:id'
    check Statuscode 200 
    check response is NoteID' 
    check response 404
  */
  describe('GET /api/notes/:id', () => {
    it('Return a note by the given id 1', (done) => {
      const id = 1;
      http.get(`http://localhost:3000/api/notes/${id}`, (res) => {
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => {
          const note = JSON.parse(data);
          assert.strictEqual(res.statusCode, 200);
          assert.strictEqual(note.id, id);
          done();
        });
      });
    });

    it('Return 404 note not found id 999', (done) => {
      const id = 999;
      http.get(`http://localhost:3000/api/notes/${id}`, (res) => {
        assert.strictEqual(res.statusCode, 404);
        done();
      });
    });
  });

  /*check POST '/api/notes'
    check Statuscode 200 
    check created content = send content
    check important = important note 
    check NoteID = NoteID
    check Statuscode 400
  */
  describe('POST /api/notes', () => {
    it('Create a new note', (done) => {
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
          assert.strictEqual(res.statusCode, 200);
          assert.deepStrictEqual(createdNote.content, newNote.content);
          assert.deepStrictEqual(createdNote.important, newNote.important);
          assert(createdNote.id);
          done();
        });
      });

      req.write(postData);
      req.end();
    });

    it('Return 400 if content is missing', (done) => {
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
        assert.strictEqual(res.statusCode, 400);
        done();
      });

      req.write(postData);
      req.end();
    });
  });

  /*check Delete '/api/notes/:id'
    check Statuscode 204 if note is deleted 
  */
  describe('DELETE /api/notes/:id', () => {
    it('Delete note by id', (done) => {
      const id = 1;
      const options = {
        hostname: 'localhost',
        port: 3000,
        path: `/api/notes/${id}`,
        method: 'DELETE',
      };

      const req = http.request(options, (res) => {
        assert.strictEqual(res.statusCode, 204);
        done();
      });

      req.end();
    });
  });

  /* Funktion zum Herunterfahren des Servers
    Wait 2 sek to display Teststatus
  */
  const shutdownServer = () => {
    console.log('Server wird heruntergefahren...');
    process.exit(0);
  };

  after(() => {
    setTimeout(shutdownServer, 2000);
  });
});
