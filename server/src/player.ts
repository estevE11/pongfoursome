import { WebSocketClient, WebSocketServer } from 'https://deno.land/x/websocket@v0.1.4/mod.ts';
import Vector from './vector.ts';

export default class Player {
    private id: number;
    private socket: WebSocket;
    private position: Vector;

    constructor(id: number, socket: WebSocket, position: Vector) {
        this.id = id;
        this.socket = socket;
        this.position = position;
    }

    public move(x: number, y: number): void {
        this.position.x = x;
        this.position.y = y;
    }

    public getSocket(): WebSocket {
        return this.socket;
    }
}