"use client"

import { ArrowRightIcon } from "lucide-react"

import { useT } from "@/components/preview"
import { useDirection } from "@/registry/rtl/ui/direction-provider"

export default function DirectionProviderDemo() {
  const t = useT()
  const dir = useDirection()
  return (
    <div className="w-full max-w-sm space-y-4">
      <p className="text-sm">
        <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs" dir="ltr">
          useDirection()
        </code>{" "}
        {t("returns", "تُرجع")}{" "}
        <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs" dir="ltr">
          &quot;{dir}&quot;
        </code>
      </p>
      <div className="flex items-center gap-3 rounded-lg border p-3">
        <span className="rounded-md bg-primary px-2 py-1 text-xs font-medium text-primary-foreground">
          {t("start", "البداية")}
        </span>
        <span className="flex-1 text-sm text-muted-foreground">{t("Reading order", "اتجاه القراءة")}</span>
        <ArrowRightIcon className="size-4 rtl:rotate-180" />
        <span className="rounded-md border px-2 py-1 text-xs font-medium">{t("end", "النهاية")}</span>
      </div>
      <p className="text-xs text-muted-foreground">
        {t(
          "Everything inside the provider, including Radix menus, selects and tabs, reads this value.",
          "كل ما داخل المزوّد، بما فيه قوائم Radix والقوائم المنسدلة والتبويبات، يقرأ هذه القيمة."
        )}
      </p>
    </div>
  )
}
