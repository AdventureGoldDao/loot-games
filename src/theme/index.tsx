import { createTheme } from '@mui/material/styles';

export const BREAKPOINTS = {
  xs: 396,
  sm: 640,
  md: 768,
  lg: 1024,
  navSearchInputVisible: 1100,
  xl: 1280,
  xxl: 1536,
  xxxl: 1920,
}

export const customTheme = createTheme({
  palette: {
    primary: {
      main: '#A5FFBE',
    },
    error: {
      main: '#ff7d7d',
    },
    secondary: {
      main: '#85A391',
    },
    background: {
      paper: 'rgba(0, 0, 0, 1)',
    },
  },
  components: {
    MuiMenuItem: {
      styleOverrides: {
        root: {
          color: '#7FB093',
          '&.Mui-selected': {
            color: '#fff'
          }
        }
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '10px',
          textTransform: 'none',
          '&.Mui-disabled': {
            backgroundColor: '#333A33 !important',
            color: '#556659 !important'
          }
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          '& input[type="number"]::-webkit-inner-spin-button, & input[type="number"]::-webkit-outer-spin-button': {
            '-webkit-appearance': 'none',
            margin: 0,
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        // @ts-ignore
        root: {
          backgroundColor: 'rgba(165, 255, 190, 0.1)',
          borderRadius: '50px',
          color: '#fff',
          height: '28px',
          lineHeight: '28px',
          '& .MuiOutlinedInput-notchedOutline': {
            borderWidth: '1px !important'
          }
        },
        select: {
          display: 'flex',
          alignItems: 'center',
        },
        icon: {
          color: '#A5FFBE'
        }
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          color: '#A5FFBE',
          background: '#000',
          padding: '13px',
          fontSize: '13px',
          fontFamily: 'Inconsolata',
          border: '1px solid #7A9283',
          borderRadius: '6px',
          boxShadow: '0px 4px 24px 0px rgba(165, 255, 190, 0.40)'
        },
        arrow: {
          color: '#000',
          '&::before': {
            border: '1px solid #7A9283'
          }
        }
      }
    },
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          color: '#fff',
        }
      }
    },
  },
});
