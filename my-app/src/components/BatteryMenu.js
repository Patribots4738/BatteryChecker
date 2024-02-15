import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import './BatteryMenu.css'

import { Droppable } from './Droppable'
import { Draggable } from './Draggable'

import { DndContext, MouseSensor, TouchSensor, useSensor } from '@dnd-kit/core'
import { useState } from 'react'

export default function BatteryMenu({ items: batteries }) {
    if (!batteries) {
        batteries = ['There are no batteries to display']
    }

    const [parent, setParent] = useState(batteries[0])
    const draggableMarkup = <Draggable id="draggable">Drag me</Draggable>

    const mouseSensor = useSensor(MouseSensor, {
        activationConstraint: {
            distance: 10,
        },
    })

    const touchSensor = useSensor(TouchSensor, {
        activationConstraint: {
            delay: 250,
            tolerance: 5,
        },
    })

    return (
        <div className="battery-menu">
            <DndContext
                onDragEnd={handleDragEnd}
                sensors={[mouseSensor, touchSensor]}
            >
                <Box>
                    <Stack direction="column" spacing={2}>
                        {batteries.map((id) => (
                            <Droppable key={id} id={id}>
                                {parent === id ? draggableMarkup : 'Drop here'}
                            </Droppable>
                        ))}
                    </Stack>
                </Box>
            </DndContext>
        </div>
    )

    function handleDragEnd(event) {
        const { over } = event
        console.log('over', over)
        setParent(over ? over.id : parent)
    }
}
