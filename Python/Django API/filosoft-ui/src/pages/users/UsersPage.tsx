import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";
import { Skeleton } from "@/shared/ui/skeleton";
import { useUsers } from "@/entities/user/model/useUsers";
import { useDebounce } from "@/shared/hooks/useDebounce";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import AssignRolesModal from "@/features/user-management/AssignRolesModal";
import ChangeEmailModal from "@/features/user-management/ChangeEmailModal";
import ConfirmEmailModal from "@/features/user-management/ConfirmEmailModal";
import ResetPasswordModal from "@/features/user-management/ResetPasswordModal";
import NumericPager from "@/shared/ui/pagination/NumericPager";

type ModalKind = "roles" | "changeEmail" | "confirmEmail" | "resetPwd" | null;

export default function UsersPage() {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "email">("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [activeUserId, setActiveUserId] = useState<string | null>(null);
  const [activeUserEmail, setActiveUserEmail] = useState<string | undefined>(
    undefined
  );
  const [modal, setModal] = useState<ModalKind>(null);

  const q = useDebounce(query, 400);
  const { data, isLoading } = useUsers({
    page,
    pageSize,
    q,
    sortBy,
    sortOrder,
  });

  const items = Array.isArray(data?.items) ? data!.items : [];

  function toggleSort(col: "name" | "email") {
    if (sortBy !== col) {
      setSortBy(col);
      setSortOrder("asc");
    } else {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    }
    setPage(1);
  }

  function open(kind: ModalKind, id: string, email?: string) {
    setActiveUserId(id);
    setActiveUserEmail(email);
    setModal(kind);
  }

  function close() {
    setModal(null);
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-2">
        <h1 className="text-2xl font-semibold">{t("users")}</h1>
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
        </div>
      </div>

      <div className="border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden">
        <div className="grid grid-cols-[2fr_2fr_1fr] bg-neutral-50 dark:bg-neutral-900 px-4 py-3 text-sm font-medium">
          <button
            className="text-left hover:underline"
            onClick={() => toggleSort("name")}
          >
            {t("name")}
            {sortBy === "name" ? (sortOrder === "asc" ? " ↑" : " ↓") : ""}
          </button>
          <button
            className="text-left hover:underline"
            onClick={() => toggleSort("email")}
          >
            {t("email")}
            {sortBy === "email" ? (sortOrder === "asc" ? " ↑" : " ↓") : ""}
          </button>
          <div className="text-right">{t("actions")}</div>
        </div>

        {isLoading && (
          <div className="divide-y divide-neutral-200 dark:divide-neutral-800">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="grid grid-cols-[2fr_2fr_1fr] px-4 py-3 items-center"
              >
                <div>
                  <Skeleton className="h-5 w-40" />
                </div>
                <div>
                  <Skeleton className="h-5 w-56" />
                </div>
                <div className="flex justify-end gap-2">
                  <Skeleton className="h-9 w-20 rounded-xl" />
                </div>
              </div>
            ))}
          </div>
        )}

        {!isLoading && items.length === 0 && (
          <div className="px-4 py-10 text-center text-sm opacity-70">
            {t("noData")}
          </div>
        )}

        {!isLoading && items.length > 0 && (
          <>
            <div className="divide-y divide-neutral-200 dark:divide-neutral-800">
              {items.map((u) => (
                <div
                  key={u.id}
                  className="grid grid-cols-[2fr_2fr_1fr] px-4 py-3 items-center"
                >
                  <div className="truncate">{u.userName}</div>
                  <div className="truncate">{u.email}</div>
                  <div className="flex justify-end">
                    <DropdownMenu.Root>
                      <DropdownMenu.Trigger asChild>
                        <Button variant="outline">{t("actions")}</Button>
                      </DropdownMenu.Trigger>
                      <DropdownMenu.Content className="min-w-40 p-1 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow">
                        <button
                          className="px-3 py-2 text-sm rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 w-full text-left"
                          onClick={() => open("roles", u.id)}
                        >
                          {t("roles")}
                        </button>
                        <button
                          className="px-3 py-2 text-sm rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 w-full text-left"
                          onClick={() => open("changeEmail", u.id, u.email)}
                        >
                          {t("changeEmail")}
                        </button>
                        <button
                          className="px-3 py-2 text-sm rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 w-full text-left"
                          onClick={() => open("resetPwd", u.id)}
                        >
                          {t("resetPassword")}
                        </button>
                        <button
                          className="px-3 py-2 text-sm rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 w-full text-left"
                          onClick={() => open("confirmEmail", u.id)}
                        >
                          {t("confirmEmail")}
                        </button>
                      </DropdownMenu.Content>
                    </DropdownMenu.Root>
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

      <AssignRolesModal
        userId={activeUserId}
        open={modal === "roles"}
        onOpenChange={(v) => (v ? null : close())}
      />
      <ChangeEmailModal
        userId={activeUserId}
        currentEmail={activeUserEmail}
        open={modal === "changeEmail"}
        onOpenChange={(v) => (v ? null : close())}
      />
      <ConfirmEmailModal
        userId={activeUserId}
        open={modal === "confirmEmail"}
        onOpenChange={(v) => (v ? null : close())}
      />
      <ResetPasswordModal
        userId={activeUserId}
        open={modal === "resetPwd"}
        onOpenChange={(v) => (v ? null : close())}
      />
    </div>
  );
}
