import { Button } from "./buttons/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "../components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { useSmileContext } from "../Api/userContext";
import { useTranslation } from "react-i18next";

type Language = "en" | "es";

const languages = {
  en: { name: "English", flag: "🇺🇸" },
  es: { name: "Español", flag: "🇪🇸" }
};

export function LanguageSelector() {
  const { switchLang } = useSmileContext();
  const { i18n } = useTranslation("global");

  const styleLang = i18n.resolvedLanguage;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondar" className="flex items-center gap-2">
          <span>{languages[styleLang as Language]?.flag || "🌐"}</span>
          <span className="hidden sm:inline">
            {languages[styleLang as Language]?.name}
          </span>

          <ChevronDown className="w-4 h-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {(Object.keys(languages) as Language[]).map(lang => (
          <DropdownMenuItem
            key={lang}
            onClick={() => {
              switchLang(lang);
            }}
            className="flex items-center gap-2 cursor-pointer"
          >
            <span>{languages[lang].flag}</span>
            <span>{languages[lang].name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
