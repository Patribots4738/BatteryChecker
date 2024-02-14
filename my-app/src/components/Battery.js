import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";


export const Battery = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    fontSize: '1em',
    textAlign: 'center',
    color: theme.palette.text.secondary,
}))
