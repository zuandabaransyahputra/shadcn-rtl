"use client"

import * as React from "react"
import { MailIcon, SearchIcon, XIcon } from "lucide-react"

import { useT } from "@/components/preview"
import { Input } from "@/registry/rtl/ui/input"

export default function InputDemo() {
  const t = useT()
  const [query, setQuery] = React.useState("")
  return (
    <div className="grid w-full max-w-sm gap-4">
      <Input
        startIcon={<SearchIcon />}
        endIcon={
          query ? (
            <button
              type="button"
              aria-label={t("Clear", "مسح")}
              onClick={() => setQuery("")}
              className="rounded-sm text-muted-foreground hover:text-foreground"
            >
              <XIcon />
            </button>
          ) : null
        }
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder={t("Search perfumes…", "ابحث عن العطور…")}
        aria-label={t("Search", "بحث")}
      />
      <Input
        type="email"
        endIcon={<MailIcon />}
        placeholder={t("you@example.com", "البريد الإلكتروني")}
        aria-label={t("Email", "البريد الإلكتروني")}
      />
      <Input placeholder={t("No icons: identical to upstream", "بدون أيقونات: مطابق للأصل")} />
    </div>
  )
}
