'use client'

import { Header } from "@/components/header";
import { Box } from "@mui/material";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode
}

export default function Layout({children}: LayoutProps) {
  return (
    <Box>
      <Header />
      {children}
    </Box>
  )
}