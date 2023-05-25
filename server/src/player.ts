import { WebSocketClient, WebSocketServer } from 'https://deno.land/x/websocket@v0.1.4/mod.ts';
import Vector from './vector.ts';
import { generate } from 'https://deno.land/std@0.188.0/uuid/v1.ts';

export default class Player {
    private id: string;
    private socket: WebSocket;
    private position: Vector;
    private username: string;

    constructor(socket: WebSocket, username: string, position: Vector) {
        this.id = generate();
        this.socket = socket;
        this.position = position;
        this.username = username;
    }

    public move(x: number, y: number): void {
        this.position.x = x;
        this.position.y = y;
    }

    public getID(): string {
        return this.id;
    }

    public getPosition(): Vector {
        return this.position;
    }

    public getSocket(): WebSocket {
        return this.socket;
    }
}