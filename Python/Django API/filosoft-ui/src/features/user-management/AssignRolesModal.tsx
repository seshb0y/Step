import Dialog from "@/shared/ui/dialog";
import * as Checkbox from "@radix-ui/react-checkbox";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/shared/ui/button";
import { useUserRoles, useAssignRoles } from "./hooks";
import { useAllRoles } from "@/entities/role/model/userRoles";

type Props = {
  userId: string | null;
  open: boolean;
  onOpenChange: (v: boolean) => void;
};

export default function AssignRolesModal({
  userId,
  open,
  onOpenChange,
}: Props) {
  const { t } = useTranslation();
  const { data: allRoles } = useAllRoles();
  const { data: userRoles } = useUserRoles(userId);
  const assign = useAssignRoles();
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    setSelected(userRoles ? userRoles.map((r) => r.name) : []);
  }, [userRoles]);

  async function onSave() {
    if (!userId) return;
    await assign(userId, selected);
    onOpenChange(false);
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content>
          <Dialog.Title>{t("roles")}</Dialog.Title>
          <div className="space-y-2 max-h-72 overflow-auto pr-2">
            {allRoles?.map((r) => (
              <label
                key={r.id}
                className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800"
              >
                <Checkbox.Root
                  checked={selected.includes(r.name)}
                  onCheckedChange={() =>
                    setSelected((prev) =>
                      prev.includes(r.name)
                        ? prev.filter((x) => x !== r.name)
                        : [...prev, r.name]
                    )
                  }
                  className="h-5 w-5 rounded border border-neutral-300 dark:border-neutral-700 data-[state=checked]:bg-neutral-900 data-[state=checked]:text-white dark:data-[state=checked]:bg-neutral-100 dark:data-[state=checked]:text-neutral-900 grid place-items-center"
                >
                  <Checkbox.Indicator>✓</Checkbox.Indicator>
                </Checkbox.Root>
                <span>{r.name}</span>
              </label>
            ))}
          </div>
          <div className="flex justify-end gap-2">
            <Dialog.Close asChild>
              <Button variant="outline">Cancel</Button>
            </Dialog.Close>
            <Button onClick={onSave}>Save</Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
