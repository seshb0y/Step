import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Globe } from "lucide-react";
import { useTranslation } from "react-i18next";
import { cn } from "@/shared/ui/cn";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  function setLang(l: "az" | "en") {
    i18n.changeLanguage(l);
    localStorage.setItem("i18nextLng", l);
  }
  const item =
    "px-3 py-2 text-sm rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800";
  const trigger =
    "h-9 px-3 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-violet-500 transition flex items-center gap-2";
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className={trigger}>
        <div className="flex items-center gap-2">
          <Globe size={16} />
          <span className="uppercase text-sm">{i18n.language}</span>
        </div>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content className="min-w-28 p-1 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow">
        <button
          onClick={() => setLang("az")}
          className={cn(item, i18n.language.startsWith("az") && "font-medium")}
        >
          Azərbaycan
        </button>
        <button
          onClick={() => setLang("en")}
          className={cn(item, i18n.language.startsWith("en") && "font-medium")}
        >
          English
        </button>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
