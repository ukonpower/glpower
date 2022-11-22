import { Component, ComponentName } from "./Component";
import { Entity } from "./Entity";
import { EntityQuery, System } from "./System";
import { World } from "./World";
export interface ECSUpdateEvent {
    world: World;
    time: number;
    deltaTime: number;
}
export declare class ECS {
    private time;
    private lastUpdateTime;
    constructor();
    createWorld(): World;
    createEntity(world: World): Entity;
    removeEntity(world: World, entity: Entity): void;
    addComponent<T extends Component>(world: World, entity: Entity, componentName: ComponentName, component: T): void;
    removeComponent(world: World, entity: Entity, componentName: ComponentName): void;
    getComponent<T extends Component>(world: World, entity: Entity, componentName: ComponentName): T | null;
    addSystem<T extends System>(world: World, systemName: string, system: T): void;
    removeSystem(world: World, componentName: ComponentName): void;
    update(world: World): void;
    getEntities(world: World, query: EntityQuery): Entity[];
}
//# sourceMappingURL=index.d.ts.map