import Dialog from "@/shared/ui/dialog";
import { useTranslation } from "react-i18next";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { useState } from "react";
import { useCreateRole } from "./hooks";

type Props = { open: boolean; onOpenChange: (v: boolean) => void };

export default function CreateRoleModal({ open, onOpenChange }: Props) {
  const { t } = useTranslation();
  const createRole = useCreateRole();
  const [name, setName] = useState("");

  async function onSave() {
    if (!name.trim()) return;
    await createRole(name.trim());
    setName("");
    onOpenChange(false);
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content>
          <Dialog.Title>{t("createRole")}</Dialog.Title>
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
