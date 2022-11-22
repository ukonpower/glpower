import { BufferType } from "../GLPowerBuffer";
import { Core } from "../Power";
import { Attribute, AttributeBuffer } from "../GLPowerVAO";
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
            buffer: import("../GLPowerBuffer").Buffer;
            size: number;
            count: number;
            name: string;
        }[];
        index: AttributeBuffer;
    };
}
export {};
//# sourceMappingURL=Geometry.d.ts.map