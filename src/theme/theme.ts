import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    borderRadius: 9999
                }
            },
            variants: [
                {
                    props: { variant: 'filled' },
                    style: {
                        backgroundColor: 'transparent',
                        color: '#fff',
                        '&:hover': {
                            backgroundColor: '#1565c0'
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
