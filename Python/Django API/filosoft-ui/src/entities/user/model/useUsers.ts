import useSWR from "swr";
import type { PaginatedResult } from "@/shared/types/pagination";
import type { User } from "./user";

export type UsersQuery = {
  page: number;
  pageSize: number;
  q?: string;
  sortBy?: "name" | "email";
  sortOrder?: "asc" | "desc";
};

function key({ page, pageSize, q, sortBy, sortOrder }: UsersQuery) {
  const params = new URLSearchParams();
  if (q) params.set("q", q);
  if (sortBy) params.set("sortBy", sortBy);
  if (sortOrder) params.set("sortOrder", sortOrder);
  return `/api/v1/auth/All/${page}/${pageSize}?` + params.toString();
}

export function useUsers(query: UsersQuery) {
  const k = key(query);
  const { data, error, isLoading, mutate } = useSWR<PaginatedResult<User>>(k);
  return { data, error, isLoading, mutate };
}
