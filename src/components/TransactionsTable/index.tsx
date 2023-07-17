import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, useTheme } from "@mui/material";

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export function TransactionsTable() {
  const theme = useTheme()

  return (
    <TableContainer>
      <Table sx={{ minWidth: 650, borderCollapse: 'separate', borderSpacing: '0 0.5rem' }} aria-label="simple table">
        <TableHead>
          <TableRow sx={{ bgcolor: theme.palette.base[100] }}>
            <TableCell sx={{color: theme.palette.base[600], fontWeight: 'bold', border: 0}}>Dessert (100g serving)</TableCell>
            <TableCell sx={{color: theme.palette.base[600], fontWeight: 'bold', border: 0}} align="right">Calories</TableCell>
            <TableCell sx={{color: theme.palette.base[600], fontWeight: 'bold', border: 0}} align="right">Fat&nbsp;(g)</TableCell>
            <TableCell sx={{color: theme.palette.base[600], fontWeight: 'bold', border: 0}} align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell sx={{color: theme.palette.base[600], fontWeight: 'bold', border: 0}} align="right">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ 
                '&:last-child td, &:last-child th': { border: 0 },
                bgcolor: theme.palette.base[300] 
              }}
            >
              <TableCell  sx={{color: theme.palette.base[600], border: 0}} component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell sx={{color: theme.palette.base[600], border: 0}} align="right">{row.calories}</TableCell>
              <TableCell sx={{color: theme.palette.base[600], border: 0}} align="right">{row.fat}</TableCell>
              <TableCell sx={{color: theme.palette.base[600], border: 0}} align="right">{row.carbs}</TableCell>
              <TableCell sx={{color: theme.palette.base[600], border: 0}} align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}