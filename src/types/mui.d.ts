import '@mui/material/Button';

declare module '@mui/material/Button' {
    interface ButtonPropsVariantOverrides {
        filled: true;
        'filled-dark': true;
        'filled-light': true;
        'circular-arrow': true;
        'text-arrow': true;
    }
}
