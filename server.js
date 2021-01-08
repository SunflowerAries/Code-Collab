const { createServer } = require('http');
const express = require('express');
const WebSocket = require('ws');
const WebSocketJSONStream = require('@teamwork/websocket-json-stream');

const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('./src/utils/jwt');
const errorHandler = require('./src/utils/error-handler');
const { backend } = require('./src/storage/storage.service');

app.use(express.json({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// use JWT auth to secure the api
app.use(jwt());

// api routes
app.use('/auth', require('./src/auth/auth.controller'));
app.use('/docs', require('./src/doc/doc.controller'));
// global error handler
app.use(errorHandler);

// start server
const port = 3000;
const server = createServer(app);

const wss = new WebSocket.Server({server: server});
wss.on('connection', (ws) => {
  var stream = new WebSocketJSONStream(ws);
  backend.listen(stream);
});

server.listen(port, () => console.log(`Server listening on port ${port}`));