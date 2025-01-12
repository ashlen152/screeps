import { ErrorMapper, clearMemoryCreeps } from "utils";
import { builderCreep, harvesterCreep, haulerCreep, upgraderCreep } from "creeps";
import { ERole } from "enum";
import { RoomManager } from "managers";

const buildTime = Game.time;
console.log(`rebuilt at ${buildTime}`);

const mainSpawn = Game.spawns.Spawn1;
if (!mainSpawn) throw new Error("No spawn found");
const mainRoom = mainSpawn.room;
const roomManager: RoomManager = new RoomManager(mainRoom, mainSpawn);

export const loop = ErrorMapper.wrapLoop(() => {
  console.log(`Current game tick is ${Game.time}`);

  clearMemoryCreeps();

  roomManager.run();

  for (const name in Game.creeps) {
    const creep = Game.creeps[name];
    if (creep.memory.role === ERole.harvester) {
      harvesterCreep.run(creep);
    } else if (creep.memory.role === ERole.upgrader) {
      upgraderCreep.run(creep);
    } else if (creep.memory.role === ERole.builder) {
      builderCreep.run(creep);
    } else if (creep.memory.role === ERole.hauler) {
      haulerCreep.run(creep);
    }
  }
});
