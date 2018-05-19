// server.js

const express = require('express');
const SocketServer = require('ws');
const uuidv1 = require('uuid/v1');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer.Server({ server });



  wss.broadcast = function broadcast(data) {
    wss.clients.forEach(function each(client) {
      if (client.readyState === SocketServer.OPEN) {
        client.send(data);
      }
    });
  };

function getRandomColor() {
  var color = ["DarkCyan", "PaleVioletRed", "RosyBrown", "MediumSpringGreen", "MidnightBlue", "LightSlateGray"];
  for (var i = 0; i < 4; i++) {
    pickedColor = color[Math.floor(Math.random() * 6)];
  }
  return pickedColor;
}



// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
let counter = 0;
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log("server side", getRandomColor());
  // const serverColor = JSON.stringify({type: "colorType", color: getRandomColor()});
  const serverColor = getRandomColor();
  counter++;
  const countObj = {type:"counterType", counter:counter};
  console.log('Client connected');
  wss.broadcast(JSON.stringify(countObj));

  //send to the client its assigned color
  ws.send(JSON.stringify({type: "colorType", color: getRandomColor()}));

  ws.on('message', function incoming(message) {
    const received = JSON.parse(message);
    let obj = {};

    if(received.type === "postMessage"){
       obj = {
        type: "incomingMessage",
        id: uuidv1(),
        username: received.username,
        content: received.messages,
        color: received.color,
        };
      }else{
      obj = {
        type: "incomingNotification",
        id: uuidv1(),
        currentUser: received.currentUser,
        prevUser: received.prevUser,
      };
    }
    wss.broadcast(JSON.stringify(obj));
  });

  // Set up a callback for when a client closes the socket. This usually means they clo;sed their browser.
  ws.on('close', () => {
    counter--;
    const countObj = {type:"counterType", counter:counter};
    wss.broadcast(JSON.stringify(countObj));
    console.log('Client disconnected');
    console.log(countObj);
  });
});
