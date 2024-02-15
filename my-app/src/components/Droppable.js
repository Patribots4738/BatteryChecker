import React from 'react'
import { useDroppable } from '@dnd-kit/core'
import { Battery } from './Battery'

export function Droppable(props) {
    const { isOver, setNodeRef } = useDroppable({
        id: props.id,
    })
    const style = {
        color: isOver ? 'green' : undefined,
    }

    return (
        <Battery ref={setNodeRef} style={style}>
            {props.children}
        </Battery>
    )
}
