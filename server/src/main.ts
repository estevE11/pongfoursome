import { WebSocketClient, WebSocketServer } from "https://deno.land/x/websocket@v0.1.4/mod.ts";
import { generate } from "https://deno.land/std@0.188.0/uuid/v1.ts";
import Game from './game.ts';
import Player from './player.ts';
import Vector from './vector.ts';
import { Message, MessageType, createConnectResponse, createChatResponse, parseMessage } from './message.ts';

interface IHandler {
    [key: MessageType]: (data: object) => Message | undefined;
}

const handler: IHandler = {};
handler[MessageType.CONNECT] = handleConnectMessage;
handler[MessageType.CHAT] = handleChatMessage;
handler[MessageType.GAME] = handleGameMessage;

var game: Game = new Game(60);

const wss = new WebSocketServer(8080);
wss.on("connection", function (ws: WebSocketClient) {
    let id;
    ws.on("message", function (message: string) {
        const response = handleMessage(ws, message);
        if (response) {
            if (response.type == MessageType.CONNECT) id = response.data.id;
            ws.send(JSON.stringify(response));
        }
    });

    ws.on("close", function () {
        game.removePlayer(id);
        console.log("connection closed");
    });
});

function handleMessage(ws: WebSocketClient, message: string) {
    const msg: Message = parseMessage(message);
    const func = handler[msg.type];
    return func(ws, msg.data);
}

function handleConnectMessage(ws: WebSocketClient, data: object): Message | undefined {
    const username: string = data.username;
    const player: Player = new Player(ws, username, new Vector(0, 0));
    game.addPlayer(player);
    return createConnectResponse(player.getID(), player.getPosition().x);
}

function handleGameMessage(ws: WebSocketClient, data: object): Message | undefined {
    game.updatePlayer(data.id, data.x, data.y); 
    return;
}

function handleChatMessage(ws: WebSocketClient, data: object): Message | undefined {
    const response: Message = createChatResponse(data.username, data.message);
    game.broadcast(response);
    return;
}