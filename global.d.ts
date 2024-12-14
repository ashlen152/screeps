import { RoleType } from "interfaces/role.type";

declare global {
  interface CreepMemory {
    role: RoleType;
  }
}
