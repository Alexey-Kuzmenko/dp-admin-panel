import { ThemeOptions, createTheme } from '@mui/material/styles';

const themeOptions: ThemeOptions = {
    typography: {
        fontFamily: 'Nunito Sans',
        h1: {
            color: '#FFFF',
            lineHeight: 'normal',
            fontWeight: '700'
        },
        h2: {
            color: '#FFFF',
            lineHeight: 'normal',
            fontWeight: '700'
        },
        h3: {
            color: '#FFFF',
            lineHeight: 'normal',
            fontWeight: '700'
        },
        h4: {
            color: '#FFFF',
            lineHeight: 'normal',
            fontWeight: '700'
        },
        h5: {
            color: '#FFFF',
            lineHeight: 'normal',
            fontWeight: '600'
        },
        body1: {
            fontSize: '1.125rem',
            color: '#7E8694',
            textAlign: 'justify'
        },
    },
    palette: {
        primary: {
            main: '#040D1B',
            light: '#071324',
            contrastText: '#FFFF'
        },
        secondary: {
            main: '#3959FF'
        },
        success: {
            main: '#01b533'
        },
        error: {
            main: '#b50101'
        }
    },
    components: {
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiFilledInput-root': { borderBottom: '2px solid #fff' },
                    '& .MuiFilledInput-root.Mui-focused': { borderBottom: '2px solid #3959FF' },
                    '& .MuiFilledInput-root.Mui-error': { borderBottom: '2px solid #d32f2f' },
                    '& .MuiInputLabel-root': { color: '#fff' },
                    '& .MuiInputLabel-root.Mui-focused': {
                        color: '#3959FF'
                    },
                    '& .MuiInputLabel-root.Mui-error': { color: '#d32f2f' },
                    '& .MuiInputLabel-root.Mui-focused.Mui-error': {
                        color: '#d32f2f'
                    },
                    textarea: { color: '#fff' },
                    input: { color: '#fff' },
                }
            }
        },
        MuiSelect: {
            styleOverrides: {
                root: {
                    color: '#fff',
                    borderBottom: '2px solid #fff',
                    ':focus': {
                        borderBottom: '2px solid #3959FF'
                    }
                },
                icon: {
                    color: '#fff'
                }
            }
        }
    }
};

export const theme = createTheme(themeOptions);