import Player from './player.ts';
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

    public broadcast(message: any): void {
        this.players.forEach((player: Player) => {
            console.log("sending message");
            player.socket.send(JSON.stringify(message));
        });
    }
}