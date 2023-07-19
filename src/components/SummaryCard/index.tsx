import { Box, Stack, Typography, useMediaQuery, useTheme } from '@mui/material'
import { ReactNode } from 'react'
import { currencyFormatter } from '@/utils/currencyFormatter'

interface SummaryCardProps {
  variant?: 'grey' | 'green'
  icon: ReactNode
  title: string
  amount: number
}

export function SummaryCard({
  variant = 'grey',
  icon,
  title,
  amount,
}: SummaryCardProps) {
  const theme = useTheme()
  const smDown = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Stack
      spacing="0.75rem"
      width="100%"
      minWidth={smDown ? '282px' : 'initial'}
      maxWidth={378}
      bgcolor={
        variant === 'grey'
          ? theme.palette.base[400]
          : theme.palette.product.green.dark
      }
      p="1.5rem 2rem"
      borderRadius="6px"
    >
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography color={theme.palette.base[600]}>{title}</Typography>
        {icon}
      </Box>

      <Typography fontSize="2rem">{currencyFormatter(amount)}</Typography>
    </Stack>
  )
}
