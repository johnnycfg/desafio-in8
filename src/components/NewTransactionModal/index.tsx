import { Box, FormControlLabel, Modal, Stack, TextField, Typography, useTheme } from "@mui/material";
import { ArrowCircleUp, ArrowCircleDown, AttachMoneyOutlined, Search } from '@mui/icons-material'
import { Dispatch, SetStateAction, useState } from "react";
import * as RadioGroup from '@radix-ui/react-radio-group';


interface NewTransactionModalProps {
  modalStatus: boolean
  setModalStatus: Dispatch<SetStateAction<boolean>>
}

export function NewTransactionModal({modalStatus, setModalStatus}: NewTransactionModalProps) {
  const theme = useTheme()

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    maxWidth: 528,
    bgcolor: theme.palette.base[200],
    boxShadow: 24,
    p: '3rem',
    borderRadius: '6px'
  };

  const [value, setValue] = useState('female');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };


  return (
    <Modal
      open={modalStatus}
      onClose={setModalStatus}
      aria-labelledby="modal new transaction"
      aria-describedby="modal to create a new transaction"
    >
      <Box sx={style}>
        <Typography fontSize="1.5rem" fontWeight="bold">
          Nova transação
        </Typography>
        
        <Stack spacing="1rem" mt="2rem">
          <TextField
            placeholder='Descrição' 
            sx={{
              bgcolor: theme.palette.base[100],
              borderRadius: '6px',
              '& .MuiInputBase-input': {
                color: theme.palette.base[600],
              },
            }}
            fullWidth
          />
            <TextField
            placeholder='Preço' 
            sx={{
              bgcolor: theme.palette.base[100],
              borderRadius: '6px',
              '& .MuiInputBase-input': {
                color: theme.palette.base[600],
              },
            }}
            fullWidth
          />
            <TextField
            placeholder='Categoria' 
            sx={{
              bgcolor: theme.palette.base[100],
              borderRadius: '6px',
              '& .MuiInputBase-input': {
                color: theme.palette.base[600],
              },
            }}
            fullWidth
          />

        <RadioGroup.Root
          className="flex w-fit rounded-t-xl bg-white px-3"
          defaultValue="buy"
        >
          <Box display="flex" gap="1rem">
            <Box 
              sx={{
                p: '1rem 1.5rem',
                borderradius: '6px',
                bgcolor: theme.palette.base[300],
                color: theme.palette.base[600],
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
              }}
            >
              <RadioGroup.Item value="income" id="r1">
                <RadioGroup.Indicator />
              </RadioGroup.Item>
              <ArrowCircleUp sx={{color: theme.palette.product.green.light}}  />
              <label htmlFor="r1">Entrada</label>
            </Box>

            <Box className="px-[20px] py-[18px] [&:has(input:checked)]:border-b-4 [&:has(input:checked)]:border-b-primary text-small-text [&:has(input:checked)]:text-primary font-bold">
              <RadioGroup.Item value="outcome" id="r2">
                <RadioGroup.Indicator />
              </RadioGroup.Item>
              <label htmlFor="r2">Saída</label>
            </Box>
          </Box>
        </RadioGroup.Root>
        </Stack>
      </Box>
    </Modal>
  )
}