import { BufferType } from "../Buffer";
import { Core } from "../Core";
import { Attribute, AttributeBuffer } from "../VAO";
declare type DefaultAttributeName = 'position' | 'uv' | 'normal' | 'index';
export declare class Geometry {
    count: number;
    attributes: {
        [key: string]: Attribute;
    };
    constructor();
    setAttribute(name: DefaultAttributeName | (string & {}), array: number[], size: number): void;
    getAttribute(name: DefaultAttributeName | (string & {})): Attribute;
    private updateVertCount;
    getAttributeBuffer(core: Core, name: DefaultAttributeName | (string & {}), constructor: Float32ArrayConstructor | Uint16ArrayConstructor, bufferType?: BufferType): AttributeBuffer;
    getComponent(core: Core): {
        attributes: {
            buffer: import("../Buffer").Buffer;
            size: number;
            count: number;
            name: string;
        }[];
        index: AttributeBuffer;
    };
}
export {};
//# sourceMappingURL=Geometry.d.ts.map