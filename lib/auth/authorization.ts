import type { Role } from "@/app/generated/prisma/client";

export function hasRole(userRole: Role, allowed: Role[]): boolean {
  return allowed.includes(userRole);
}
