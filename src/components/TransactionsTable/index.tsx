import { currencyFormatter } from "@/utils/currencyFormatter";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, useTheme } from "@mui/material";
import { format } from "date-fns";

interface Transactions {
  id: string
  description: string
  type: 'income' | 'outcome'
  category: string
  price: number
  createdAt: string
}

interface TransactionsTableProps {
  transactions: Transactions[]
}

export function TransactionsTable({transactions}: TransactionsTableProps) {
  const theme = useTheme()

  return (
    <TableContainer>
      <Table sx={{ minWidth: 650, borderCollapse: 'separate', borderSpacing: '0 0.5rem' }} aria-label="simple table">
        <TableHead>
          <TableRow sx={{ bgcolor: theme.palette.base[100] }}>
            <TableCell sx={{color: theme.palette.base[600], fontWeight: 'bold', border: 0}}>Descrição</TableCell>
            <TableCell sx={{color: theme.palette.base[600], fontWeight: 'bold', border: 0}}>Preço</TableCell>
            <TableCell sx={{color: theme.palette.base[600], fontWeight: 'bold', border: 0}}>Categoria</TableCell>
            <TableCell sx={{color: theme.palette.base[600], fontWeight: 'bold', border: 0}}>Data</TableCell>
            <TableCell sx={{color: theme.palette.base[600], fontWeight: 'bold', border: 0}}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow
              key={transaction.id}
              sx={{ 
                '&:last-child td, &:last-child th': { border: 0 },
                bgcolor: theme.palette.base[300] 
              }}
            >
              <TableCell  sx={{color: theme.palette.base[600], border: 0, width: '40%'}} component="th" scope="row">
                {transaction.description}
              </TableCell>
              <TableCell 
                sx={{
                  border: 0,
                  color: transaction.type === 'income' ? theme.palette.product.green.light : theme.palette.product.red.main
                }
              }>
                {transaction.type === 'outcome' && '- '} {currencyFormatter(transaction.price)}
              </TableCell>
              <TableCell sx={{color: theme.palette.base[600], border: 0}}>{transaction.category}</TableCell>
              <TableCell 
                sx={{
                  color: theme.palette.base[600], 
                  border: 0, 
                }}
              >
                {format(new Date(transaction.createdAt), 'dd/MM/yyyy')}
              </TableCell>
              <TableCell sx={{color: theme.palette.base[600], border: 0}}>actions</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}