const bodyParts = [CARRY, WORK, MOVE];

const run = (creep: Creep): void => {
  if (creep.store.getFreeCapacity() > 0) {
    const sources = creep.room.find(FIND_DROPPED_RESOURCES);
    if (sources.length > 0 && creep.pickup(sources[0]) === ERR_NOT_IN_RANGE) {
      creep.moveTo(sources[0], { visualizePathStyle: { stroke: "#ffaa00" } });
    }
  } else {
    if (creep.upgradeController(creep.room.controller as StructureController) === ERR_NOT_IN_RANGE) {
      creep.moveTo(creep.room.controller as StructureController, { visualizePathStyle: { stroke: "#ffffff" } });
    }
  }
};
export const upgraderCreep = {
  run,
  bodyParts
};
