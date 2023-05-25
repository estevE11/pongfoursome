import Player from './player.ts';
import { Message, createGameResponse} from './message.ts';
import { GameLoop } from './game_loop.ts';

interface IPlayerMap {
    [key: string]: Player;
}

export default class Game {
    private players: IPlayerMap;
    private loop: GameLoop;

    constructor(fps: number) {
        this.players = {};
        console.log(this.players);
        this.loop = new GameLoop(fps);
    }

    public run(): void {
        try {
            this.loop.start((delta: number) => {this.update(delta)});
        } catch (e: any) {
            console.log(e);
        }
    }

    public update(delta: number): void {
        if (!this.players || this.numberOfPlayers() == 0) return;
        const bmsg = createGameResponse(this.getPlayers());
        this.broadcast(bmsg);
    }

    public addPlayer(player: Player): void {
        player.setPosition(0, Math.floor(Math.random()*100));
        this.players[player.id] = player;
        if (this.numberOfPlayers() == 1) {
            this.run();
        }
    }

    public updatePlayer(id: string, x: number, y: number): void {
        this.players[id].setPosition(x, y);
    }

    public broadcast(msg: Message): void {
        Object.keys(this.players).forEach((key: string) => {
            this.players[key].socket.send(JSON.stringify(msg));
        });
    }

    public getPlayers(): Player[] {
        return Object.values(this.players) as Players[];
    }

    private numberOfPlayers(): number {
        return Object.keys(this.players).length; 
    }
}