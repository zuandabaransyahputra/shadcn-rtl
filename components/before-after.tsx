import { SearchIcon } from "lucide-react"

import * as Upstream from "@/components/upstream/breadcrumb"
import * as UpstreamPagination from "@/components/upstream/pagination"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/registry/rtl/ui/breadcrumb"
import { Input } from "@/registry/rtl/ui/input"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/registry/rtl/ui/pagination"
import { Price } from "@/registry/rtl/ui/price"

function Panel({
  label,
  tone,
  children,
}: {
  label: string
  tone: "before" | "after"
  children: React.ReactNode
}) {
  return (
    <figure className="overflow-hidden rounded-xl border bg-card">
      <figcaption className="flex items-center gap-2 border-b bg-muted/40 px-4 py-2 text-xs font-medium">
        <span
          className={
            tone === "before"
              ? "size-2 rounded-full bg-destructive"
              : "size-2 rounded-full bg-emerald-500"
          }
        />
        {label}
      </figcaption>
      <div dir="rtl" lang="ar" className="space-y-6 p-6">
        {children}
      </div>
    </figure>
  )
}

export function BeforeAfter() {
  return (
    <div className="grid gap-4 md:grid-cols-2" id="before-after">
      <Panel tone="before" label="Before: shadcn/ui copied as-is, inside dir=&quot;rtl&quot;">
        <Upstream.Breadcrumb>
          <Upstream.BreadcrumbList>
            <Upstream.BreadcrumbItem>
              <Upstream.BreadcrumbLink href="#">الرئيسية</Upstream.BreadcrumbLink>
            </Upstream.BreadcrumbItem>
            <Upstream.BreadcrumbSeparator />
            <Upstream.BreadcrumbItem>
              <Upstream.BreadcrumbLink href="#">العطور</Upstream.BreadcrumbLink>
            </Upstream.BreadcrumbItem>
            <Upstream.BreadcrumbSeparator />
            <Upstream.BreadcrumbItem>
              <Upstream.BreadcrumbPage>عود ملكي</Upstream.BreadcrumbPage>
            </Upstream.BreadcrumbItem>
          </Upstream.BreadcrumbList>
        </Upstream.Breadcrumb>

        {/* The usual hand-rolled search field: icon pinned with left-3 / pl-9. */}
        <div className="relative">
          <SearchIcon className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            className="h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 pl-9 text-sm tracking-wide shadow-xs outline-none placeholder:text-muted-foreground"
            placeholder="ابحث عن العطور…"
          />
        </div>

        <UpstreamPagination.Pagination className="justify-start">
          <UpstreamPagination.PaginationContent>
            <UpstreamPagination.PaginationItem>
              <UpstreamPagination.PaginationPrevious href="#" />
            </UpstreamPagination.PaginationItem>
            <UpstreamPagination.PaginationItem>
              <UpstreamPagination.PaginationLink href="#" isActive>
                2
              </UpstreamPagination.PaginationLink>
            </UpstreamPagination.PaginationItem>
            <UpstreamPagination.PaginationItem>
              <UpstreamPagination.PaginationNext href="#" />
            </UpstreamPagination.PaginationItem>
          </UpstreamPagination.PaginationContent>
        </UpstreamPagination.Pagination>

        <p className="text-lg font-semibold tabular-nums">SAR {(1250).toFixed(2)}</p>
      </Panel>

      <Panel tone="after" label="After: shadcn-rtl, same markup">
        <Breadcrumb aria-label="مسار التنقل">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">الرئيسية</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="#">العطور</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>عود ملكي</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <Input startIcon={<SearchIcon />} placeholder="ابحث عن العطور…" className="tracking-wide" />

        <Pagination className="justify-start" aria-label="التنقل بين الصفحات">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" text="السابق" aria-label="الصفحة السابقة" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                ٢
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" text="التالي" aria-label="الصفحة التالية" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>

        <Price amount={1250} className="text-lg font-semibold" />
      </Panel>
    </div>
  )
}
