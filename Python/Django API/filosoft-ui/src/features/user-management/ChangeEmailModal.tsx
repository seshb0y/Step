import Dialog from "@/shared/ui/dialog";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";
import { useChangeEmail } from "./hooks";

const schema = z.object({ email: z.string().email() });
type FormValues = z.infer<typeof schema>;

type Props = {
  userId: string | null;
  open: boolean;
  onOpenChange: (v: boolean) => void;
  currentEmail?: string;
};

export default function ChangeEmailModal({
  userId,
  open,
  onOpenChange,
  currentEmail,
}: Props) {
  const { t } = useTranslation();
  const changeEmail = useChangeEmail();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: currentEmail || "" },
  });

  async function onSubmit(v: FormValues) {
    if (!userId) return;
    await changeEmail(userId, v.email);
    onOpenChange(false);
    reset({ email: "" });
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/30" />
        <Dialog.Content className="fixed left-1/2 top-1/2 w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-4 space-y-4">
          <Dialog.Title className="text-lg font-semibold">
            {t("changeEmail")}
          </Dialog.Title>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <div className="space-y-1">
              <label className="text-sm">{t("email")}</label>
              <Input
                type="email"
                {...register("email")}
                defaultValue={currentEmail}
              />
            </div>
            <div className="flex justify-end gap-2">
              <Dialog.Close asChild>
                <Button variant="outline">{t("cancel")}</Button>
              </Dialog.Close>
              <Button type="submit" disabled={isSubmitting}>
                {t("save")}
              </Button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
