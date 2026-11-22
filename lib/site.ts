/** The deployed demo / registry URL. Change it here (and in registry.json "homepage"). */
export const SITE_URL = "https://shadcn-rtl.vercel.app"

export const site = {
  name: "shadcn-rtl",
  url: SITE_URL,
  description:
    "RTL- and Arabic-ready components for shadcn/ui, distributed as a shadcn registry.",
  repo: "https://github.com/zuandabaransyahputra/shadcn-rtl",
  author: { name: "Zuanda Baransyah Putra", url: "https://zuanda.web.id" },
}

export function registryUrl(name: string) {
  return `${SITE_URL}/r/${name}.json`
}

export function installCommand(name: string) {
  return `npx shadcn@latest add ${registryUrl(name)}`
}
