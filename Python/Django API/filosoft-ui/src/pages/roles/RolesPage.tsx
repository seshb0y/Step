import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";
import NumericPager from "@/shared/ui/pagination/NumericPager";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import CreateRoleModal from "@/features/roles/CreateRoleModal";
import RenameRoleModal from "@/features/roles/RenameRoleModal";
import DeleteRoleModal from "@/features/roles/DeleteRoleModal";
import { useRolesList } from "@/entities/role/model/useRoleList";

type ModalKind = "create" | "rename" | "delete" | null;

export default function RolesPage() {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [query, setQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const { data, isLoading } = useRolesList({
    page,
    pageSize,
    q: query,
    sortOrder,
  });

  const [modal, setModal] = useState<ModalKind>(null);
  const [activeRoleId, setActiveRoleId] = useState<string | null>(null);
  const [activeRoleName, setActiveRoleName] = useState<string | undefined>(
    undefined
  );

  function open(kind: ModalKind, id?: string, name?: string) {
    setActiveRoleId(id || null);
    setActiveRoleName(name);
    setModal(kind);
  }

  function close() {
    setModal(null);
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-2">
        <h1 className="text-2xl font-semibold">{t("roles")}</h1>
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
          <Button onClick={() => open("create")}>{t("add")}</Button>
        </div>
      </div>

      <div className="border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden">
        <div className="grid grid-cols-[2fr_1fr] bg-neutral-50 dark:bg-neutral-900 px-4 py-3 text-sm font-medium">
          <button
            className="text-left hover:underline"
            onClick={() => {
              setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
              setPage(1);
            }}
          >
            {t("name")}
            {sortOrder === "asc" ? " ↑" : " ↓"}
          </button>
          <div className="text-right">{t("actions")}</div>
        </div>

        {isLoading && (
          <div className="divide-y divide-neutral-200 dark:divide-neutral-800">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="grid grid-cols-[2fr_1fr] px-4 py-3 items-center"
              >
                <div className="h-5 w-40 rounded-md bg-neutral-200 dark:bg-neutral-800" />
                <div className="flex justify-end">
                  <div className="h-9 w-24 rounded-xl bg-neutral-200 dark:bg-neutral-800" />
                </div>
              </div>
            ))}
          </div>
        )}

        {!isLoading && data && data.items.length > 0 && (
          <>
            <div className="divide-y divide-neutral-200 dark:divide-neutral-800">
              {data.items.map((r) => (
                <div
                  key={r.id}
                  className="grid grid-cols-[2fr_1fr] px-4 py-3 items-center"
                >
                  <div className="truncate">{r.name}</div>
                  <div className="flex justify-end">
                    <DropdownMenu.Root>
                      <DropdownMenu.Trigger asChild>
                        <Button variant="outline">{t("actions")}</Button>
                      </DropdownMenu.Trigger>
                      <DropdownMenu.Content className="min-w-40 p-1 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow">
                        <button
                          className="px-3 py-2 text-sm rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 w-full text-left"
                          onClick={() => open("rename", r.id, r.name)}
                        >
                          {t("rename")}
                        </button>
                        <button
                          className="px-3 py-2 text-sm rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 w-full text-left"
                          onClick={() => open("delete", r.id, r.name)}
                        >
                          {t("delete")}
                        </button>
                      </DropdownMenu.Content>
                    </DropdownMenu.Root>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between px-4 py-3 border-t border-neutral-200 dark:border-neutral-800">
              <div className="text-sm opacity-70">
                {t("page")} {data.page} / {data.pages} · {t("total")}{" "}
                {data.total}
              </div>
              <NumericPager
                page={data.page}
                pages={data.pages}
                onChange={(p) => setPage(p)}
              />
            </div>
          </>
        )}
      </div>

      <CreateRoleModal
        open={modal === "create"}
        onOpenChange={(v) => (v ? null : close())}
      />
      <RenameRoleModal
        roleId={activeRoleId}
        currentName={activeRoleName}
        open={modal === "rename"}
        onOpenChange={(v) => (v ? null : close())}
      />
      <DeleteRoleModal
        roleId={activeRoleId}
        roleName={activeRoleName}
        open={modal === "delete"}
        onOpenChange={(v) => (v ? null : close())}
      />
    </div>
  );
}
