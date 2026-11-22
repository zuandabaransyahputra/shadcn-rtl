"use client"

import { useT } from "@/components/preview"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/registry/rtl/ui/select"

export default function SelectDemo() {
  const t = useT()
  return (
    <Select defaultValue="riyadh">
      <SelectTrigger className="w-56" data-demo="select-trigger">
        <SelectValue placeholder={t("Choose a city", "اختر المدينة")} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{t("Saudi Arabia", "السعودية")}</SelectLabel>
          <SelectItem value="riyadh">{t("Riyadh", "الرياض")}</SelectItem>
          <SelectItem value="jeddah">{t("Jeddah", "جدة")}</SelectItem>
          <SelectItem value="dammam">{t("Dammam", "الدمام")}</SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>{t("United Arab Emirates", "الإمارات")}</SelectLabel>
          <SelectItem value="dubai">{t("Dubai", "دبي")}</SelectItem>
          <SelectItem value="abu-dhabi">{t("Abu Dhabi", "أبوظبي")}</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
