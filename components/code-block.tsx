import { cn } from "@/lib/utils"
import { CopyButton } from "@/components/copy-button"

export function CodeBlock({
  code,
  className,
  prompt = false,
}: {
  code: string
  className?: string
  /** Prefix with a shell prompt ($). */
  prompt?: boolean
}) {
  return (
    <div className={cn("group relative rounded-lg border bg-muted/40", className)} dir="ltr">
      <pre className="overflow-x-auto p-4 pe-12 font-mono text-[13px] leading-relaxed">
        <code>
          {prompt && <span className="select-none text-muted-foreground">$ </span>}
          {code}
        </code>
      </pre>
      <CopyButton value={code} className="absolute top-2.5 end-2.5" />
    </div>
  )
}
