import { ECS } from '../ECS';
import { Entity } from '../ECS/Entity';
import { World } from '../ECS/World';
export declare class SceneGraph {
    private ecs;
    private world;
    private entities;
    private cacheTransformUpdateOrder;
    private cacheRenderOrder;
    constructor(ecs: ECS, world: World);
    add(parent: Entity, child: Entity): void;
    remove(parent: Entity, child: Entity): void;
    getTransformUpdateOrder(): number[];
}
//# sourceMappingURL=index.d.ts.map