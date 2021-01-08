const ShareDB = require('sharedb');
const WebSocket = require('ws');
const WebSocketJSONStream = require('@teamwork/websocket-json-stream');

const storage = require('sharedb-mongo')('mongodb://localhost:27017/test');

module.exports = {
    backend,
    createDoc
};

async function 

createDoc(startServer);

const backend = new ShareDB({db});

// Create initial document then fire callback
function createDoc() {
  var connection = backend.connect();
  var doc = connection.get('collab', 'textarea');
  doc.fetch(function(err) {
    if (err) throw err;
    if (doc.type === null) {
      doc.create({content: ''}, callback);
      return;
    }
  });
}
