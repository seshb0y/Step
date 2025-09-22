import { http } from "@/shared/api/http";
import { useSWRConfig } from "swr";
import type {
  CreateWorkflowRequest,
  UpdateWorkflowRequest,
} from "@/entities/workflow/model/dto";

export function useCreateWorkflow() {
  const { mutate } = useSWRConfig();
  return async (payload: CreateWorkflowRequest) => {
    const res = await http.post("/api/workflow", payload);
    await mutate(
      (k) => typeof k === "string" && k.startsWith("/api/workflow/")
    );
    return res.data as { id: string };
  };
}

export function useUpdateWorkflow() {
  const { mutate } = useSWRConfig();
  return async (id: string, payload: UpdateWorkflowRequest) => {
    const res = await http.put(`/api/workflow/${id}`, payload);
    await mutate(
      (k) => typeof k === "string" && k.startsWith("/api/workflow/")
    );
    return res.data;
  };
}

export function useDeleteWorkflow() {
  const { mutate } = useSWRConfig();
  return async (id: string) => {
    await http.delete(`/api/workflow/${id}`);
    await mutate(
      (k) => typeof k === "string" && k.startsWith("/api/workflow/")
    );
  };
}
