import Dialog from "@/shared/ui/dialog";
import { useTranslation } from "react-i18next";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { useEffect, useState } from "react";
import { useRenameRole } from "./hooks";

type Props = {
  roleId: string | null;
  currentName?: string;
  open: boolean;
  onOpenChange: (v: boolean) => void;
};

export default function RenameRoleModal({
  roleId,
  currentName,
  open,
  onOpenChange,
}: Props) {
  const { t } = useTranslation();
  const renameRole = useRenameRole();
  const [name, setName] = useState(currentName || "");

  useEffect(() => setName(currentName || ""), [currentName, open]);

  async function onSave() {
    if (!roleId || !name.trim()) return;
    await renameRole(roleId, name.trim());
    onOpenChange(false);
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content>
          <Dialog.Title>{t("renameRole")}</Dialog.Title>
          <div className="space-y-2">
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t("roleName") as string}
            />
          </div>
          <div className="flex justify-end gap-2">
            <Dialog.Close asChild>
              <Button variant="outline">{t("cancel")}</Button>
            </Dialog.Close>
            <Button onClick={onSave}>{t("save")}</Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
