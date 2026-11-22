"use client"

import { useT } from "@/components/preview"

export default function ArabicTypographyDemo() {
  const t = useT()
  return (
    <div className="w-full max-w-lg space-y-4">
      <p className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
        {t("New collection", "مجموعة جديدة")}
      </p>
      <h2 className="text-3xl font-bold">{t("Scents of the Arabian night", "عطور الليالي العربية")}</h2>
      <p className="text-base text-muted-foreground">
        {t(
          "A blend of oud, rose and amber, made in small batches in Riyadh. Free delivery on orders over 200 riyals.",
          "مزيج من العود والورد والعنبر، يُصنع بكميات صغيرة في الرياض. توصيل مجاني للطلبات التي تزيد على ٢٠٠ ريال."
        )}
      </p>
      <p className="text-sm">
        {t("Mixed text stays readable: ", "النص المختلط يبقى مقروءاً: ")}
        <span dir="ltr">iPhone 17 Pro</span>
        {t(" in stock.", " متوفر الآن.")}
      </p>
    </div>
  )
}
