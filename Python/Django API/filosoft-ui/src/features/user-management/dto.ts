export interface AssignRolesRequest {
  userId: string;
  roles: string[];
}

export interface ChangeEmailRequest {
  userId: string;
  newEmail: string;
}

export interface ConfirmEmailRequest {
  userId: string;
}

export interface ResetPasswordRequest {
  userId: string;
}
