import { IPermissionType } from '@tusks/api/util-interfaces';

class PermissionManager {
  private actionFlags = {
    DELETE: 8,
    DENIED_ACCESS: 1,
    EDIT: 4,
    READ: 2,
  };

  private authFlags = {
    BASIC: 2,
    FULL_ACCESS: 8,
    STANDARD: 4,
    TRIAL: 1,
  };

  permissions = {
    OWNER:
      this.actionFlags.READ | this.actionFlags.EDIT | this.actionFlags.DELETE,
    EDITOR: this.actionFlags.READ | this.actionFlags.EDIT,
    OBSERVER: this.actionFlags.READ,
    BLOCKED: this.actionFlags.DENIED_ACCESS,

    FULL_ACCESS: this.authFlags.FULL_ACCESS,
    STANDARD: this.authFlags.STANDARD,
    BASIC: this.authFlags.BASIC,
    TRIAL: this.authFlags.TRIAL,
  };

  updatePermission(
    currentPermFlag: number,
    newPermissionType: IPermissionType
  ) {
    const newPermission = this.permissions[newPermissionType];

    return currentPermFlag | newPermission;
  }

  removePermission(
    currentPermFlag: number,
    newPermissionType: IPermissionType
  ) {
    return currentPermFlag ^ this.permissions[newPermissionType];
  }

  checkIsPermitted = (
    userPermFlag: number,
    newPermissionFlag: IPermissionType
  ) => {
    const permissionGranted = !!(
      this.permissions?.[newPermissionFlag] & userPermFlag
    );

    return permissionGranted;
  };
}

export const permissionManager = new PermissionManager();
