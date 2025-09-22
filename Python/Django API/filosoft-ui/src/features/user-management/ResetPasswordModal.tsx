import Dialog from "@/shared/ui/dialog";
import { useTranslation } from "react-i18next";
import { Button } from "@/shared/ui/button";
import { useResetPassword } from "./hooks";

type Props = {
  userId: string | null;
  open: boolean;
  onOpenChange: (v: boolean) => void;
};

export default function ResetPasswordModal({
  userId,
  open,
  onOpenChange,
}: Props) {
  const { t } = useTranslation();
  const resetPassword = useResetPassword();

  async function onConfirm() {
    if (!userId) return;
    await resetPassword(userId);
    onOpenChange(false);
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content>
          <Dialog.Title>{t("resetPassword")}</Dialog.Title>
          <div className="text-sm opacity-80">{t("resetPasswordText")}</div>
          <div className="flex justify-end gap-2">
            <Dialog.Close asChild>
              <Button variant="outline">{t("cancel")}</Button>
            </Dialog.Close>
            <Button onClick={onConfirm}>{t("confirm")}</Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
