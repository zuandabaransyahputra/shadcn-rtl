import * as React from "react"

import { cn } from "@/lib/utils"
import {
  formatNumber,
  formatPriceToParts,
  type CurrencyCode,
  type Digits,
  type NumberLocale,
} from "@/registry/rtl/lib/format-number"

type PriceProps = Omit<React.ComponentProps<"span">, "children"> & {
  amount: number
  /** ISO 4217 code. Defaults to "SAR". */
  currency?: CurrencyCode
  /** "ar-SA" (default), "ar-AE", "en", ... */
  locale?: NumberLocale
  /** Force Arabic-Indic (١٢٣) or Latin (123) digits regardless of locale. */
  digits?: Digits
  /** How the currency is shown. "symbol" by default. */
  currencyDisplay?: Intl.NumberFormatOptions["currencyDisplay"]
  minimumFractionDigits?: number
  maximumFractionDigits?: number
  /** Previous price, shown struck through after the current one. */
  compareAt?: number
  /** Class for the currency part (e.g. "text-xs text-muted-foreground"). */
  currencyClassName?: string
}

function PriceText({
  amount,
  className,
  currencyClassName,
  ...options
}: {
  amount: number
  className?: string
  currencyClassName?: string
} & Pick<
  PriceProps,
  | "currency"
  | "locale"
  | "digits"
  | "currencyDisplay"
  | "minimumFractionDigits"
  | "maximumFractionDigits"
>) {
  const parts = formatPriceToParts(amount, options)
  return (
    // <bdi> isolates the price so the bidi algorithm never moves the symbol
    // to the wrong side of the number inside mixed Arabic/English text.
    <bdi className={className}>
      {parts.map((part, i) =>
        part.type === "currency" ? (
          <span key={i} data-slot="price-currency" className={currencyClassName}>
            {part.value}
          </span>
        ) : (
          <React.Fragment key={i}>{part.value}</React.Fragment>
        )
      )}
    </bdi>
  )
}

/**
 * A price formatted with Intl.NumberFormat: correct digits, separators and
 * currency placement for Arabic and English, plus an optional compare-at price.
 */
function Price({
  amount,
  currency = "SAR",
  locale = "ar-SA",
  digits,
  currencyDisplay,
  minimumFractionDigits,
  maximumFractionDigits,
  compareAt,
  currencyClassName,
  className,
  ...props
}: PriceProps) {
  const options = {
    currency,
    locale,
    digits,
    currencyDisplay,
    minimumFractionDigits,
    maximumFractionDigits,
  }
  return (
    <span
      data-slot="price"
      className={cn("inline-flex flex-wrap items-baseline gap-x-2 tabular-nums", className)}
      {...props}
    >
      <PriceText amount={amount} currencyClassName={currencyClassName} {...options} />
      {compareAt != null && compareAt > amount && (
        <del data-slot="price-compare-at" className="text-[0.85em] text-muted-foreground">
          <PriceText amount={compareAt} currencyClassName={currencyClassName} {...options} />
        </del>
      )}
    </span>
  )
}

type NumberDisplayProps = Omit<React.ComponentProps<"span">, "children"> & {
  value: number
  locale?: NumberLocale
  digits?: Digits
  /** Any Intl.NumberFormat option: style "percent", notation "compact", unit, ... */
  format?: Intl.NumberFormatOptions
}

/** A plain number (count, percent, compact, unit) in the right digits. */
function NumberDisplay({
  value,
  locale = "ar-SA",
  digits,
  format,
  className,
  ...props
}: NumberDisplayProps) {
  return (
    <span data-slot="number" className={cn("tabular-nums", className)} {...props}>
      <bdi>{formatNumber(value, { locale, digits, ...format })}</bdi>
    </span>
  )
}

export { Price, NumberDisplay, type PriceProps, type NumberDisplayProps }
