import { createContext } from "react";

export type Theme = "light" | "dark";
export type Ctx = { theme: Theme; setTheme: (t: Theme) => void };

export const ThemeContext = createContext<Ctx>({
  theme: "dark",
  setTheme: () => {},
});
