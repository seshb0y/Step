import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Moon, Sun, Laptop } from "lucide-react";
import { useTheme } from "@/app/providers/theme/useTheme";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const item =
    "px-3 py-2 text-sm rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 flex items-center gap-2";
  const trigger =
    "h-9 px-3 rounded-xl border border-neutral-300 dark:border-neutral-700";
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className={trigger}>
        <div className="flex items-center gap-2">
          {theme === "dark" ? (
            <Moon size={16} />
          ) : theme === "light" ? (
            <Sun size={16} />
          ) : (
            <Laptop size={16} />
          )}
          <span className="text-sm capitalize">{theme}</span>
        </div>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content className="min-w-32 p-1 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow">
        <button onClick={() => setTheme("light")} className={item}>
          <Sun size={16} />
          <span>Light</span>
        </button>
        <button onClick={() => setTheme("dark")} className={item}>
          <Moon size={16} />
          <span>Dark</span>
        </button>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
