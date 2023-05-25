export interface Circle {
    position: Vector;
    radious: number;
}

export interface Rect {
    position: Vector;
    w: number;
    h: number;
}

export function checkCircleRectangle(circle: Circle, rect: Rect): boolean {
    const distX = Math.abs(circle.position.x - rect.position.x - rect.w / 2);
    const distY = Math.abs(circle.position.y - rect.position.y - rect.h / 2);

    if (distX > (rect.w / 2 + circle.radious)) {
        return false;
    }
    if (distY > (rect.h / 2 + circle.radious)) {
        return false;
    }

    if (distX <= (rect.w / 2)) {
        return true;
    }
    if (distY <= (rect.h / 2)) {
        return true;
    }

    const dx = distX - rect.w / 2;
    const dy = distY - rect.h / 2;
    return (dx * dx + dy * dy <= (circle.radious * circle.radious));
}

