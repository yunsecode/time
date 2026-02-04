import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    components: {
        MuiButton: {
            defaultProps: {
                variant: 'filled'
            },
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    borderRadius: 9999
                },
                sizeSmall: {
                    height: 32,
                    padding: '0 12px',
                    fontSize: '0.875rem',
                    gap: '6px',
                    '&:has(> svg)': {
                        padding: '0 10px'
                    }
                },
                sizeMedium: {
                    height: 36,
                    padding: '8px 16px',
                    fontSize: '0.875rem',
                    '&:has(> svg)': {
                        padding: '8px 12px'
                    }
                },
                sizeLarge: {
                    height: 40,
                    padding: '0 24px',
                    fontSize: '1rem',
                    '&:has(> svg)': {
                        padding: '0 16px'
                    }
                }
            },
            variants: [
                {
                    props: { variant: 'filled' },
                    style: {
                        backgroundColor: '#0F1729',
                        color: '#fff',
                        padding: '10px 24px',
                        fontSize: '0.875rem',
                        transition: 'all 0.3s ease-in-out',
                        '&:hover': {
                            backgroundColor: '#618EFF',
                            transform: 'scale(1.05)'
                        }
                    }
                },
                {
                    props: { variant: 'outlined' },
                    style: {
                        border: '2px solid #0F1729',
                        color: '#0F1729',
                        '&:hover': {
                            backgroundColor: '#b8e986',
                            borderColor: '#b8e986',
                            color: '#0F1729'
                        }
                    }
                },
                {
                    props: { variant: 'circular-arrow' },
                    style: {
                        minWidth: 'auto',
                        width: 48,
                        height: 48,
                        borderRadius: '50%',
                        padding: 0,
                        backgroundColor: '#1976d2',
                        color: '#fff',
                        '&:hover': {
                            backgroundColor: '#1565c0'
                        }
                    }
                },
                {
                    props: { variant: 'text-arrow' },
                    style: {
                        color: '#1976d2',
                        backgroundColor: 'transparent',
                        padding: '6px 12px',
                        '&:hover': {
                            backgroundColor: 'rgba(25, 118, 210, 0.04)'
                        }
                    }
                }
            ]
        }
    }
});

export default theme;
