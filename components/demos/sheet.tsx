"use client"

import { useT } from "@/components/preview"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/registry/rtl/ui/sheet"

export default function SheetDemo() {
  const t = useT()
  return (
    <div className="flex flex-wrap gap-3">
      {(["start", "end"] as const).map((side) => (
        <Sheet key={side}>
          <SheetTrigger asChild>
            <Button variant="outline" data-demo={`sheet-${side}`}>
              {side === "start" ? t("Open menu (start)", "القائمة (البداية)") : t("Open cart (end)", "السلة (النهاية)")}
            </Button>
          </SheetTrigger>
          <SheetContent side={side} closeLabel={t("Close", "إغلاق")}>
            <SheetHeader>
              <SheetTitle>{side === "start" ? t("Menu", "القائمة") : t("Your cart", "سلة المشتريات")}</SheetTitle>
              <SheetDescription>
                {side === "start"
                  ? t("Opens from the inline start: left in LTR, right in RTL.", "تُفتح من بداية السطر: من اليسار في LTR ومن اليمين في RTL.")
                  : t("Opens from the inline end: right in LTR, left in RTL.", "تُفتح من نهاية السطر: من اليمين في LTR ومن اليسار في RTL.")}
              </SheetDescription>
            </SheetHeader>
            <SheetFooter>
              <Button>{t("Checkout", "إتمام الطلب")}</Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      ))}
    </div>
  )
}
