export type DocEntry = {
  slug: string
  title: string
  description: string
  group: "Foundations" | "Components" | "Arabic"
  /** Name of the upstream shadcn/ui component this replaces, if any. */
  upstream?: string
  changes: string[]
  usage: string
}

export const docs: DocEntry[] = [
  {
    slug: "direction-provider",
    title: "Direction Provider",
    group: "Foundations",
    description:
      "Sets dir and lang for a subtree, feeds Radix's own DirectionProvider and exposes useDirection().",
    changes: [
      "New: upstream has no provider that also sets the dir attribute.",
      "Wraps Radix Direction.Provider, so menus, selects, tabs and sliders flip their keyboard and placement logic.",
      "syncDocument writes dir and lang to <html> so portalled content and the scrollbar follow.",
      "useDirection() falls back to \"ltr\" without a provider, the same as Radix.",
    ],
    usage: `import { DirectionProvider } from "@/components/ui/direction-provider"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        <DirectionProvider dir="rtl" lang="ar" asWrapper={false}>
          {children}
        </DirectionProvider>
      </body>
    </html>
  )
}`,
  },
  {
    slug: "arabic-typography",
    title: "Arabic Typography",
    group: "Foundations",
    description:
      "An Arabic font stack, taller line-heights and no letter-spacing for Arabic, Persian and Urdu text.",
    changes: [
      "Adds font-arabic (IBM Plex Sans Arabic) and font-arabic-heading (Noto Kufi Arabic) theme fonts.",
      "Applies font-arabic to :lang(ar) and [dir=rtl] (so portalled dialogs pick it up too).",
      "Resets every tracking-* token to 0 inside :lang(ar): letter-spacing breaks the joins between Arabic letters. Arbitrary values like tracking-[0.1em] still work if you really want them.",
      "Raises the line-height of every text-* size: Arabic has taller ascenders and dots below the baseline.",
      "Turns em / i into a heavier weight instead of a fake oblique, which Arabic type does not have.",
    ],
    usage: `// app/layout.tsx (Next.js)
import { IBM_Plex_Sans_Arabic, Noto_Kufi_Arabic } from "next/font/google"

const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm-plex-sans-arabic",
})
const kufi = Noto_Kufi_Arabic({ subsets: ["arabic"], variable: "--font-noto-kufi-arabic" })

<html lang="ar" dir="rtl" className={\`\${plexArabic.variable} \${kufi.variable}\`}>`,
  },
  {
    slug: "breadcrumb",
    title: "Breadcrumb",
    group: "Components",
    upstream: "breadcrumb",
    description: "The separator chevron points in the reading direction.",
    changes: [
      "Default ChevronRight separator gets rtl:rotate-180, so it points left in Arabic.",
      "BreadcrumbEllipsis takes a label prop for the screen-reader text (\"المزيد\").",
      "Same API otherwise; pass your own aria-label to <Breadcrumb>.",
    ],
    usage: `<Breadcrumb aria-label="مسار التنقل">
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">الرئيسية</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>العطور</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`,
  },
  {
    slug: "pagination",
    title: "Pagination",
    group: "Components",
    upstream: "pagination",
    description: "Previous / Next chevrons mirror, padding is logical and the labels are localisable.",
    changes: [
      "sm:pl-2.5 / sm:pr-2.5 become sm:ps-2.5 / sm:pe-2.5.",
      "Both chevrons get rtl:rotate-180: \"previous\" points right in RTL.",
      "PaginationPrevious / PaginationNext take a text prop and respect your aria-label instead of hard-coded English.",
      "PaginationEllipsis takes a label prop.",
    ],
    usage: `<PaginationPrevious href="?page=1" text="السابق" aria-label="الصفحة السابقة" />
<PaginationNext href="?page=3" text="التالي" aria-label="الصفحة التالية" />`,
  },
  {
    slug: "sheet",
    title: "Sheet",
    group: "Components",
    upstream: "sheet",
    description: "side=\"start\" and side=\"end\" open from the correct edge in both directions.",
    changes: [
      "New sides start and end (default is end, which matches upstream's right in LTR).",
      "Uses start-0 / end-0, border-s / border-e and tw-animate-css's slide-in-from-start / -end, which read :dir().",
      "left and right still exist for genuinely physical edges.",
      "Close button moves from right-4 to end-4; closeLabel prop for the screen-reader text.",
      "Carries dir into the portal, because the content renders in <body>, outside your dir=\"rtl\" wrapper.",
    ],
    usage: `<Sheet>
  <SheetTrigger asChild>
    <Button variant="outline">السلة</Button>
  </SheetTrigger>
  <SheetContent side="end" closeLabel="إغلاق">
    <SheetHeader>
      <SheetTitle>سلة المشتريات</SheetTitle>
    </SheetHeader>
  </SheetContent>
</Sheet>`,
  },
  {
    slug: "dropdown-menu",
    title: "Dropdown Menu",
    group: "Components",
    upstream: "dropdown-menu",
    description: "Submenus open towards the inline end and their chevron points there.",
    changes: [
      "Submenu chevron: ml-auto becomes ms-auto plus rtl:rotate-180.",
      "Check / radio indicators move from left-2 to start-2; item padding pl-8 pr-2 becomes ps-8 pe-2.",
      "Inset items and labels use ps-8; shortcuts use ms-auto and unicode-bidi: plaintext, so ⇧⌘P is not reversed in RTL.",
      "With a DirectionProvider, Radix opens submenus to the left and binds ArrowLeft to open them.",
    ],
    usage: `<DirectionProvider dir="rtl">
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="outline">حسابي</Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuSub>
        <DropdownMenuSubTrigger>اللغة</DropdownMenuSubTrigger>
        <DropdownMenuSubContent>…</DropdownMenuSubContent>
      </DropdownMenuSub>
    </DropdownMenuContent>
  </DropdownMenu>
</DirectionProvider>`,
  },
  {
    slug: "carousel",
    title: "Carousel",
    group: "Components",
    upstream: "carousel",
    description: "Embla gets direction: \"rtl\", arrows mirror and the arrow keys swap.",
    changes: [
      "Reads the direction from the provider (or a dir prop) and passes direction to Embla; also sets dir on the root, which Embla requires.",
      "-ml-4 / pl-4 become -ms-4 / ps-4, so the gutter is on the correct side.",
      "Previous / Next buttons use -start-12 / -end-12 and their arrows get rtl:rotate-180 (horizontal only).",
      "ArrowLeft scrolls to the next slide in RTL, ArrowRight to the previous one.",
      "label prop on the buttons; reInit listener is now cleaned up.",
    ],
    usage: `<Carousel>
  <CarouselContent>
    <CarouselItem>…</CarouselItem>
  </CarouselContent>
  <CarouselPrevious label="الشريحة السابقة" />
  <CarouselNext label="الشريحة التالية" />
</Carousel>`,
  },
  {
    slug: "select",
    title: "Select",
    group: "Components",
    upstream: "select",
    description: "The check mark and item padding sit on logical sides.",
    changes: [
      "Item indicator moves from right-2 to end-2; pr-8 pl-2 becomes pe-8 ps-2.",
      "Trigger text is text-start, so a long value stays aligned with the label above it.",
      "Radix reads dir from the provider for its keyboard handling; the portalled list inherits dir from Radix.",
    ],
    usage: `<Select defaultValue="riyadh">
  <SelectTrigger className="w-56">
    <SelectValue placeholder="اختر المدينة" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="riyadh">الرياض</SelectItem>
    <SelectItem value="jeddah">جدة</SelectItem>
  </SelectContent>
</Select>`,
  },
  {
    slug: "dialog",
    title: "Dialog",
    group: "Components",
    upstream: "dialog",
    description: "Close button at the inline end, start-aligned header, direction carried into the portal.",
    changes: [
      "Close button: right-4 becomes end-4; closeLabel prop for its screen-reader text.",
      "DialogHeader: sm:text-left becomes sm:text-start.",
      "DialogFooter's built-in close button takes closeText.",
      "Sets dir on the portalled content from the nearest provider.",
    ],
    usage: `<DialogContent closeLabel="إغلاق">
  <DialogHeader>
    <DialogTitle>عنوان الشحن</DialogTitle>
  </DialogHeader>
  <DialogFooter showCloseButton closeText="إلغاء" />
</DialogContent>`,
  },
  {
    slug: "input",
    title: "Input",
    group: "Components",
    upstream: "input",
    description: "startIcon and endIcon slots that land on the correct side in both directions.",
    changes: [
      "New startIcon / endIcon props: positioned with start-3 / end-3 and padded with ps-9 / pe-9.",
      "Buttons and links inside a slot stay clickable (for clear or show-password buttons).",
      "Without icons it renders the same bare <input> as upstream.",
      "Tip: for email, URL and phone fields keep the value LTR with dir=\"ltr\" on a wrapper, not on the input, so the icon padding stays consistent.",
    ],
    usage: `import { SearchIcon } from "lucide-react"

<Input startIcon={<SearchIcon />} placeholder="ابحث عن العطور…" />`,
  },
  {
    slug: "tabs",
    title: "Tabs",
    group: "Components",
    upstream: "tabs",
    description: "Keyboard navigation and the vertical line indicator follow the reading direction.",
    changes: [
      "Vertical line indicator: after:-right-1 becomes after:-end-1.",
      "Radix reads dir from the provider, so ArrowLeft moves to the visually left tab in RTL.",
    ],
    usage: `<Tabs defaultValue="description">
  <TabsList>
    <TabsTrigger value="description">الوصف</TabsTrigger>
    <TabsTrigger value="reviews">التقييمات</TabsTrigger>
  </TabsList>
  <TabsContent value="description">…</TabsContent>
</Tabs>`,
  },
  {
    slug: "price",
    title: "Price & Number",
    group: "Arabic",
    description:
      "Prices and numbers through Intl.NumberFormat: Arabic-Indic or Latin digits, any currency, locale-correct placement.",
    changes: [
      "New. Price renders amount + currency with formatToParts, so you can style the symbol separately.",
      "Currency placement comes from the locale: \"١٬٢٥٠٫٠٠ ر.س.‏\" in ar-SA, \"SAR 1,250.00\" in en.",
      "digits=\"arab\" | \"latn\" forces the numbering system (many Saudi stores use Latin digits with Arabic text).",
      "Wrapped in <bdi> so the symbol never jumps to the wrong side inside mixed-direction text.",
      "compareAt shows a struck-through old price; NumberDisplay covers counts, percent, compact and units.",
      "formatPrice / formatNumber helpers in lib/format-number.ts for places where you need a string.",
    ],
    usage: `<Price amount={1250} currency="SAR" locale="ar-SA" />
<Price amount={1250} currency="AED" locale="ar-AE" digits="latn" compareAt={1490} />
<NumberDisplay value={0.16} format={{ style: "percent" }} />`,
  },
  {
    slug: "hijri-date",
    title: "Hijri Date",
    group: "Arabic",
    description:
      "A <time> element in the Umm al-Qura calendar, with an optional Gregorian date and a safe fallback.",
    changes: [
      "New. Formats with Intl.DateTimeFormat(\"ar-SA-u-ca-islamic-umalqura\").",
      "show=\"both\" adds the Gregorian date after the Hijri one; show=\"gregorian\" for a user preference.",
      "Falls back to Gregorian when the runtime lacks Islamic calendar data, and says so in data-calendar.",
      "Defaults to the Asia/Riyadh time zone so server and client render the same day; override with format.timeZone.",
      "formatHijri / formatGregorian helpers in lib/format-date.ts.",
    ],
    usage: `<HijriDate date={order.createdAt} />
<HijriDate date={order.createdAt} show="both" digits="latn" />
<HijriDate date={order.createdAt} locale="en" format={{ dateStyle: "full" }} />`,
  },
]

export const groups = ["Foundations", "Components", "Arabic"] as const

export function getDoc(slug: string) {
  return docs.find((doc) => doc.slug === slug)
}
