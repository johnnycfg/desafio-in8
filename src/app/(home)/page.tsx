'use client'

import { SummaryCard } from '@/components/SummaryCard'
import { ArrowCircleUp, ArrowCircleDown, AttachMoneyOutlined } from '@mui/icons-material'
import { Box, useTheme } from '@mui/material'

export default function Home() {
  const theme = useTheme()

  return (
    <Box width="100%" maxWidth={1248} margin="0 auto" px="1.5rem">
      <Box display="flex" gap="2rem" mt="-5rem">
        <SummaryCard 
          icon={<ArrowCircleUp fontSize='large' sx={{color: theme.palette.product.green.light}}  />}
          title="Entradas"
          amount={17400}
        />
        <SummaryCard 
          icon={<ArrowCircleDown fontSize='large' sx={{color: theme.palette.product.red.main}}  />} 
          title="Saídas"
          amount={1259}
        />
        <SummaryCard 
          icon={<AttachMoneyOutlined fontSize='large' sx={{color: theme.palette.common.white}}  />} variant='green' 
          title="Total"
          amount={16141}
        />
      </Box>
    </Box>
  )
}
