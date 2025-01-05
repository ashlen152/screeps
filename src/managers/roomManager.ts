import { ERole } from "enum";
import { MaintainRoleCounts } from "types/role.type";
import { SpawnManager } from "./spawnManager";

export class RoomManager {
  private room: Room;
  private sources: Source[];
  private spawnManager: SpawnManager;
  private creeps: Creep[] = [];
  private maintainRoleCounts: MaintainRoleCounts = {
    [ERole.harvester]: 2,
    [ERole.upgrader]: 1,
    [ERole.builder]: 1,
    [ERole.hauling]: 1
  };

  public constructor(instance: Room, spawn: StructureSpawn) {
    this.room = instance;
    this.sources = instance.find(FIND_SOURCES);

    this.spawnManager = new SpawnManager(spawn);

    return this;
  }

  public get getRoom(): Room {
    return this.room;
  }

  public getSources(id?: string): Source[] {
    if (id) return this.sources.filter(source => source.id === id);
    return this.sources;
  }

  public getSpawnManager(): SpawnManager {
    return this.spawnManager;
  }

  public run(): void {
    this.spawnManager.maintainCreeps(this.maintainRoleCounts);
  }
}
