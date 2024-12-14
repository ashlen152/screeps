import { ErrorMapper, clearMemoryCreeps } from "utils";
import { ERole } from "enum";
import { runBuilder } from "creeps/builder";
import { runHarvester } from "creeps/harvester";
import { runUpgrader } from "creeps/upgrader";

export const loop = ErrorMapper.wrapLoop(() => {
  console.log(`Current game tick is ${Game.time}`);

  clearMemoryCreeps();
  console.log("a");
  for (const name in Game.creeps) {
    const creep = Game.creeps[name];
    if (creep.memory.role === ERole.harvester) {
      runHarvester(creep);
    } else if (creep.memory.role === ERole.upgrader) {
      runUpgrader(creep);
    } else if (creep.memory.role === ERole.builder) {
      runBuilder(creep);
    }
  }
});
