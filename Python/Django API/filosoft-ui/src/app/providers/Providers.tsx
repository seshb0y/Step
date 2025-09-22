import "@/app/providers/i18n";
import ThemeProvider from "@/app/providers/ThemeProvider";
import { SWRProvider } from "@/app/providers/SWRProvider";
import { BrowserRouter } from "react-router-dom";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <SWRProvider>
        <BrowserRouter>{children}</BrowserRouter>
      </SWRProvider>
    </ThemeProvider>
  );
}
