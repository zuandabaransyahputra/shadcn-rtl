import Link from "next/link"

export default function NotFound() {
  return (
    <main className="mx-auto max-w-xl px-4 py-24 text-center">
      <h1 className="text-2xl font-semibold">Page not found</h1>
      <p className="mt-2 text-muted-foreground">
        <Link href="/" className="underline underline-offset-4">
          Back to the home page
        </Link>
      </p>
    </main>
  )
}
