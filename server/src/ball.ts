import Vector from './vector.ts';
import { Rect } from './geometry.ts';
import { CANVAS_WIDTH, CANVAS_HEIGHT } from './main.ts';
        
export default class Ball implements Rect {
    private position: Vector;
    private velocity: Vector;
    private radious: Vector;

    constructor() {
        this.radious = 5;
        this.position = new Vector(800/2-this.radious, 600/2-this.radious);
        this.velocity = new Vector(5, 1);
    }

    public update() {
        this.position.add(this.velocity);

        if (this.position.x < 0) this.velocity.x *= -1;
        if (this.position.x + this.radious*2 > CANVAS_WIDTH) this.velocity.x *= -1;
        if (this.position.y < 0) this.velocity.y *= -1;
        if (this.position.y + this.radious*2 > CANVAS_HEIGHT) this.velocity.y *= -1;
    }

    public onCollide(): void {
        this.velocity.x *= -1;
    }

    public getPosition(): Vector {
        return this.position;
    }
}