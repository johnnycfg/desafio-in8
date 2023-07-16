import { Box, Button, useTheme } from "@mui/material";
import Image from "next/image";

export function Header() {
  const theme = useTheme()

  return (
    <Box height={212} bgcolor={theme.palette.base[100]} pt="2.5rem">
      <Box display="flex" alignItems="center" justifyContent="space-between" width="100%" maxWidth={1248} margin="0 auto" px="1.5rem">
        <Image src="/logo.svg" width={173} height={42} alt="Logo" priority />
        <Button variant="contained" color="primary">Nova transação</Button>
      </Box>
    </Box>
  )
}