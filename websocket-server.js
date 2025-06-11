const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: process.env.PORT || 10000 });

let clients = [];

wss.on('connection', (ws) => {
  clients.push(ws);
  ws.on('message', (msg) => {
    // Broadcast to all other clients
    for (const client of clients) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(msg);
      }
    }
  });

  ws.on('close', () => {
    clients = clients.filter(c => c !== ws);
  });
});

console.log("WebSocket server running...");
