import Player from './player.ts';
import { Message } from './message.ts';
import { GameLoop } from './game_loop.ts';

export default class Game {
    private players: Player[];
    private loop: GameLoop;

    constructor(fps: number) {
        this.players = [] as Player[];
        this.loop = new GameLoop(fps);
    }

    public run(): void {
        try {
            this.loop.start(this.update);
        } catch (e: any) {
            console.log(e);
        }
    }

    public update(delta: number): void {
        console.log(delta);
    }

    public addPlayer(player: Player): void {
        this.players.push(player);
        if (this.players.length == 1) {
            this.run();
        }
    }

    public broadcast(msg: Message): void {
        this.players.forEach((player: Player) => {
            player.socket.send(JSON.stringify(msg));
            console.log("message sent");
        });
    }
}