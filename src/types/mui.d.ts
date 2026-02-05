import '@mui/material/Button';

declare module '@mui/material/Button' {
    interface ButtonPropsVariantOverrides {
        'filled-dark': true;
        'filled-light': true;
        'circular-arrow': true;
        'text-arrow': true;
    }
}
