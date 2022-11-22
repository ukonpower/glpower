import { ECS, ECSUpdateEvent } from "..";
import { ComponentName } from "../Component";
import { Entity } from "../Entity";
export declare type EntityQuery = ComponentName[];
export interface SystemUpdateEvent extends ECSUpdateEvent {
    ecs: ECS;
}
export declare class System {
    protected queries: {
        name: string;
        query: EntityQuery;
    }[];
    constructor(queries: {
        [key: string]: EntityQuery;
    });
    update(event: SystemUpdateEvent): void;
    protected beforeUpdateImpl(logicName: string, event: SystemUpdateEvent): void;
    protected updateImpl(logicName: string, entity: Entity, event: SystemUpdateEvent): void;
    protected afterUpdateImpl(logicName: string, event: SystemUpdateEvent): void;
}
//# sourceMappingURL=index.d.ts.map