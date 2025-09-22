import LanguageSwitcher from "@/features/i18n/LanguageSwitcher";
import ThemeSwitcher from "@/features/theme/ThemeSwitcher";

export default function Header() {
  return (
    <header className="h-14 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-end px-4 gap-2">
      <LanguageSwitcher />
      <ThemeSwitcher />
    </header>
  );
}
