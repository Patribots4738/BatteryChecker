import React from 'react'
import { useDraggable } from '@dnd-kit/core'
import { Battery } from './Battery'

export function Draggable(props) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: props.id,
    })
    const style = transform
        ? {
              transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
          }
        : undefined

    return (
        <Battery
            ref={setNodeRef}
            style={style}
            {...listeners}
            {...attributes}
            isdraggable={true}
            elevation={0}
        >
            {props.children}
        </Battery>
    )
}
