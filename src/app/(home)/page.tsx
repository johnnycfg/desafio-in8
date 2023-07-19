'use client'

import { SummaryCard } from '@/components/SummaryCard'
import { TransactionCard } from '@/components/TransactionCard'
import { TransactionsTable } from '@/components/TransactionsTable'
import { TransactionsContext } from '@/contexts/TransactionsContext'
import { useSummary } from '@/hooks/useSummary'
import { paginateArray } from '@/utils/paginateArray'
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
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { useContext, useEffect, useState } from 'react'

interface Transactions {
  id: string
  description: string
  type: 'income' | 'outcome'
  category: string
  price: number
  createdAt: string
}

export default function Home() {
  const theme = useTheme()
  const smDown = useMediaQuery(theme.breakpoints.down('sm'))
  const { transactions } = useContext(TransactionsContext)
  const summary = useSummary()
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    setCurrentPage(1)
  }, [search])

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

  const itemsPerPage = 5
  const transactionsAmount = Math.ceil(
    (filteredTransactions.length || transactions.length) / itemsPerPage,
  )

  const paginatedTransactions = paginateArray<Transactions>(
    filteredTransactions,
    itemsPerPage,
    currentPage,
  )

  return (
    <Box width="100%" maxWidth={1248} margin="0 auto" px="1.5rem" pb="2rem">
      <Box
        display="flex"
        justifyContent="space-between"
        gap="2rem"
        mt="-5rem"
        overflow="auto"
        pb="0.5rem"
      >
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

      <Box display="flex" gap="1rem" mt="4rem" mb="1.5rem">
        <TextField
          placeholder="Busque uma transação"
          sx={{
            bgcolor: theme.palette.base[100],
            borderRadius: '6px',
            '& .MuiInputBase-input': {
              color: theme.palette.base[600],
            },
            maxWidth: smDown ? '100%' : '300px',
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
          {smDown ? (
            <Stack spacing="0.75rem" width="100%">
              {paginatedTransactions.map((transaction) => {
                return <TransactionCard key={transaction.id} {...transaction} />
              })}
            </Stack>
          ) : (
            <TransactionsTable transactions={paginatedTransactions} />
          )}
          <Pagination
            count={transactionsAmount}
            page={currentPage}
            onChange={(e, page) => setCurrentPage(page)}
            color="primary"
            shape="rounded"
          />
        </Stack>
      )}
    </Box>
  )
}
