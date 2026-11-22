"use client"

import { useT } from "@/components/preview"
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/registry/rtl/ui/breadcrumb"

export default function BreadcrumbDemo() {
  const t = useT()
  return (
    <Breadcrumb aria-label={t("breadcrumb", "مسار التنقل")}>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">{t("Home", "الرئيسية")}</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbEllipsis label={t("More", "المزيد")} />
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="#">{t("Perfumes", "العطور")}</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>{t("Royal Oud", "عود ملكي")}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}
