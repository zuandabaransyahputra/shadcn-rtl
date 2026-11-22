/**
 * Locale-aware number and currency formatting for Arabic and English storefronts.
 * Pure functions, safe on the server and in the browser.
 */

export type Digits = "arab" | "latn"

export type NumberLocale = "ar" | "ar-SA" | "ar-AE" | "ar-EG" | "en" | "en-US" | (string & {})

/** Gulf currencies first; any ISO 4217 code works. */
export type CurrencyCode =
  | "SAR"
  | "AED"
  | "KWD"
  | "QAR"
  | "BHD"
  | "OMR"
  | "EGP"
  | "JOD"
  | "USD"
  | "EUR"
  | (string & {})

/**
 * Append the numbering system to a locale: ("ar-SA", "latn") -> "ar-SA-u-nu-latn".
 * Without it, "ar-SA" gives Arabic-Indic digits (١٢٣) and "en" gives Latin (123).
 */
export function withDigits(locale: string, digits?: Digits): string {
  if (!digits) return locale
  // Drop an existing -u-nu-xxxx so the toggle always wins.
  const base = locale.replace(/-u-nu-[a-z]+/i, "")
  return base.includes("-u-") ? `${base}-nu-${digits}` : `${base}-u-nu-${digits}`
}

export type FormatNumberOptions = Intl.NumberFormatOptions & {
  locale?: NumberLocale
  digits?: Digits
}

export function formatNumber(value: number | bigint, options: FormatNumberOptions = {}) {
  const { locale = "ar-SA", digits, ...intl } = options
  return new Intl.NumberFormat(withDigits(locale, digits), intl).format(value)
}

export type FormatPriceOptions = Omit<Intl.NumberFormatOptions, "style" | "currency"> & {
  currency?: CurrencyCode
  locale?: NumberLocale
  digits?: Digits
}

function priceFormatter(options: FormatPriceOptions = {}) {
  const { currency = "SAR", locale = "ar-SA", digits, currencyDisplay, ...intl } = options
  return new Intl.NumberFormat(withDigits(locale, digits), {
    style: "currency",
    currency,
    // "symbol" gives "ر.س.‏" in Arabic and "SAR" in English for the riyal.
    currencyDisplay: currencyDisplay ?? "symbol",
    ...intl,
  })
}

/**
 * Format an amount as a price. Intl places the currency where the locale expects
 * it: after the number in Arabic ("١٬٢٥٠٫٠٠ ر.س.‏"), before it in English ("SAR 1,250.00").
 */
export function formatPrice(amount: number, options: FormatPriceOptions = {}) {
  return priceFormatter(options).format(amount)
}

/** Same as formatPrice, split into parts so the symbol can be styled separately. */
export function formatPriceToParts(amount: number, options: FormatPriceOptions = {}) {
  return priceFormatter(options).formatToParts(amount)
}
