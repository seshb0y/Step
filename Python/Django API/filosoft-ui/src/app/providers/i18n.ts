import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import az from "@/locales/az/common.json";
import en from "@/locales/en/common.json";

const lng = import.meta.env.VITE_DEFAULT_LOCALE || "az";

i18n.use(initReactI18next).init({
  resources: {
    az: { common: az },
    en: { common: en },
  },
  fallbackLng: "az",
  lng,
  interpolation: { escapeValue: false },
  defaultNS: "common",
  ns: ["common"],
  react: { useSuspense: false },
});

export default i18n;
