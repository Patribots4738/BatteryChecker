import { useSortable } from '@dnd-kit/sortable'
import Paper from '@mui/material/Paper'
import { CSS } from '@dnd-kit/utilities'
import { styled } from '@mui/material'
import Battery80Icon from '@mui/icons-material/Battery80'

export default function SortableItem({ id }) {
    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({ id: id })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    }

    const Item = styled(Paper)(({ theme }) => ({
        ...style,
        margin: theme.spacing(2),
        padding: theme.spacing(2),
        cursor: 'grab',
        color: 'white',
        fontSize: '1.2rem',
        fontWeight: 'bold',
        backgroundColor: '#656565',
    }))

    return (
        <div ref={setNodeRef} {...attributes} {...listeners}>
            <Item>
                <Battery80Icon />
                {id}
            </Item>
        </div>
    )
}
