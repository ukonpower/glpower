import EventEmitter from "wolfy87-eventemitter";
import { ECS, ECSUpdateEvent } from "..";
import { ComponentName } from "../Component";
import { Entity } from "../Entity";
export declare type EntityQuery = ComponentName[];
export interface SystemUpdateEvent extends ECSUpdateEvent {
    ecs: ECS;
}
export declare class System extends EventEmitter {
    protected ecs: ECS;
    protected queries: {
        name: string;
        query: EntityQuery;
    }[];
    constructor(ecs: ECS, queries?: {
        [key: string]: EntityQuery;
    });
    update(event: SystemUpdateEvent): void;
    protected beforeUpdateImpl(logicName: string, event: SystemUpdateEvent): void;
    protected updateImpl(logicName: string, entity: Entity, event: SystemUpdateEvent): void;
    protected afterUpdateImpl(logicName: string, event: SystemUpdateEvent): void;
    dispose(): void;
}
//# sourceMappingURL=index.d.ts.map