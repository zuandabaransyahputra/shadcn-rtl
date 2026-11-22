"use client"

import * as React from "react"

import { useLang, useT } from "@/components/preview"
import type { DateDigits } from "@/registry/rtl/lib/format-date"
import { HijriDate } from "@/registry/rtl/ui/hijri-date"

// Fixed date so the server render and the screenshot stay stable.
const DATE = "2026-11-23T09:00:00Z"

export default function HijriDateDemo() {
  const t = useT()
  const lang = useLang()
  const locale = lang === "ar" ? "ar-SA" : "en"
  const [digits, setDigits] = React.useState<DateDigits | undefined>(undefined)

  return (
    <div className="w-full max-w-md space-y-4">
      <div className="inline-flex rounded-md border p-0.5 text-xs">
        {([undefined, "arab", "latn"] as const).map((d) => (
          <button
            key={d ?? "auto"}
            type="button"
            onClick={() => setDigits(d)}
            aria-pressed={digits === d}
            className={
              "rounded-[5px] px-2.5 py-1 font-medium " +
              (digits === d ? "bg-primary text-primary-foreground" : "text-muted-foreground")
            }
          >
            {d === undefined ? t("Locale digits", "أرقام اللغة") : d === "arab" ? "١٢٣" : "123"}
          </button>
        ))}
      </div>
      <dl className="grid gap-3 text-sm">
        <div className="rounded-lg border p-3">
          <dt className="text-muted-foreground">{t("Hijri (Umm al-Qura)", "هجري (أم القرى)")}</dt>
          <dd className="text-lg font-semibold">
            <HijriDate date={DATE} locale={locale} digits={digits} />
          </dd>
        </div>
        <div className="rounded-lg border p-3">
          <dt className="text-muted-foreground">{t("Hijri with Gregorian", "هجري مع الميلادي")}</dt>
          <dd className="text-lg font-semibold">
            <HijriDate date={DATE} locale={locale} digits={digits} show="both" />
          </dd>
        </div>
        <div className="rounded-lg border p-3">
          <dt className="text-muted-foreground">{t("Weekday, short", "مع اليوم، مختصر")}</dt>
          <dd className="font-medium">
            <HijriDate
              date={DATE}
              locale={locale}
              digits={digits}
              format={{ weekday: "long", day: "numeric", month: "long", year: "numeric" }}
            />
          </dd>
        </div>
      </dl>
    </div>
  )
}
