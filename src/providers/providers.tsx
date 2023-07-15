'use client'

import { ReactNode } from "react"
import { CssBaseline, ThemeProvider } from '@mui/material'
import theme from "@/styles/theme"


interface ProvidersProps {
  children: ReactNode
}

export function Providers({children}: ProvidersProps) {
  return (
    <ThemeProvider theme={theme}>
      {children}
      <CssBaseline  />
    </ThemeProvider>

  )
}