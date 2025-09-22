import useSWR from "swr";
import type { Workflow, NodeType } from "./workflow";
import type { PaginatedResult } from "@/shared/types/pagination";

export type WorkflowsQuery = {
  page: number;
  pageSize: number;
  q?: string;
  sortOrder?: "asc" | "desc";
};

function key({ page, pageSize, q, sortOrder }: WorkflowsQuery) {
  const qs = new URLSearchParams();
  if (q) qs.set("q", q);
  if (sortOrder) qs.set("sortOrder", sortOrder);
  return `/api/workflow/${page}/${pageSize}?` + qs.toString();
}

export function useWorkflows(query: WorkflowsQuery) {
  const { data, error, isLoading, mutate } = useSWR<PaginatedResult<Workflow>>(
    key(query)
  );
  return { data, error, isLoading, mutate };
}

export function useWorkflow(id: string | null) {
  const k = id ? `/api/workflow/${id}` : null;
  const { data, error, isLoading, mutate } = useSWR<Workflow>(k);
  return { data, error, isLoading, mutate };
}

export function useNodeTypes() {
  const { data, error, isLoading } = useSWR<NodeType[]>("/api/plugin/nodes");
  return { data, error, isLoading };
}
