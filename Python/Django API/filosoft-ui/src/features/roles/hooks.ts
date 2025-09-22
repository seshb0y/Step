import { useSWRConfig } from "swr";
import { http } from "@/shared/api/http";

export function useCreateRole() {
  const { mutate } = useSWRConfig();
  return async (name: string) => {
    await http.post("/api/v1/roles", { name });
    await mutate(
      (key) => typeof key === "string" && key.startsWith("/api/v1/roles/")
    );
    await mutate("/api/v1/auth/roles");
  };
}

export function useRenameRole() {
  const { mutate } = useSWRConfig();
  return async (id: string, name: string) => {
    await http.put(`/api/v1/roles/${id}`, { name });
    await mutate(
      (key) => typeof key === "string" && key.startsWith("/api/v1/roles/")
    );
    await mutate("/api/v1/auth/roles");
  };
}

export function useDeleteRole() {
  const { mutate } = useSWRConfig();
  return async (id: string) => {
    await http.delete(`/api/v1/roles/${id}`);
    await mutate(
      (key) => typeof key === "string" && key.startsWith("/api/v1/roles/")
    );
    await mutate("/api/v1/auth/roles");
  };
}
    