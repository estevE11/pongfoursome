import { WebSocketClient } from 'https://deno.land/x/websocket@v0.1.4/mod.ts';
export enum MessageType {
    CONNECT = "CONNECT",
    GAME = "GAME",
    CHAT = "CHAT"
}

export type Message = {
    type: MessageType,
    data: object 
};

export function parseMessage(message: string): Message {
    const json = JSON.parse(message);
    json.type = json.type.toUpperCase() as MessageType;
    return json as Message;
}

export function createConnectResponse(id: string, x: number): Message {
    return {
        type: MessageType.CONNECT,
        data: {
            id: id,
            x: x
        }
    };
}

export function createChatResponse(username: string, message: string): Message {
    return {
        type: MessageType.CHAT,
        data: {
            username: username,
            message: message
        }
    };
}

export function createGameResponse(players: Player[]): Message {
    const positions = players.map((player: Player) => {
        return {
            id: player.getID(),
            x: player.getPosition().x,
            y: player.getPosition().y
        }
    })
    return {
        type: MessageType.GAME,
        data: {
            players: positions
        }
    }
}