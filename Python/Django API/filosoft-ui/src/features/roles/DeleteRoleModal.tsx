import Dialog from "@/shared/ui/dialog";
import { useTranslation } from "react-i18next";
import { Button } from "@/shared/ui/button";
import { useDeleteRole } from "./hooks";

type Props = {
  roleId: string | null;
  roleName?: string;
  open: boolean;
  onOpenChange: (v: boolean) => void;
};

export default function DeleteRoleModal({
  roleId,
  roleName,
  open,
  onOpenChange,
}: Props) {
  const { t } = useTranslation();
  const del = useDeleteRole();

  async function onConfirm() {
    if (!roleId) return;
    await del(roleId);
    onOpenChange(false);
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content>
          <Dialog.Title>{t("deleteRole")}</Dialog.Title>
          <div className="text-sm opacity-80">
            {t("deleteRoleText")} {roleName}
          </div>
          <div className="flex justify-end gap-2">
            <Dialog.Close asChild>
              <Button variant="outline">{t("cancel")}</Button>
            </Dialog.Close>
            <Button onClick={onConfirm}>{t("delete")}</Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
