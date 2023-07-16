'use client'

import { Header } from "@/components/header";
import { Box, useTheme } from "@mui/material";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode
}

export default function Layout({children}: LayoutProps) {
  const theme = useTheme()

  return (
    <Box bgcolor={theme.palette.base[200]} height="100vh">
      <Header />
      {children}
    </Box>
  )
}