import { MaintainRoleCounts, Role } from "types/role.type";

export class SpawnManager {
  private spawn: StructureSpawn;
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

  public maintainCreeps(maintainRoleCounts: MaintainRoleCounts): void {
    const cacheCreeps = this.spawn.room.find(FIND_MY_CREEPS);
    if (!this.spawn || this.spawn.spawning) return;
    for (const role in maintainRoleCounts) {
      const key = role as Role;
      const creeps = _.filter(cacheCreeps, creep => creep.memory.role === key);

      if (creeps.length < maintainRoleCounts[key]) {
        this.spawnCreep(key, ["carry", "move", "work"]);
      }
    }
  }
}
