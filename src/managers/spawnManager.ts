import { creepConfig } from "creeps";
import { MaintainRoleCounts, Role } from "types/role.type";

export class SpawnManager {
  private spawn: StructureSpawn;
  private spawnQueue: Role[] = [];
  public constructor(instance: StructureSpawn) {
    this.spawn = instance;
    return this;
  }

  public get getSpawn(): StructureSpawn {
    return this.spawn;
  }

  private spawnCreep(role: Role, bodyParts: BodyPartConstant[]) {
    const newName = `${role}-${Game.time}`;
    const spawnOptions = { memory: { role } };

    const canSpawn = this.spawn.spawnCreep(bodyParts, newName, { ...spawnOptions, dryRun: true });

    if (canSpawn === OK) {
      const spawnResult = this.spawn.spawnCreep(bodyParts, newName, spawnOptions);

      if (spawnResult === OK) {
        console.log(`Spawning new harvester: ${newName}`);
        return true;
      } else {
        console.log(`Failed to spawn new harvester: ${newName}`);
        return false;
      }
    } else {
      console.log(`Cannot spawn new ${role}: ${newName}`);
      return false;
    }
  }

  private Say() {
    if (this.spawn.spawning) {
      const spawningCreep = Game.creeps[this.spawn.spawning.name];
      this.spawn.room.visual.text(`🛠️ ${spawningCreep.memory.role as string}`, this.spawn.pos.x + 1, this.spawn.pos.y, {
        align: "left",
        opacity: 0.8
      });
    }
  }

  public maintainCreeps(maintainRoleCounts: MaintainRoleCounts): void {
    this.checkQueue(maintainRoleCounts);

    if (!this.spawn || this.spawn.spawning || this.spawnQueue.length <= 0) return;

    const result = this.spawnCreep(this.spawnQueue[0], creepConfig.bodyParts[this.spawnQueue[0]]);
    if (result) this.spawnQueue.shift();
    this.Say();
  }

  public checkQueue(maintainRoleCounts: MaintainRoleCounts): void {
    if (this.spawnQueue.length > 0) return;
    const cacheCreeps = this.spawn.room.find(FIND_MY_CREEPS);
    const totalCreepWillHave = Object.values(maintainRoleCounts).reduce((acc, curr) => acc + curr, 0);

    if (cacheCreeps.length >= totalCreepWillHave) return;

    for (const role in maintainRoleCounts) {
      const key = role as Role;
      const creeps = _.filter(cacheCreeps, creep => creep.memory.role === key);

      if (creeps.length < maintainRoleCounts[key]) {
        this.addToQueue(key);
      }
    }
  }

  public addToQueue(role: Role): void {
    this.spawnQueue.push(role);
    this.spawnQueue = this.spawnQueue.sort((a, b) => {
      const creepA = creepConfig.priority[a];
      const creepB = creepConfig.priority[b];
      return creepA - creepB;
    });
  }
}
