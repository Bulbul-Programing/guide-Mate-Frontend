"use client"

import { MoonIcon, SunIcon } from "lucide-react"
import { Toggle } from "@/components/ui/toggle"
import { useTheme } from "next-themes";

export default function ThemeToggle() {
    const { theme, setTheme, systemTheme } = useTheme();

    const currentTheme = theme === "system" ? systemTheme : theme;

    if (!currentTheme) return null;
    console.log(systemTheme, theme);
    return (
        <div className="border rounded-full">
            <Toggle
                variant="outline"
                className="group size-8 cursor-pointer rounded-full border-none shadow-none bg-transparent"
                pressed={currentTheme === "dark"}
                onPressedChange={() =>
                    setTheme(currentTheme === "dark" ? "light" : "dark")
                }
                aria-label={`Switch to ${currentTheme === "dark" ? "light" : "dark"} mode`}
            >
                <MoonIcon
                    size={16}
                    className={`shrink-0 transition-all ${currentTheme === "dark" ? "scale-100 opacity-100" : "scale-0 opacity-0"
                        } bg-transparent`}
                    aria-hidden="true"
                />
                <SunIcon
                    size={16}
                    className={`absolute shrink-0 transition-all ${currentTheme === "dark" ? "scale-0 opacity-0" : "scale-100 opacity-100"
                        } bg-transparent`}
                    aria-hidden="true"
                />
            </Toggle>
        </div>
    );
}

