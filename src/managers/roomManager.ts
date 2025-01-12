import { ERole } from "enum";
import { MaintainRoleCounts } from "types/role.type";
import { SpawnManager } from "./spawnManager";

type Sources = {
  [K in string]: {
    source: Source;
    plains: LookForAtAreaResultArray<Terrain, "terrain">;
  };
};

export class RoomManager {
  private room: Room;
  private sources: Sources = {};
  private spawnManager: SpawnManager;
  private creeps: Creep[] = [];
  private maintainRoleCounts: MaintainRoleCounts = {
    [ERole.harvester]: 4,
    [ERole.upgrader]: 2,
    [ERole.builder]: 1,
    [ERole.hauler]: 2
  };

  private currentRoleCounts: MaintainRoleCounts = {
    [ERole.harvester]: 0,
    [ERole.hauler]: 0,
    [ERole.upgrader]: 0,
    [ERole.builder]: 0
  };

  public constructor(instance: Room, spawn: StructureSpawn) {
    this.room = instance;
    instance.find(FIND_SOURCES).forEach(source => {
      this.sources[source.id] = {
        source,
        plains: this.getPlainArroundSource(source)
      };
    });

    this.creeps = instance.find(FIND_MY_CREEPS);
    if (this.creeps.length > 0) {
      for (const creep of this.creeps) {
        this.updateRoleCounts(creep);
      }
    }

    this.spawnManager = new SpawnManager(spawn);

    return this;
  }

  public get getRoom(): Room {
    return this.room;
  }

  public getSpawnManager(): SpawnManager {
    return this.spawnManager;
  }

  public run(): void {
    for (const source in this.sources) {
      for (const plain of this.sources[source].plains) {
        console.log(this.sources[source].source.id, plain.x, plain.y);
      }
    }
    this.spawnManager.maintainCreeps(this.maintainRoleCounts);
  }

  public getPlainArroundSource(source: Source): LookForAtAreaResultArray<Terrain, "terrain"> {
    const sourcePos = source.pos;
    return this.room
      .lookForAtArea(LOOK_TERRAIN, sourcePos.y - 1, sourcePos.x - 1, sourcePos.y + 1, sourcePos.x + 1, true)
      .filter(terrain => terrain.terrain === "plain");
  }

  public updateRoleCounts(creep: Creep): void {
    switch (creep.memory.role) {
      case ERole.harvester:
        this.currentRoleCounts[ERole.harvester]++;
        break;
      case ERole.upgrader:
        this.currentRoleCounts[ERole.upgrader]++;
        break;
      case ERole.builder:
        this.currentRoleCounts[ERole.builder]++;
        break;
      case ERole.hauler:
        this.currentRoleCounts[ERole.hauler]++;
        break;
      default:
        break;
    }
  }

  public getCurrentRoleCounts(): MaintainRoleCounts {
    return this.currentRoleCounts;
  }
}
