const run = (creep: Creep): void => {
  const sources = creep.room.find(FIND_SOURCES);
  if (creep.harvest(sources[0]) === ERR_NOT_IN_RANGE) {
    creep.moveTo(sources[0], { visualizePathStyle: { stroke: "#ffaa00" } });
  }
};

const bodyParts = [WORK, WORK, MOVE];

export const harvesterCreep = {
  run,
  bodyParts
};
