import { Vector3 } from "./Vector3";
export declare class Vector2 {
    x: number;
    y: number;
    constructor(x?: number, y?: number);
    get isVector2(): boolean;
    set(x: number, y: number): this;
    add(a: Vector2): Vector2;
    add(a: number): Vector2;
    sub(a: Vector2): Vector2;
    sub(a: number): Vector2;
    multiply(a: number | Vector2): this;
    divide(a: number | Vector2): this;
    copy(a: Vector2 | Vector3): this;
    clone(): Vector2;
    get elm(): number[];
}
//# sourceMappingURL=Vector2.d.ts.map