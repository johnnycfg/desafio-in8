import { Box, Button, useTheme } from '@mui/material'
import Image from 'next/image'
import { NewTransactionModal } from '../NewTransactionModal'
import { useState } from 'react'

export function Header() {
  const theme = useTheme()
  const [newTransactionModalStatus, setNewTransactionModalStatus] =
    useState(false)

  function handleOpenNewTransactionModal() {
    setNewTransactionModalStatus(true)
  }

  return (
    <Box height={212} bgcolor={theme.palette.base[100]} pt="2.5rem">
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        width="100%"
        maxWidth={1248}
        margin="0 auto"
        px="1.5rem"
      >
        <Image src="/logo.svg" width={173} height={42} alt="Logo" priority />
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpenNewTransactionModal}
        >
          Nova transação
        </Button>
      </Box>

      <NewTransactionModal
        modalStatus={newTransactionModalStatus}
        setModalStatus={setNewTransactionModalStatus}
      />
    </Box>
  )
}
