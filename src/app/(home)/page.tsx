'use client'

import { SummaryCard } from '@/components/SummaryCard'
import { TransactionsTable } from '@/components/TransactionsTable'
import { TransactionsContext } from '@/contexts/TransactionsContext'
import { useSummary } from '@/hooks/useSummary'
import {
  ArrowCircleUp,
  ArrowCircleDown,
  AttachMoneyOutlined,
} from '@mui/icons-material'
import {
  Box,
  Pagination,
  Stack,
  TextField,
  Typography,
  useTheme,
} from '@mui/material'
import { useContext, useState } from 'react'

export default function Home() {
  const theme = useTheme()
  const { transactions } = useContext(TransactionsContext)
  const summary = useSummary()
  const [search, setSearch] = useState('')

  const filteredTransactions = transactions.filter((transaction) => {
    if (
      transaction.description.toLowerCase().includes(search) ||
      transaction.category.toLowerCase().includes(search) ||
      transaction.price.toString().includes(search) ||
      new Date(transaction.createdAt).toLocaleDateString().includes(search)
    )
      return true

    return false
  })

  return (
    <Box width="100%" maxWidth={1248} margin="0 auto" px="1.5rem" pb="2rem">
      <Box display="flex" justifyContent="space-between" gap="2rem" mt="-5rem">
        <SummaryCard
          icon={
            <ArrowCircleUp
              fontSize="large"
              sx={{ color: theme.palette.product.green.light }}
            />
          }
          title="Entradas"
          amount={summary.income}
        />
        <SummaryCard
          icon={
            <ArrowCircleDown
              fontSize="large"
              sx={{ color: theme.palette.product.red.main }}
            />
          }
          title="Saídas"
          amount={summary.outcome}
        />
        <SummaryCard
          icon={
            <AttachMoneyOutlined
              fontSize="large"
              sx={{ color: theme.palette.common.white }}
            />
          }
          variant="green"
          title="Total"
          amount={summary.total}
        />
      </Box>

      <Box
        display="flex"
        justifyContent="flex-end"
        gap="1rem"
        mt="4rem"
        mb="1.5rem"
      >
        <TextField
          placeholder="Busque uma transação"
          sx={{
            bgcolor: theme.palette.base[100],
            borderRadius: '6px',
            '& .MuiInputBase-input': {
              color: theme.palette.base[600],
            },
            maxWidth: '300px',
          }}
          fullWidth
          value={search}
          onChange={(event) => setSearch(event.target.value.toLowerCase())}
        />
      </Box>

      {transactions.length < 1 ? (
        <Typography textAlign="center">
          Você ainda não cadastrou nenhuma transação!
        </Typography>
      ) : filteredTransactions.length < 1 ? (
        <Typography textAlign="center">
          Nenhuma transação encontrada!
        </Typography>
      ) : (
        <Stack spacing="2.5rem" alignItems="center">
          <TransactionsTable
            transactions={filteredTransactions || transactions}
          />
          <Pagination count={10} color="primary" shape="rounded" />
        </Stack>
      )}
    </Box>
  )
}
