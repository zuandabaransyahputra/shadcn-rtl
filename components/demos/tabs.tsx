"use client"

import { useT } from "@/components/preview"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/rtl/ui/tabs"

export default function TabsDemo() {
  const t = useT()
  return (
    <div className="grid w-full max-w-md gap-8">
      <Tabs defaultValue="description">
        <TabsList>
          <TabsTrigger value="description">{t("Description", "الوصف")}</TabsTrigger>
          <TabsTrigger value="reviews">{t("Reviews", "التقييمات")}</TabsTrigger>
          <TabsTrigger value="shipping">{t("Shipping", "الشحن")}</TabsTrigger>
        </TabsList>
        <TabsContent value="description" className="text-sm text-muted-foreground">
          {t("Use the arrow keys: they follow the visual order.", "استخدم الأسهم: تتبع الترتيب المرئي.")}
        </TabsContent>
        <TabsContent value="reviews" className="text-sm text-muted-foreground">
          {t("No reviews yet.", "لا توجد تقييمات بعد.")}
        </TabsContent>
        <TabsContent value="shipping" className="text-sm text-muted-foreground">
          {t("Ships in 2 days.", "الشحن خلال يومين.")}
        </TabsContent>
      </Tabs>
      <Tabs defaultValue="account" orientation="vertical" className="flex-row">
        <TabsList variant="line">
          <TabsTrigger value="account">{t("Account", "الحساب")}</TabsTrigger>
          <TabsTrigger value="addresses">{t("Addresses", "العناوين")}</TabsTrigger>
          <TabsTrigger value="payments">{t("Payments", "الدفع")}</TabsTrigger>
        </TabsList>
        <TabsContent value="account" className="rounded-lg border p-4 text-sm">
          {t("Vertical line variant: the indicator sits on the inline end.", "الشكل العمودي: المؤشر في نهاية السطر.")}
        </TabsContent>
        <TabsContent value="addresses" className="rounded-lg border p-4 text-sm">
          {t("Two saved addresses.", "عنوانان محفوظان.")}
        </TabsContent>
        <TabsContent value="payments" className="rounded-lg border p-4 text-sm">
          {t("Mada, Apple Pay, Tabby.", "مدى، Apple Pay، تابي.")}
        </TabsContent>
      </Tabs>
    </div>
  )
}
