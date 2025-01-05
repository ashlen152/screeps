import { ErrorMapper, clearMemoryCreeps } from "utils";
import { ERole } from "enum";
import { RoomManager, SpawnManager } from "managers";
import { runBuilder } from "creeps/builder";
import { runHarvester } from "creeps/harvester";
import { runUpgrader } from "creeps/upgrader";
// import { creepHauling } from "creeps/creep.hauling";

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
      runHarvester(creep);
    } else if (creep.memory.role === ERole.upgrader) {
      runUpgrader(creep);
    } else if (creep.memory.role === ERole.builder) {
      runBuilder(creep);
    } else if (creep.memory.role === ERole.hauling) {
      // creepHauling.run(creep);
    }
  }
});
