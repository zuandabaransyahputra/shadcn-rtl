"use client"

import * as React from "react"

import { useLang, useT } from "@/components/preview"
import { formatNumber } from "@/registry/rtl/lib/format-number"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/registry/rtl/ui/carousel"

export default function CarouselDemo() {
  const t = useT()
  const lang = useLang()
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  React.useEffect(() => {
    if (!api) return
    const update = () => setCurrent(api.selectedScrollSnap())
    update()
    api.on("select", update)
    api.on("reInit", update)
    return () => {
      api.off("select", update)
      api.off("reInit", update)
    }
  }, [api])
  const n = (value: number) => formatNumber(value, { locale: lang === "ar" ? "ar-SA" : "en" })

  return (
    <div className="w-full max-w-xs px-12">
      <Carousel setApi={setApi}>
        <CarouselContent>
          {Array.from({ length: 5 }, (_, i) => (
            <CarouselItem key={i}>
              <div className="flex aspect-square items-center justify-center rounded-xl border bg-muted/40">
                <span className="text-5xl font-semibold">{n(i + 1)}</span>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious label={t("Previous slide", "الشريحة السابقة")} />
        <CarouselNext label={t("Next slide", "الشريحة التالية")} />
      </Carousel>
      <p className="mt-3 text-center text-sm text-muted-foreground">
        {t("Slide", "الشريحة")} {n(current + 1)} / {n(5)}
      </p>
    </div>
  )
}
