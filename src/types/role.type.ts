import { ERole } from "enum";

export type Role = keyof typeof ERole;

export type MaintainRoleCounts = { [K in Role]: number };
