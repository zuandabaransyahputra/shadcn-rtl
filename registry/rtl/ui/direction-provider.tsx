"use client"

import * as React from "react"
import { Direction } from "radix-ui"

type Dir = "ltr" | "rtl"

type DirectionProviderProps = {
  /** Text direction for everything inside the provider. */
  dir: Dir
  /**
   * Optional BCP 47 language tag (e.g. "ar", "ar-SA", "en"). Set on the wrapper so
   * `:lang(ar)` typography rules and screen readers pick the right language.
   */
  lang?: string
  /**
   * Also write `dir` (and `lang`) onto `<html>`. Use this once, at the root of an app,
   * so portalled content (dialogs, sheets, menus) and the scrollbar follow the direction.
   */
  syncDocument?: boolean
  /** Render the wrapper element. Turn off when you only want context + `<html>` sync. */
  asWrapper?: boolean
  className?: string
  children: React.ReactNode
}

/**
 * Sets the reading direction for a subtree.
 *
 * Wraps Radix's `Direction.Provider`, so every Radix primitive inside (dropdown
 * submenus, select, tabs keyboard navigation, sliders, ...) flips its behaviour too.
 * Read the value anywhere with `useDirection()`.
 */
function DirectionProvider({
  dir,
  lang,
  syncDocument = false,
  asWrapper = true,
  className,
  children,
}: DirectionProviderProps) {
  React.useEffect(() => {
    if (!syncDocument) return
    const html = document.documentElement
    const prevDir = html.getAttribute("dir")
    const prevLang = html.getAttribute("lang")
    html.setAttribute("dir", dir)
    if (lang) html.setAttribute("lang", lang)
    return () => {
      if (prevDir === null) html.removeAttribute("dir")
      else html.setAttribute("dir", prevDir)
      if (lang) {
        if (prevLang === null) html.removeAttribute("lang")
        else html.setAttribute("lang", prevLang)
      }
    }
  }, [dir, lang, syncDocument])

  return (
    <Direction.Provider dir={dir}>
      {asWrapper ? (
        <div
          data-slot="direction-provider"
          dir={dir}
          lang={lang}
          className={className}
        >
          {children}
        </div>
      ) : (
        children
      )}
    </Direction.Provider>
  )
}

/**
 * Current direction from the nearest `DirectionProvider` (ours or Radix's).
 * Defaults to "ltr" when there is no provider.
 */
function useDirection(localDir?: Dir): Dir {
  return Direction.useDirection(localDir)
}

export { DirectionProvider, useDirection, type Dir }
