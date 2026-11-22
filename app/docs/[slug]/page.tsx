import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

import { CodeBlock } from "@/components/code-block"
import { Demo } from "@/components/demos"
import { Preview } from "@/components/preview"
import { cn } from "@/lib/utils"
import { docs, getDoc, groups } from "@/lib/docs"
import { installCommand, registryUrl } from "@/lib/site"

export function generateStaticParams() {
  return docs.map((doc) => ({ slug: doc.slug }))
}

export const dynamicParams = false

export async function generateMetadata({ params }: PageProps<"/docs/[slug]">): Promise<Metadata> {
  const { slug } = await params
  const doc = getDoc(slug)
  if (!doc) return {}
  return { title: doc.title, description: doc.description, alternates: { canonical: `/docs/${doc.slug}` } }
}

export default async function DocPage({ params }: PageProps<"/docs/[slug]">) {
  const { slug } = await params
  const doc = getDoc(slug)
  if (!doc) notFound()

  const index = docs.indexOf(doc)
  const prev = docs[index - 1]
  const next = docs[index + 1]

  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-4 py-10 md:grid-cols-[200px_1fr]">
      <aside className="md:sticky md:top-20 md:self-start">
        <nav className="flex gap-6 overflow-x-auto text-sm md:block md:space-y-6">
          {groups.map((group) => (
            <div key={group} className="shrink-0">
              <p className="mb-2 font-medium">{group}</p>
              <ul className="space-y-1">
                {docs
                  .filter((d) => d.group === group)
                  .map((d) => (
                    <li key={d.slug}>
                      <Link
                        href={`/docs/${d.slug}`}
                        aria-current={d.slug === doc.slug ? "page" : undefined}
                        className={cn(
                          "block rounded-md px-2 py-1 text-muted-foreground hover:text-foreground",
                          d.slug === doc.slug && "bg-accent font-medium text-foreground"
                        )}
                      >
                        {d.title}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </nav>
      </aside>

      <main className="min-w-0">
        <p className="text-sm text-muted-foreground">{doc.group}</p>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight">{doc.title}</h1>
        <p className="mt-3 text-lg text-muted-foreground">{doc.description}</p>

        <div className="mt-8">
          <Preview id="preview">
            <Demo slug={doc.slug} />
          </Preview>
          <p className="mt-2 text-xs text-muted-foreground">
            Toggle direction and language independently: the components only look at <code>dir</code>, the
            typography only at <code>lang</code>.
          </p>
        </div>

        <h2 className="mt-10 text-xl font-semibold tracking-tight">Installation</h2>
        <CodeBlock className="mt-3" prompt code={installCommand(doc.slug)} />
        <p className="mt-2 text-sm text-muted-foreground">
          Registry item JSON:{" "}
          <a className="underline underline-offset-4" href={`/r/${doc.slug}.json`}>
            {registryUrl(doc.slug)}
          </a>
        </p>

        <h2 className="mt-10 text-xl font-semibold tracking-tight">
          {doc.upstream ? "What changed vs upstream shadcn/ui" : "What it does"}
        </h2>
        <ul className="mt-3 list-disc space-y-2 ps-5 text-[15px] leading-relaxed">
          {doc.changes.map((change) => (
            <li key={change}>{change}</li>
          ))}
        </ul>

        <h2 className="mt-10 text-xl font-semibold tracking-tight">Usage</h2>
        <CodeBlock className="mt-3" code={doc.usage} />

        <div className="mt-12 flex justify-between gap-4 border-t pt-6 text-sm">
          {prev ? (
            <Link href={`/docs/${prev.slug}`} className="text-muted-foreground hover:text-foreground">
              ← {prev.title}
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link href={`/docs/${next.slug}`} className="text-muted-foreground hover:text-foreground">
              {next.title} →
            </Link>
          )}
        </div>
      </main>
    </div>
  )
}
