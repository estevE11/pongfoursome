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

export function createConnectResponse(id: string): Message {
    return {
        type: MessageType.CONNECT,
        data: {
            id: id
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