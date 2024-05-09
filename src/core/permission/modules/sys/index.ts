import type { SysLogPerms } from './log';
import type { SysDeptPerms } from './dept';
import type { SysMenuPerms } from './menu';
import type { SysOnlinePerms } from './online';
import type { SysTaskPerms } from './task';
import type { SysUserPerms } from './user';
import type { SysServePerms } from './serve';

export type SysPermissionType =
  | SysLogPerms
  | SysDeptPerms
  | SysMenuPerms
  | SysOnlinePerms
  | SysTaskPerms
  | SysServePerms
  | SysUserPerms;
