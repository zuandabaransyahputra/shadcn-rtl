import * as React from "react"

import { cn } from "@/lib/utils"
import {
  formatGregorian,
  formatHijri,
  type DateDigits,
  type HijriCalendar,
} from "@/registry/rtl/lib/format-date"

type HijriDateProps = Omit<React.ComponentProps<"time">, "children" | "dateTime"> & {
  date: Date | number | string
  /** "ar-SA" (default), "en", ... */
  locale?: string
  /** Force Arabic-Indic (١٢٣) or Latin (123) digits. */
  digits?: DateDigits
  /**
   * "hijri" (default): Hijri only. "both": Hijri with the Gregorian date after it.
   * "gregorian": Gregorian only (handy behind a user preference).
   */
  show?: "hijri" | "both" | "gregorian"
  calendar?: HijriCalendar
  /** Intl.DateTimeFormat options; defaults to { dateStyle: "long" }. */
  format?: Omit<Intl.DateTimeFormatOptions, "calendar" | "numberingSystem">
  /** Class for the secondary (Gregorian) date when show="both". */
  secondaryClassName?: string
}

/**
 * Renders a <time> element in the Hijri (Umm al-Qura) calendar, with an optional
 * Gregorian date beside it. Falls back to Gregorian when the runtime lacks Islamic
 * calendar data, so it never shows a wrong or empty date.
 */
function HijriDate({
  date,
  locale = "ar-SA",
  digits,
  show = "hijri",
  calendar,
  format,
  className,
  secondaryClassName,
  ...props
}: HijriDateProps) {
  const value = new Date(date)
  const options = { locale, digits, ...format }
  const gregorian = formatGregorian(value, options)
  const hijri = show === "gregorian" ? null : formatHijri(value, { ...options, calendar })

  return (
    <time
      data-slot="hijri-date"
      data-calendar={hijri?.isHijri ? (calendar ?? "islamic-umalqura") : "gregory"}
      dateTime={value.toISOString()}
      className={cn("inline-flex flex-wrap items-baseline gap-x-2", className)}
      {...props}
    >
      <bdi>{hijri ? hijri.text : gregorian}</bdi>
      {show === "both" && hijri?.isHijri && (
        <bdi
          data-slot="hijri-date-gregorian"
          className={cn("text-[0.875em] text-muted-foreground", secondaryClassName)}
        >
          {gregorian}
        </bdi>
      )}
    </time>
  )
}

export { HijriDate, type HijriDateProps }
