/**
 * Hijri (Umm al-Qura) and Gregorian date formatting with Intl.DateTimeFormat.
 * Pure functions, safe on the server and in the browser.
 */

export type DateDigits = "arab" | "latn"
export type HijriCalendar = "islamic-umalqura" | "islamic" | "islamic-civil"

export type FormatDateOptions = Omit<Intl.DateTimeFormatOptions, "calendar" | "numberingSystem"> & {
  /** "ar-SA" (default), "en", ... */
  locale?: string
  digits?: DateDigits
}

export type FormatHijriOptions = FormatDateOptions & {
  /** Umm al-Qura is the official calendar in Saudi Arabia. */
  calendar?: HijriCalendar
}

function buildLocale(locale: string, extensions: Record<string, string | undefined>) {
  const base = locale.split("-u-")[0] ?? locale
  const ext = Object.entries(extensions)
    .filter((entry): entry is [string, string] => Boolean(entry[1]))
    .map(([key, value]) => `${key}-${value}`)
    .join("-")
  return ext ? `${base}-u-${ext}` : base
}

function withDefaults(options: Intl.DateTimeFormatOptions): Intl.DateTimeFormatOptions {
  const hasFields = [
    "dateStyle",
    "timeStyle",
    "weekday",
    "era",
    "year",
    "month",
    "day",
    "hour",
    "minute",
    "second",
  ].some((key) => key in options && options[key as keyof Intl.DateTimeFormatOptions] !== undefined)
  // A fixed zone keeps server and client output identical (no hydration mismatch).
  return { timeZone: "Asia/Riyadh", ...(hasFields ? {} : { dateStyle: "long" }), ...options }
}

const supportCache = new Map<string, boolean>()

/** True when this runtime's ICU data really formats with the given calendar. */
export function supportsCalendar(calendar: string): boolean {
  const cached = supportCache.get(calendar)
  if (cached !== undefined) return cached
  let ok = false
  try {
    ok = new Intl.DateTimeFormat(`en-u-ca-${calendar}`).resolvedOptions().calendar === calendar
  } catch {
    ok = false
  }
  supportCache.set(calendar, ok)
  return ok
}

export function formatGregorian(date: Date | number | string, options: FormatDateOptions = {}) {
  const { locale = "ar-SA", digits, ...intl } = options
  return new Intl.DateTimeFormat(
    buildLocale(locale, { ca: "gregory", nu: digits }),
    withDefaults(intl)
  ).format(new Date(date))
}

/**
 * Format a date in the Hijri calendar, e.g. "١٣ جمادى الآخرة ١٤٤٨ هـ".
 * Falls back to the Gregorian calendar when the runtime has no Islamic calendar data
 * (some trimmed ICU builds); `isHijri` tells you which one you got.
 */
export function formatHijri(date: Date | number | string, options: FormatHijriOptions = {}) {
  const { calendar = "islamic-umalqura", ...rest } = options
  if (!supportsCalendar(calendar)) {
    return { text: formatGregorian(date, rest), isHijri: false }
  }
  const { locale = "ar-SA", digits, ...intl } = rest
  const text = new Intl.DateTimeFormat(
    buildLocale(locale, { ca: calendar, nu: digits }),
    withDefaults(intl)
  ).format(new Date(date))
  return { text, isHijri: true }
}
