import { WebSocketClient, WebSocketServer } from "https://deno.land/x/websocket@v0.1.4/mod.ts";
import { generate } from "https://deno.land/std@0.188.0/uuid/v1.ts";
import Game from './game.ts';
import Player from './player.ts';
import Vector from './vector.ts';

var game: Game = new Game();

const wss = new WebSocketServer(8080);
wss.on("connection", function (ws: WebSocketClient) {
  game.addPlayer(new Player(0, ws, new Vector(0, 0)));
  ws.on("message", function (message: string) {
    console.log("client message: " + message);
    game.broadcast(message);
  });
});

