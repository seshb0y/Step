import Dialog from "@/shared/ui/dialog";
import { useTranslation } from "react-i18next";
import { Button } from "@/shared/ui/button";
import { useConfirmEmail } from "./hooks";

type Props = {
  userId: string | null;
  open: boolean;
  onOpenChange: (v: boolean) => void;
};

export default function ConfirmEmailModal({
  userId,
  open,
  onOpenChange,
}: Props) {
  const { t } = useTranslation();
  const confirmEmail = useConfirmEmail();

  async function onConfirm() {
    if (!userId) return;
    await confirmEmail(userId);
    onOpenChange(false);
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/30" />
        <Dialog.Content className="fixed left-1/2 top-1/2 w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-4 space-y-4">
          <Dialog.Title className="text-lg font-semibold">
            {t("confirmEmail")}
          </Dialog.Title>
          <div className="text-sm opacity-80">{t("confirmEmailText")}</div>
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
