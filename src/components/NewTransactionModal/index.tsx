import {
  Box,
  Button,
  IconButton,
  Modal,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { ArrowCircleUp, ArrowCircleDown, Close } from '@mui/icons-material'
import { Dispatch, SetStateAction, useContext } from 'react'
import * as RadioGroup from '@radix-ui/react-radio-group'
import { RadioGroupItem } from './RadioGroupItem'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { TransactionsContext } from '@/contexts/TransactionsContext'

const newTransactionFormSchema = z.object({
  description: z.string(),
  type: z.enum(['income', 'outcome']),
  category: z.string(),
  price: z.number(),
})

type NewTransactionFormInputs = z.infer<typeof newTransactionFormSchema>

interface NewTransactionModalProps {
  modalStatus: boolean
  setModalStatus: Dispatch<SetStateAction<boolean>>
}

export function NewTransactionModal({
  modalStatus,
  setModalStatus,
}: NewTransactionModalProps) {
  const theme = useTheme()
  const smDown = useMediaQuery(theme.breakpoints.down('sm'))
  const { createTransaction } = useContext(TransactionsContext)

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<NewTransactionFormInputs>({
    resolver: zodResolver(newTransactionFormSchema),
    defaultValues: {
      type: 'income',
    },
  })

  console.log(errors)

  function handleCreateNewTransaction(data: NewTransactionFormInputs) {
    createTransaction(data)
    handleCloseModal()
  }

  const style = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: smDown ? '100vw' : '100%',
    maxWidth: smDown ? '100vw' : 528,
    height: smDown ? '100vh' : 'initial',
    bgcolor: theme.palette.base[200],
    boxShadow: 24,
    p: '3rem',
    borderRadius: '6px',
  }

  function handleCloseModal() {
    setModalStatus(false)
    reset()
  }

  return (
    <Modal
      open={modalStatus}
      onClose={handleCloseModal}
      aria-labelledby="modal new transaction"
      aria-describedby="modal to create a new transaction"
    >
      <Box
        component="form"
        sx={style}
        onSubmit={handleSubmit(handleCreateNewTransaction)}
      >
        <Typography fontSize="1.5rem" fontWeight="bold">
          Nova transação
        </Typography>

        <IconButton
          sx={{ position: 'absolute', top: '1rem', right: '1rem' }}
          onClick={handleCloseModal}
        >
          <Close sx={{ color: theme.palette.base[500] }} />
        </IconButton>

        <Stack spacing="1rem" mt="2rem">
          <TextField
            placeholder="Descrição"
            sx={{
              bgcolor: theme.palette.base[100],
              borderRadius: '6px',
              '& .MuiInputBase-input': {
                color: theme.palette.base[600],
              },
            }}
            fullWidth
            {...register('description')}
          />
          <TextField
            placeholder="Preço"
            sx={{
              bgcolor: theme.palette.base[100],
              borderRadius: '6px',
              '& .MuiInputBase-input': {
                color: theme.palette.base[600],
              },
            }}
            fullWidth
            {...register('price', { valueAsNumber: true })}
          />
          <TextField
            placeholder="Categoria"
            sx={{
              bgcolor: theme.palette.base[100],
              borderRadius: '6px',
              '& .MuiInputBase-input': {
                color: theme.palette.base[600],
              },
            }}
            fullWidth
            {...register('category')}
          />

          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <RadioGroup.Root
                value={field.value}
                onValueChange={(value) => field.onChange(value)}
              >
                <Box
                  display="flex"
                  flexDirection={smDown ? 'column' : 'row'}
                  gap="1rem"
                  sx={{
                    'input[type=radio]': {
                      width: '0 !important',
                      height: '0 !important',
                    },
                  }}
                >
                  <RadioGroupItem value="income" id="r1" style={{ flex: 1 }}>
                    <ArrowCircleUp
                      sx={{ color: theme.palette.product.green.light }}
                    />
                    Entrada
                  </RadioGroupItem>
                  <RadioGroupItem value="outcome" id="r2" style={{ flex: 1 }}>
                    <ArrowCircleDown
                      sx={{ color: theme.palette.product.red.main }}
                    />
                    Saída
                  </RadioGroupItem>
                </Box>
              </RadioGroup.Root>
            )}
          />
        </Stack>

        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{
            mt: '2.5rem',
            py: '1rem',
            borderRadius: '6px',
          }}
          type="submit"
        >
          Cadastrar
        </Button>
      </Box>
    </Modal>
  )
}
