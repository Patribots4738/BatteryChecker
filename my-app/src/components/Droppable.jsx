import React from 'react'
import { useDroppable } from '@dnd-kit/core'
import Battery80Icon from '@mui/icons-material/Battery80'
import Paper from '@mui/material/Paper'
import { styled } from '@mui/material'

export function Droppable(props) {
    const { isOver, setNodeRef } = useDroppable({
        id: props.id,
    })
    const style = {
        color: isOver ? 'green' : '',
    }

    const Item = styled(Paper)(({ theme }) => ({
        ...style,
        margin: theme.spacing(2),
        padding: theme.spacing(2),
        cursor: 'grab',
        color: 'white',
        fontSize: '1.2rem',
        fontWeight: 'bold',
        backgroundColor: '#7FB282',
    }))

    return (
        <div ref={setNodeRef} style={style}>
            <Item>
                <Battery80Icon />
                {props.id} {" | Usages: "} {props.count}
            </Item>
        </div>
    )
}
