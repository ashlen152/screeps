import { builderCreep } from "./creep.builder";
import { harvesterCreep } from "./creep.harvester";
import { haulerCreep } from "./creep.hauler";
import { upgraderCreep } from "./creep.upgrader";

export const creepConfig = {
  priority: {
    harvester: 0,
    hauler: 1,
    upgrader: 2,
    builder: 3
  },
  bodyParts: {
    harvester: harvesterCreep.bodyParts,
    hauler: haulerCreep.bodyParts,
    upgrader: upgraderCreep.bodyParts,
    builder: builderCreep.bodyParts
  }
};
