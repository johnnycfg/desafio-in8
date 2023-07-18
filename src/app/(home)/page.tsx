'use client'

import { NewTransactionModal } from '@/components/NewTransactionModal'
import { SummaryCard } from '@/components/SummaryCard'
import { TransactionsTable } from '@/components/TransactionsTable'
import { ArrowCircleUp, ArrowCircleDown, AttachMoneyOutlined, Search } from '@mui/icons-material'
import { Box, Button, Pagination, Stack, TextField, useTheme } from '@mui/material'
import { useState } from 'react'

export default function Home() {
  const theme = useTheme()
  const [newTransactionModalStatus, setNewTransactionModalStatus] = useState(true)

  return (
    <Box width="100%" maxWidth={1248} margin="0 auto" px="1.5rem" pb="2rem">
      <Box display="flex" justifyContent="space-between" gap="2rem" mt="-5rem">
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

      <Box display="flex" gap="1rem" mt="4rem" mb="1.5rem">
        <TextField 
          placeholder='Busque uma transação' 
          sx={{
            bgcolor: theme.palette.base[100],
            borderRadius: '6px',
            '& .MuiInputBase-input': {
              color: theme.palette.base[600],
            },
          }}
          fullWidth
        />

        <Button 
          variant='outlined' 
          color="primary" 
          startIcon={<Search />}
          sx={{
            px: '2rem'
          }}
        >
          Buscar
        </Button>
      </Box>

      <Stack spacing="2.5rem" alignItems="center">
        <TransactionsTable />
        <Pagination count={10} color="primary" shape='rounded' />
      </Stack>

      <NewTransactionModal modalStatus={newTransactionModalStatus} setModalStatus={setNewTransactionModalStatus} />
    </Box>
  )
}
