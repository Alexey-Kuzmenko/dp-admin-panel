import { styled } from '@mui/material';
import { TableCell, tableCellClasses, TableRow } from '@mui/material';

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.primary.contrastText,
        fontSize: 16,
    },
    [`&.${tableCellClasses.body}`]: {
        color: theme.palette.primary.contrastText,
        fontSize: 16,
    },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.grey[800]
    },
    '&:nth-of-type(even)': {
        backgroundColor: theme.palette.grey[900]
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));
