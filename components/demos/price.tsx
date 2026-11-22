"use client"

import * as React from "react"

import { useLang, useT } from "@/components/preview"
import type { Digits } from "@/registry/rtl/lib/format-number"
import { NumberDisplay, Price } from "@/registry/rtl/ui/price"

const currencies = ["SAR", "AED", "KWD", "EGP", "USD"] as const

export default function PriceDemo() {
  const t = useT()
  const lang = useLang()
  const locale = lang === "ar" ? "ar-SA" : "en"
  const [digits, setDigits] = React.useState<Digits | undefined>(undefined)
  const [currency, setCurrency] = React.useState<(typeof currencies)[number]>("SAR")

  return (
    <div className="w-full max-w-md space-y-5">
      <div className="flex flex-wrap gap-2 text-xs">
        <div className="inline-flex rounded-md border p-0.5">
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
        <div className="inline-flex rounded-md border p-0.5">
          {currencies.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCurrency(c)}
              aria-pressed={currency === c}
              className={
                "rounded-[5px] px-2 py-1 font-medium " +
                (currency === c ? "bg-primary text-primary-foreground" : "text-muted-foreground")
              }
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-xl border p-4">
        <p className="text-sm text-muted-foreground">{t("Royal Oud, 100 ml", "عود ملكي، ١٠٠ مل")}</p>
        <Price
          className="mt-1 text-2xl font-semibold"
          currencyClassName="text-base font-medium text-muted-foreground"
          amount={1250}
          compareAt={1490}
          currency={currency}
          locale={locale}
          digits={digits}
        />
      </div>

      <dl className="grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-lg border p-3">
          <dt className="text-muted-foreground">{t("Orders", "الطلبات")}</dt>
          <dd className="text-lg font-semibold">
            <NumberDisplay value={1284530} locale={locale} digits={digits} format={{ notation: "compact" }} />
          </dd>
        </div>
        <div className="rounded-lg border p-3">
          <dt className="text-muted-foreground">{t("Discount", "الخصم")}</dt>
          <dd className="text-lg font-semibold">
            <NumberDisplay value={0.16} locale={locale} digits={digits} format={{ style: "percent" }} />
          </dd>
        </div>
      </dl>
    </div>
  )
}
