"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { DirectionProvider } from "@/registry/rtl/ui/direction-provider"

export type Lang = "en" | "ar"

const LangContext = React.createContext<Lang>("en")

/** Language picked in the nearest preview's toggle. */
export function useLang() {
  return React.useContext(LangContext)
}

/** Pick the string for the current preview language. */
export function useT() {
  const lang = useLang()
  return React.useCallback((en: string, ar: string) => (lang === "ar" ? ar : en), [lang])
}

function Segmented<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string
  value: T
  options: { value: T; label: string }[]
  onChange: (value: T) => void
}) {
  return (
    <div role="radiogroup" aria-label={label} className="inline-flex rounded-md border bg-background p-0.5 text-xs">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          role="radio"
          aria-checked={value === option.value}
          onClick={() => onChange(option.value)}
          className={cn(
            "rounded-[5px] px-2.5 py-1 font-medium text-muted-foreground transition-colors hover:text-foreground",
            value === option.value && "bg-primary text-primary-foreground hover:text-primary-foreground"
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}

export function Preview({
  children,
  className,
  defaultDir = "rtl",
  defaultLang = "ar",
  id,
}: {
  children: React.ReactNode
  className?: string
  defaultDir?: "ltr" | "rtl"
  defaultLang?: Lang
  id?: string
}) {
  const [dir, setDir] = React.useState<"ltr" | "rtl">(defaultDir)
  const [lang, setLang] = React.useState<Lang>(defaultLang)

  return (
    <div id={id} className="overflow-hidden rounded-xl border bg-card" data-preview>
      <div className="flex flex-wrap items-center justify-between gap-2 border-b bg-muted/40 px-3 py-2">
        <span className="text-xs font-medium text-muted-foreground">Preview</span>
        <div className="flex items-center gap-2">
          <Segmented
            label="Direction"
            value={dir}
            onChange={setDir}
            options={[
              { value: "ltr", label: "LTR" },
              { value: "rtl", label: "RTL" },
            ]}
          />
          <Segmented
            label="Language"
            value={lang}
            onChange={setLang}
            options={[
              { value: "en", label: "EN" },
              { value: "ar", label: "عربي" },
            ]}
          />
        </div>
      </div>
      <LangContext.Provider value={lang}>
        <DirectionProvider
          dir={dir}
          lang={lang}
          className={cn("flex min-h-56 items-center justify-center p-6 sm:p-10", className)}
        >
          {children}
        </DirectionProvider>
      </LangContext.Provider>
    </div>
  )
}
