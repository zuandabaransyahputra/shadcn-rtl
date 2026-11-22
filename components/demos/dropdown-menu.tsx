"use client"

import * as React from "react"
import { GlobeIcon, LogOutIcon, PackageIcon, UserIcon } from "lucide-react"

import { useT } from "@/components/preview"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/registry/rtl/ui/dropdown-menu"

export default function DropdownMenuDemo() {
  const t = useT()
  const [language, setLanguage] = React.useState("ar")
  const [offers, setOffers] = React.useState(true)
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" data-demo="dropdown-trigger">
          {t("My account", "حسابي")}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuLabel>{t("Signed in as Sara", "مسجّل باسم سارة")}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <UserIcon />
            {t("Profile", "الملف الشخصي")}
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <PackageIcon />
            {t("Orders", "طلباتي")}
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger data-demo="dropdown-sub">
              <GlobeIcon />
              {t("Language", "اللغة")}
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuRadioGroup value={language} onValueChange={setLanguage}>
                <DropdownMenuRadioItem value="ar">العربية</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="en">English</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem checked={offers} onCheckedChange={setOffers}>
          {t("Email me offers", "أرسل لي العروض")}
        </DropdownMenuCheckboxItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">
          <LogOutIcon className="rtl:rotate-180" />
          {t("Sign out", "تسجيل الخروج")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
