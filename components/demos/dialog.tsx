"use client"

import { MapPinIcon } from "lucide-react"

import { useT } from "@/components/preview"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/registry/rtl/ui/dialog"
import { Input } from "@/registry/rtl/ui/input"

export default function DialogDemo() {
  const t = useT()
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" data-demo="dialog-trigger">
          {t("Edit address", "تعديل العنوان")}
        </Button>
      </DialogTrigger>
      <DialogContent closeLabel={t("Close", "إغلاق")}>
        <DialogHeader>
          <DialogTitle>{t("Shipping address", "عنوان الشحن")}</DialogTitle>
          <DialogDescription>
            {t("We deliver to every city in the Gulf.", "نوصّل إلى جميع مدن الخليج.")}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-3">
          <label className="grid gap-1.5 text-sm font-medium">
            {t("District", "الحي")}
            <Input startIcon={<MapPinIcon />} defaultValue={t("Al Olaya", "العليا")} />
          </label>
          <label className="grid gap-1.5 text-sm font-medium">
            {t("Street", "الشارع")}
            <Input placeholder={t("King Fahd Road", "طريق الملك فهد")} />
          </label>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">{t("Cancel", "إلغاء")}</Button>
          </DialogClose>
          <Button>{t("Save", "حفظ")}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
