const express = require('express');
const WebSocket = require('ws');
const SocketServer = require('ws').Server;
const uuidv1 = require('uuid/v1');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });


// A callback that will run when a client connects to the server, updating the state of online users
wss.on('connection', (ws) => {
  const initialMessage = {
    type: "initialMessage",
    count: wss.clients.size
  };

  const toSend = JSON.stringify(initialMessage);

  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(toSend);
    }
  });

  ws.on("message", data => {
    const json = JSON.parse(data);

    switch (json.type) {
      case "newMessage":
        const newId = uuidv1();

        const clientMessage = {
          type: "messageAdded",
          id: newId,
          content: json.content,
          username: json.username
        };

        const jsonToSend = JSON.stringify(clientMessage);

        wss.clients.forEach(client => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(jsonToSend);
          }
        });
        break;

      case "notification":

        const clientNotification = {
          type: "postNotification",
          name: json.name
        };

        const sendBack = JSON.stringify(clientNotification);

        wss.clients.forEach(client => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(sendBack);
          }
        });
        break;

      default:
    }
  });

  // Set up a callback for when a client closes the socket, updating the state of online users.
  ws.on('close', () => {
    const disconnectMessage = {
      type: "disconnectMessage",
      numUsers: wss.clients.size
    };

    const disconnectUpdate = JSON.stringify(disconnectMessage);

    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(disconnectUpdate);
      }
    });
  });
});