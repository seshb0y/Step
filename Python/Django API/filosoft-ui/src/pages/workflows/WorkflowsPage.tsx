import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";
import NumericPager from "@/shared/ui/pagination/NumericPager";
import { useWorkflows } from "@/entities/workflow/model/useWorkflows";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { Link } from "react-router-dom";

export default function WorkflowsPage() {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [query, setQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const q = useDebounce(query, 300);
  const { data, isLoading } = useWorkflows({ page, pageSize, q, sortOrder });
  const items = Array.isArray(data?.items) ? data!.items : [];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-2">
        <h1 className="text-2xl font-semibold">Workflows</h1>
        <div className="flex items-center gap-2 w-full max-w-md">
          <Input
            placeholder={t("search") as string}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
          />
          <Button variant="outline" onClick={() => setQuery((v) => v)}>
            {t("search")}
          </Button>
          <Link to="/workflow/new">
            <Button>{t("add")}</Button>
          </Link>
        </div>
      </div>

      <div className="border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden">
        <div className="grid grid-cols-[2fr_1fr_1fr] bg-neutral-50 dark:bg-neutral-900 px-4 py-3 text-sm font-medium">
          <button
            className="text-left hover:underline"
            onClick={() => {
              setSortOrder((p) => (p === "asc" ? "desc" : "asc"));
              setPage(1);
            }}
          >
            {t("name")}
            {sortOrder === "asc" ? " ↑" : " ↓"}
          </button>
          <div>{t("total")}</div>
          <div className="text-right">{t("actions")}</div>
        </div>

        {isLoading && (
          <div className="divide-y divide-neutral-200 dark:divide-neutral-800">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="grid grid-cols-[2fr_1fr_1fr] px-4 py-3 items-center"
              >
                <div className="h-5 w-48 rounded bg-neutral-200 dark:bg-neutral-800" />
                <div className="h-5 w-10 rounded bg-neutral-200 dark:bg-neutral-800" />
                <div className="h-9 w-24 rounded-xl bg-neutral-200 dark:bg-neutral-800 justify-self-end" />
              </div>
            ))}
          </div>
        )}

        {!isLoading && items.length > 0 && (
          <>
            <div className="divide-y divide-neutral-200 dark:divide-neutral-800">
              {items.map((w) => (
                <div
                  key={w.id}
                  className="grid grid-cols-[2fr_1fr_1fr] px-4 py-3 items-center"
                >
                  <div className="truncate">{w.name}</div>
                  <div>{w.nodes.length}</div>
                  <div className="flex justify-end gap-2">
                    <Link to={`/workflow/${w.id}`}>
                      <Button variant="outline">{t("details")}</Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between px-4 py-3 border-t border-neutral-200 dark:border-neutral-800">
              <div className="text-sm opacity-70">
                {t("page")} {data?.page ?? 1} / {data?.pages ?? 1} ·{" "}
                {t("total")} {data?.total ?? 0}
              </div>
              <NumericPager
                page={data?.page ?? 1}
                pages={data?.pages ?? 1}
                onChange={(p) => setPage(p)}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
