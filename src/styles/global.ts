import { Theme } from '@mui/material'

export function globalCss(theme: Theme) {
  const global = {
    body: {
      backgroundColor: theme.palette.base[200]
    }
  }
  return global
}
