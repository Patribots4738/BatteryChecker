import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles'

export const Battery = styled(Paper)(({ theme, isdraggable }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    cursor: isdraggable ? 'grab' : 'default',
    padding: isdraggable ? theme.spacing(0) : theme.spacing(1),
    fontSize: '1em',
    textAlign: 'center',
    color: theme.palette.text.secondary,
}))
