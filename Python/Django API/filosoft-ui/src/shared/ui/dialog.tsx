import * as RD from "@radix-ui/react-dialog";
import { cn } from "./cn";

function Overlay(props: React.ComponentProps<typeof RD.Overlay>) {
  return (
    <RD.Overlay
      {...props}
      className={cn("fixed inset-0 bg-[var(--overlay)]", props.className)}
    />
  );
}

function Content(props: React.ComponentProps<typeof RD.Content>) {
  return (
    <RD.Content
      {...props}
      className={cn(
        "fixed left-1/2 top-1/2 w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-[var(--modal-border)] bg-[var(--modal-bg)] text-[var(--modal-fg)] p-4 space-y-4 shadow-xl",
        props.className
      )}
    />
  );
}

function Title(props: React.ComponentProps<typeof RD.Title>) {
  return (
    <RD.Title
      {...props}
      className={cn("text-lg font-semibold", props.className)}
    />
  );
}

const Dialog = {
  Root: RD.Root,
  Trigger: RD.Trigger,
  Portal: RD.Portal,
  Overlay,
  Content,
  Title,
  Close: RD.Close,
};
export default Dialog;
