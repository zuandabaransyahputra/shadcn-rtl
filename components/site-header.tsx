import Link from "next/link"

import { site } from "@/lib/site"

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.53-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  )
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-6 px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="inline-flex size-7 items-center justify-center rounded-md bg-primary text-xs font-bold text-primary-foreground">
            ع
          </span>
          {site.name}
        </Link>
        <nav className="flex items-center gap-4 text-sm text-muted-foreground">
          <Link href="/docs/direction-provider" className="hover:text-foreground">
            Components
          </Link>
          <Link href="/docs/price" className="hidden hover:text-foreground sm:inline">
            Price
          </Link>
          <Link href="/docs/hijri-date" className="hidden hover:text-foreground sm:inline">
            Hijri date
          </Link>
        </nav>
        <a
          href={site.repo}
          className="ms-auto inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm font-medium hover:bg-accent"
        >
          <GithubIcon className="size-4" />
          <span className="hidden sm:inline">GitHub</span>
        </a>
      </div>
    </header>
  )
}

export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-6 text-sm text-muted-foreground">
        <p>
          Built by{" "}
          <a href={site.author.url} className="font-medium text-foreground underline-offset-4 hover:underline">
            {site.author.name}
          </a>
          . Builds on{" "}
          <a href="https://ui.shadcn.com" className="underline-offset-4 hover:underline">
            shadcn/ui
          </a>
          . MIT licensed.
        </p>
        <a href={site.repo} className="underline-offset-4 hover:underline">
          Source on GitHub
        </a>
      </div>
    </footer>
  )
}
