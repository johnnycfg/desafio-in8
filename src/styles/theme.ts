import { ThemeOptions, createTheme } from '@mui/material'
import {
  ColorPartial,
  SimplePaletteColorOptions,
} from '@mui/material/styles/createPalette'
import { Roboto } from 'next/font/google'

const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
})

declare module '@mui/material/styles' {
  interface Palette {
    product: {
      green: SimplePaletteColorOptions
      red: SimplePaletteColorOptions
    }
    base: ColorPartial
  }

  // allow configuration using `createTheme`
  interface PaletteOptions {
    product: {
      green: SimplePaletteColorOptions
      red: SimplePaletteColorOptions
    }
    base: ColorPartial
  }
}

let theme = createTheme({
  palette: {
    product: {
      green: {
        dark: '#015F43',
        main: '#00875F',
        light: '#00B37E',
      },
      red: {
        dark: '#AA2834',
        main: '#F75A68',
      },
    },
    base: {
      '100': '#121214',
      '200': '#202024',
      '300': '#29292E',
      '400': '#323238',
      '500': '#7C7C8A',
      '600': '#C4C4CC',
      '700': '#E1E1E6',
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
})

theme = createTheme(theme, {
  components: {
    MuiTypography: {
      defaultProps: {
        color: theme.palette.base[700],
      },
    },
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.variant === 'contained' &&
            ownerState.color === 'primary' && {
              backgroundColor: theme.palette.product.green.main,
              fontWeight: 'bold',
              ':hover': {
                backgroundColor: theme.palette.product.green.light,
              },
            }),
          ...(ownerState.variant === 'outlined' &&
            ownerState.color === 'primary' && {
              fontWeight: 'bold',
              color: theme.palette.product.green.main,
              borderColor: theme.palette.product.green.main,
              ':hover': {
                color: theme.palette.product.green.light,
                borderColor: theme.palette.product.green.light,
              },
            }),
        }),
      },
    },
    MuiPaginationItem: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.color === 'primary' && {
            backgroundColor: theme.palette.base[400],
            color: theme.palette.base[600],
            fontWeight: 'bold',
            ':hover': {
              backgroundColor: theme.palette.base[500],
            },
            '&.Mui-selected': {
              backgroundColor: theme.palette.product.green.main,
            },
            '&.Mui-selected:hover': {
              backgroundColor: theme.palette.product.green.light,
            },
            '&.MuiPaginationItem-ellipsis': {
              backgroundColor: 'transparent',
            },
          }),
        }),
      },
    },
  },
} as ThemeOptions)

export default theme
