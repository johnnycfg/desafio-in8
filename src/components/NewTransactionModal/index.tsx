import { Box, Button, FormControlLabel, IconButton, Modal, Stack, TextField, Typography, useTheme } from "@mui/material";
import { ArrowCircleUp, ArrowCircleDown, AttachMoneyOutlined, Search, Close } from '@mui/icons-material'
import { Dispatch, SetStateAction, useState } from "react";
import * as RadioGroup from '@radix-ui/react-radio-group';
import { RadioGroupItem } from "./RadioGroupItem";


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
    borderRadius: '6px',
  };

  const [value, setValue] = useState('female');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  function handleCloseModal() {
    setModalStatus(false)
  }


  return (
    <Modal
      open={modalStatus}
      onClose={handleCloseModal}
      aria-labelledby="modal new transaction"
      aria-describedby="modal to create a new transaction"
    >
      <Box component="form" sx={style}>
        <Typography fontSize="1.5rem" fontWeight="bold">
          Nova transação
        </Typography>

        <IconButton sx={{ position: 'absolute', top: '1rem', right: '1rem' }} onClick={handleCloseModal}>
          <Close sx={{ color: theme.palette.base[500] }} />
        </IconButton>
        
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
          defaultValue="income"
        >
          <Box display="flex" gap="1rem" sx={{ 'input[type=radio]': { width: '0 !important', height: '0 !important' } }}>
            <RadioGroupItem value="income" id="r1" style={{flex: 1}}>
              <ArrowCircleUp sx={{color: theme.palette.product.green.light}}  />
              Entrada
            </RadioGroupItem>
            <RadioGroupItem value="outcome" id="r2" style={{flex: 1}}>
              <ArrowCircleDown sx={{color: theme.palette.product.red.main}}  />
              Saída
            </RadioGroupItem>
          </Box>
        </RadioGroup.Root>
        </Stack>

        <Button 
          variant="contained" 
          color="primary"
          fullWidth
          sx={{
            mt: '2.5rem',
            py: '1rem',
            borderRadius: '6px'
          }}
        >
          Cadastrar
        </Button>
      </Box>
    </Modal>
  )
}