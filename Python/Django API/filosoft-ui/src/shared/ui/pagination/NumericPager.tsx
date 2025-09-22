import { Button } from "@/shared/ui/button";
import { cn } from "@/shared/ui/cn";

type Props = {
  page: number;
  pages: number;
  onChange: (p: number) => void;
  className?: string;
};

function makeRange(page: number, pages: number) {
  if (pages <= 7) return Array.from({ length: pages }, (_, i) => i + 1);
  const out: (number | "...")[] = [1];
  const start = Math.max(2, page - 1);
  const end = Math.min(pages - 1, page + 1);
  if (start > 2) out.push("...");
  for (let i = start; i <= end; i++) out.push(i);
  if (end < pages - 1) out.push("...");
  out.push(pages);
  return out;
}

export default function NumericPager({
  page,
  pages,
  onChange,
  className,
}: Props) {
  const range = makeRange(page, pages);
  const canPrev = page > 1;
  const canNext = page < pages;

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <Button
        variant="outline"
        disabled={!canPrev}
        onClick={() => onChange(page - 1)}
        className="focus-visible:ring-neutral-400"
      >
        «
      </Button>
      {range.map((it, idx) =>
        it === "..." ? (
          <span key={`e${idx}`} className="px-3 text-sm opacity-70">
            …
          </span>
        ) : (
          <Button
            key={it}
            variant="outline"
            className={cn(
              "focus-visible:ring-neutral-400",
              it === page &&
                "bg-neutral-900 text-white hover:bg-neutral-900 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-100"
            )}
            onClick={() => onChange(it as number)}
          >
            {it}
          </Button>
        )
      )}
      <Button
        variant="outline"
        disabled={!canNext}
        onClick={() => onChange(page + 1)}
        className="focus-visible:ring-neutral-400"
      >
        »
      </Button>
    </div>
  );
}
