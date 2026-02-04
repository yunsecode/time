import '@mui/material/Button';

declare module '@mui/material/Button' {
    interface ButtonPropsVariantOverrides {
        filled: true;
        'circular-arrow': true;
        'text-arrow': true;
    }
}
