const express = require('express');
const http = require('http');
const WebSocket = require('ws'); 
const socketServer = WebSocket.Server;

const app = express();
const server = http.createServer(app);
const webSocketServer = new socketServer ({ server });


const Port = 3000;

server.listen(Port, function () {
    console.log(`Server is running on http://localhost:${Port}`);
});

app.use('/', express.static('Views'));

webSocketServer.on('connection', function (ws) {
  console.log('A user is connected');

  ws.send('Welcome to the chat!');
  //ws.send(JSON.stringify({ text: 'Hello, client!' }));

  ws.on('message', function (message) {
    console.log(`Received message: ${message}`);
     messageSend=message.toString();
    webSocketServer.clients.forEach(function (client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        try {
          client.send(messageSend);
        } catch (error) {
          console.error('Error broadcasting message:', error);
        }
      }
    });
  });

  ws.on('close', function () {
    console.log('User disconnected');
  });
});
