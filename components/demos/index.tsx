"use client"

import type * as React from "react"

import ArabicTypographyDemo from "./arabic-typography"
import BreadcrumbDemo from "./breadcrumb"
import CarouselDemo from "./carousel"
import DialogDemo from "./dialog"
import DirectionProviderDemo from "./direction-provider"
import DropdownMenuDemo from "./dropdown-menu"
import HijriDateDemo from "./hijri-date"
import InputDemo from "./input"
import PaginationDemo from "./pagination"
import PriceDemo from "./price"
import SelectDemo from "./select"
import SheetDemo from "./sheet"
import TabsDemo from "./tabs"

const demos: Record<string, React.ComponentType> = {
  "direction-provider": DirectionProviderDemo,
  "arabic-typography": ArabicTypographyDemo,
  breadcrumb: BreadcrumbDemo,
  pagination: PaginationDemo,
  sheet: SheetDemo,
  "dropdown-menu": DropdownMenuDemo,
  carousel: CarouselDemo,
  select: SelectDemo,
  dialog: DialogDemo,
  input: InputDemo,
  tabs: TabsDemo,
  price: PriceDemo,
  "hijri-date": HijriDateDemo,
}

export function Demo({ slug }: { slug: string }) {
  const Component = demos[slug]
  return Component ? <Component /> : null
}
