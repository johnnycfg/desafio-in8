'use client'

import { ReactNode } from "react"
import { CssBaseline, GlobalStyles, ThemeProvider } from '@mui/material'
import theme from "@/styles/theme"
import { globalCss } from "@/styles/global"


interface ProvidersProps {
  children: ReactNode
}

const global = globalCss(theme)

export function Providers({children}: ProvidersProps) {
  return (
    <ThemeProvider theme={theme}>
      {children}
      <CssBaseline  />
      <GlobalStyles styles={global} />
    </ThemeProvider>

  )
}