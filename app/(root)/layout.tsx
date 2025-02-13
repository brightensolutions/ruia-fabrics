import type { ReactNode } from "react"
import LayoutWrapper from "./layout-wrapper"

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  )
}

