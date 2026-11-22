import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"

import { BeforeAfter } from "@/components/before-after"
import { CodeBlock } from "@/components/code-block"
import { docs, groups } from "@/lib/docs"
import { installCommand, site } from "@/lib/site"

export default function HomePage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
      <section className="max-w-3xl">
        <p className="mb-3 text-sm font-medium text-muted-foreground">
          A shadcn/ui registry · v0.1
        </p>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          shadcn/ui that reads right to left.
        </h1>
        <p className="mt-5 text-lg text-muted-foreground">
          Most shadcn/ui components quietly assume left-to-right: <code className="font-mono text-base">ml-*</code>,{" "}
          <code className="font-mono text-base">left-*</code>, chevrons that point right and sheets that slide in from
          the left. Drop them into an Arabic store and breadcrumbs point backwards, icons land on the wrong side of
          inputs and prices come out as <span className="whitespace-nowrap">&quot;SAR 1250.00&quot;</span>.{" "}
          {site.name} gives you drop-in versions built on logical properties, plus the Arabic pieces shadcn/ui does
          not ship: typography, prices with the right digits and Hijri dates.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link
            href="/docs/direction-provider"
            className="inline-flex h-10 items-center gap-2 rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Browse components
            <ArrowRightIcon className="size-4" />
          </Link>
          <a
            href={site.repo}
            className="inline-flex h-10 items-center rounded-md border px-5 text-sm font-medium hover:bg-accent"
          >
            View on GitHub
          </a>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="mb-4 text-sm font-medium text-muted-foreground">Same Arabic page, before and after</h2>
        <BeforeAfter />
      </section>

      <section className="mt-14 grid gap-8 lg:grid-cols-[1fr_1.2fr] [&>*]:min-w-0">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Install one component at a time</h2>
          <p className="mt-3 text-muted-foreground">
            Every item is a regular shadcn registry item. The CLI copies the source into your project, so you own it
            and can edit it. Upstream dependencies such as <code className="font-mono text-sm">button</code> come
            from the official shadcn/ui registry.
          </p>
        </div>
        <div className="space-y-3">
          <CodeBlock prompt code={installCommand("direction-provider")} />
          <CodeBlock prompt code={installCommand("dropdown-menu")} />
          <CodeBlock prompt code={installCommand("price")} />
        </div>
      </section>

      <section className="mt-14 space-y-10">
        {groups.map((group) => (
          <div key={group}>
            <h2 className="mb-4 text-sm font-medium text-muted-foreground">{group}</h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {docs
                .filter((doc) => doc.group === group)
                .map((doc) => (
                  <Link
                    key={doc.slug}
                    href={`/docs/${doc.slug}`}
                    className="group rounded-xl border p-4 transition-colors hover:bg-accent/60"
                  >
                    <h3 className="flex items-center justify-between font-medium">
                      {doc.title}
                      <ArrowRightIcon className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                    </h3>
                    <p className="mt-1.5 text-sm text-muted-foreground">{doc.description}</p>
                  </Link>
                ))}
            </div>
          </div>
        ))}
      </section>
    </main>
  )
}
