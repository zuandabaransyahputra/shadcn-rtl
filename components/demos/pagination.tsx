"use client"

import { useT } from "@/components/preview"
import { formatNumber } from "@/registry/rtl/lib/format-number"
import { useLang } from "@/components/preview"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/registry/rtl/ui/pagination"

export default function PaginationDemo() {
  const t = useT()
  const lang = useLang()
  const n = (value: number) => formatNumber(value, { locale: lang === "ar" ? "ar-SA" : "en" })
  return (
    <Pagination aria-label={t("pagination", "التنقل بين الصفحات")}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            text={t("Previous", "السابق")}
            aria-label={t("Go to previous page", "الصفحة السابقة")}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">{n(1)}</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>
            {n(2)}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">{n(3)}</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis label={t("More pages", "صفحات أخرى")} />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            href="#"
            text={t("Next", "التالي")}
            aria-label={t("Go to next page", "الصفحة التالية")}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
