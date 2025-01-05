export const runUpgrader = (creep: Creep): void => {
  console.log("Running upgrader");
  if (creep.store[RESOURCE_ENERGY] === 0) {
    const sources = creep.room.find(FIND_SOURCES);
    if (creep.harvest(sources[0]) === ERR_NOT_IN_RANGE) {
      creep.moveTo(sources[0], { visualizePathStyle: { stroke: "#ffaa00" } });
    }
  } else {
    if (creep.upgradeController(creep.room.controller as StructureController) === ERR_NOT_IN_RANGE) {
      creep.moveTo(creep.room.controller as StructureController, { visualizePathStyle: { stroke: "#ffffff" } });
    }
  }
};
