export default class Vector {
    public x: number = 0;
    public y: number = 0;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public add(vec: Vector) {
        this.x += vec.x;
        this.y += vec.y;
    }
}