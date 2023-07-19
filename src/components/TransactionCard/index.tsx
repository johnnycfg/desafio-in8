import {
  Box,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { currencyFormatter } from '@/utils/currencyFormatter'
import { CalendarMonth, DeleteOutline, Label } from '@mui/icons-material'
import { format } from 'date-fns'
import { useContext } from 'react'
import { TransactionsContext } from '@/contexts/TransactionsContext'

interface TransactionCardProps {
  id: string
  description: string
  type: 'income' | 'outcome'
  category: string
  price: number
  createdAt: string
}

export function TransactionCard({
  category,
  createdAt,
  price,
  description,
  type,
  id,
}: TransactionCardProps) {
  const theme = useTheme()
  const smDown = useMediaQuery(theme.breakpoints.down('sm'))
  const { deleteTransaction } = useContext(TransactionsContext)

  return (
    <Box position="relative">
      <IconButton
        onClick={() => deleteTransaction(id)}
        sx={{ position: 'absolute', top: '0.5rem', right: '0.5rem' }}
      >
        <DeleteOutline sx={{ color: theme.palette.base[500] }} />
      </IconButton>

      <Stack
        spacing="0.75rem"
        width="100%"
        minWidth={smDown ? '282px' : 'initial'}
        bgcolor={theme.palette.base[400]}
        p="1.25rem"
        borderRadius="6px"
      >
        <Box>
          <Typography color={theme.palette.base[600]}>{description}</Typography>

          <Typography
            fontSize="1.25rem"
            color={
              type === 'income'
                ? theme.palette.product.green.light
                : theme.palette.product.red.main
            }
          >
            {type === 'outcome' && '- '} {currencyFormatter(price)}
          </Typography>
        </Box>

        <Box display="flex" justifyContent="space-between">
          <Typography
            color={theme.palette.base[500]}
            sx={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}
          >
            <Label />
            {category}
          </Typography>
          <Typography
            color={theme.palette.base[500]}
            sx={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}
          >
            <CalendarMonth />
            {format(new Date(createdAt), 'dd/MM/yyyy')}
          </Typography>
        </Box>
      </Stack>
    </Box>
  )
}
