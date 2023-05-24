import { WebSocketClient, WebSocketServer } from "https://deno.land/x/websocket@v0.1.4/mod.ts";
import { generate } from "https://deno.land/std@0.188.0/uuid/v1.ts";

let sockets = new Map<String, WebSocket>();

function broadcast(msg: any) {
  sockets.forEach((ws: WebSocket) => {
    ws.send(JSON.stringify(msg));
  });
}

const wss = new WebSocketServer(8080);
wss.on("connection", function (ws: WebSocketClient) {
  const uuid = generate();
  sockets.set(uuid, ws);

  ws.on("message", function (message: string) {
    console.log("client message: " + message);
    broadcast(message);
  });
});

