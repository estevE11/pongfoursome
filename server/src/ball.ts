import Vector from './vector.ts';
        
export default class Ball {
    private position: Vector;
    private velocity: Vector;
    private radious: Vector;

    constructor() {
        this.radious = 5;
        this.position = new Vector(800/2-this.radious, 600/2-this.radious);
        this.velocity = new Vector(1, 1);
    }

    public update() {
        this.position.add(this.velocity);
    }

    public getPosition(): Vector {
        return this.position;
    }
}