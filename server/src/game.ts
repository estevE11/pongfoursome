import Player from './player.ts';
import { Message } from './message.ts';
export default class Game {
    private players: Player[];

    constructor() {
        this.players = [] as Player[];
    }

    public run(): void {

    }

    public loop(): void {

    }

    public update(): void {

    }

    public addPlayer(player: Player): void {
        this.players.push(player);
    }

    public broadcast(msg: Message): void {
        this.players.forEach((player: Player) => {
            player.socket.send(JSON.stringify(msg));
            console.log("message sent");
        });
    }
}