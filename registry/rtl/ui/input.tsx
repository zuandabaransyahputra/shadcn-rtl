import * as React from "react"

import { cn } from "@/lib/utils"

type InputProps = React.ComponentProps<"input"> & {
  /** Icon or adornment at the inline start (left in LTR, right in RTL). */
  startIcon?: React.ReactNode
  /** Icon or adornment at the inline end (right in LTR, left in RTL). */
  endIcon?: React.ReactNode
  /** Class for the wrapper that is rendered when an icon slot is used. */
  wrapperClassName?: string
}

const inputClassName =
  "h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none selection:bg-primary selection:text-primary-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:bg-input/30 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40"

const slotClassName =
  "pointer-events-none absolute inset-y-0 flex items-center text-muted-foreground [&_a]:pointer-events-auto [&_button]:pointer-events-auto [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"

/**
 * shadcn/ui Input with `startIcon` / `endIcon` slots positioned with logical
 * properties, so a search icon sits on the right and a clear button on the left
 * in Arabic layouts without any extra classes.
 *
 * Without icons it renders a bare <input>, exactly like upstream.
 */
function Input({
  className,
  type,
  startIcon,
  endIcon,
  wrapperClassName,
  ...props
}: InputProps) {
  const input = (
    <input
      type={type}
      data-slot="input"
      className={cn(
        inputClassName,
        startIcon != null && "ps-9",
        endIcon != null && "pe-9",
        className
      )}
      {...props}
    />
  )

  if (startIcon == null && endIcon == null) return input

  return (
    <div
      data-slot="input-wrapper"
      className={cn("relative w-full", wrapperClassName)}
    >
      {startIcon != null && (
        <span data-slot="input-start-icon" className={cn(slotClassName, "start-3")}>
          {startIcon}
        </span>
      )}
      {input}
      {endIcon != null && (
        <span data-slot="input-end-icon" className={cn(slotClassName, "end-3")}>
          {endIcon}
        </span>
      )}
    </div>
  )
}

export { Input, type InputProps }
