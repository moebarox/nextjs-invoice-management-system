'use client';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'var(--font-open-sans)',
    fontSize: 16,
    body1: {
      fontSize: 16,
    },
    body2: {
      fontSize: 14,
      fontWeight: 600,
    },
    h4: {
      fontSize: 26,
      fontWeight: 700,
    },
    h5: {
      fontSize: 16,
      fontWeight: 600,
    },
  },
  components: {
    MuiInputLabel: {
      styleOverrides: {
        root: {
          transform: 'none',
          position: 'relative',
          pointerEvents: 'auto',
          fontWeight: 600,
          fontSize: 14,
          color: '#212b36',
          display: 'flex',
          gap: '4px',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '&.Mui-disabled .MuiOutlinedInput-notchedOutline': {
            borderColor: '#E2E8F0',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#1976d2',
          },
        },
        input: {
          padding: '13px 22px',
          fontSize: 16,
          '::placeholder': {
            color: '#64748B',
          },
        },
        notchedOutline: {
          border: '1.5px solid #E2E8F0',
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          marginLeft: 0,
          marginRight: 0,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          variants: [
            {
              props: { variant: 'contained' },
              style: {
                backgroundColor: '#3C50E0',
                boxShadow: 'none',
                padding: '13px 78px',
                lineHeight: 1.5,
              },
            },
          ],
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: '#E2E8F0',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0px 8px 13px -3px #00000012',
          border: '1px solid #E2E8F0',
          borderRadius: 2,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          variants: [
            {
              props: { color: 'success' },
              style: {
                backgroundColor: '#21965314',
                color: '#219653',
              },
            },
            {
              props: { color: 'warning' },
              style: {
                backgroundColor: '#FFA70B14',
                color: '#FFA70B',
              },
            },
            {
              props: { color: 'error' },
              style: {
                backgroundColor: '#D3405314',
                color: '#D34053',
              },
            },
          ],
          fontWeight: 500,
          fontSize: 14,
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: '1px solid #EEEEEE',
        },
        head: {
          borderBottom: 'none',
        },
      },
    },
    MuiList: {
      styleOverrides: {
        root: {
          padding: 0,
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          padding: 0,
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          gap: '10px',
          paddingLeft: 0,
          paddingRight: 0,
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: 'unset',
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          backgroundColor: '#E1F9F0',
          border: 'none',
          borderLeft: '7px solid #34D399',
          padding: '32px',
          borderRadius: '3px',
        },
        message: {
          color: '#637381',
          fontSize: 16,
          fontWeight: 400,
        },
      },
    },
    MuiAlertTitle: {
      styleOverrides: {
        root: {
          color: '#004434',
          fontSize: 16,
          fontWeight: 700,
        },
      },
    },
  },
});

export default theme;
