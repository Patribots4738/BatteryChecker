import SortableItem from './SortableItem'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { DndContext, MouseSensor, TouchSensor, closestCenter, useSensor } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { useState } from 'react'

export default function BatteryColumn() {
    const [batteryList, setBatteryList] = useState([
        'Battery 1',
        'Battery 2',
        'Battery 3',
        'Battery 4',
        'Battery 5',
        'Battery 6',
        'Battery 7',
        'Battery 8',
        'Battery 9',
        'Battery 10',
        'Battery 11',
        'Battery 12',
        'Battery 13',
        'Battery 14',
    ])

    const mouseSensor = useSensor(MouseSensor);
    const touchSensor = useSensor(TouchSensor);

    return (
        <DndContext
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            sensors={[mouseSensor, touchSensor]}
            autoScroll={{threshold: {x: 0, y: 0.2}}}
        >
            <SortableContext
                items={batteryList}
                strategy={verticalListSortingStrategy}
            >
                {batteryList.map((battery, index) => (
                    <SortableItem key={battery} id={battery} index={index}/>
                ))}
            </SortableContext>
        </DndContext>
    )

    function handleDragEnd(event) {
        const { active, over } = event
        if (over && active.id !== over.id) {
            setBatteryList((items) => {
                const oldIndex = items.indexOf(active.id)
                const newIndex = items.indexOf(over.id)
                return arrayMove(items, oldIndex, newIndex)
            })
        }
    }
}
