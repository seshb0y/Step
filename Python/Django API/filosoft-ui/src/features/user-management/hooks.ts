import useSWR from "swr";
import { useSWRConfig } from "swr";
import { http } from "@/shared/api/http";
import { Role } from "@/entities/role/model/role";


export function useUserRoles(userId: string | null) {
  const key = userId ? `/api/v1/auth/${userId}/roles` : null;
  const { data, error, isLoading, mutate } = useSWR<Role[]>(key);
  return { data, error, isLoading, mutate };
}

export function useAssignRoles() {
  const { mutate } = useSWRConfig();
  return async (userId: string, roles: string[]) => {
    await http.post(`/api/v1/auth/${userId}/roles`, { roles });
    await mutate(
      (key) => typeof key === "string" && key.startsWith("/api/v1/auth/All")
    );
    await mutate(`/api/v1/auth/${userId}/roles`);
  };
}

export function useChangeEmail() {
  const { mutate } = useSWRConfig();
  return async (userId: string, newEmail: string) => {
    await http.post(`/api/v1/auth/${userId}/change-email`, { newEmail });
    await mutate(
      (key) => typeof key === "string" && key.startsWith("/api/v1/auth/All")
    );
  };
}

export function useConfirmEmail() {
  const { mutate } = useSWRConfig();
  return async (userId: string) => {
    await http.post(`/api/v1/auth/${userId}/confirm-email`, {});
    await mutate(
      (key) => typeof key === "string" && key.startsWith("/api/v1/auth/All")
    );
  };
}

export function useResetPassword() {
  return async (userId: string) => {
    await http.post(`/api/v1/auth/${userId}/reset-password`, {});
  };
}
