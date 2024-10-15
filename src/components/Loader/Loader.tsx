import { Backdrop, CircularProgress } from '@mui/material';

export const Loader = () => {
    return (
        <Backdrop open sx={{ color: '#FFFF', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <CircularProgress color='inherit' />
        </Backdrop >
    );
};