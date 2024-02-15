import SortableItem from './SortableItem'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { DndContext, MouseSensor, TouchSensor, closestCenter, useSensor } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { useEffect, useState } from 'react'

import { ref, onValue, set, update } from 'firebase/database'
import { db } from '../firebase/firebaseConfig'

export default function BatteryColumn() {
    const [batteryList, setBatteryList] = useState([])

    useEffect(() => {
        setTimeout(() => {

        const query = ref(db, 'batteries')
        return onValue(query, (snapshot) => {
            const data = snapshot.val()
            
            if (snapshot.exists()) {
                let batteryList = []
                Object.keys(data).forEach((key) => {
                    if (key == "donot") return
                    console.log(key)
                    batteryList.push(key)
                })
                setBatteryList(batteryList)
            }
        })
        }
        , 1000)
    }, []);

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
            
            const newList = () => {
                const oldIndex = batteryList.indexOf(active.id)
                const newIndex = batteryList.indexOf(over.id)
                return arrayMove(batteryList, oldIndex, newIndex)
            }

            const updates = {}
            newList().forEach((battery, index) => {
                updates[battery] = index
            })
            updates['donot'] = 'delete'
            update(ref(db, 'batteries'), updates)

            setBatteryList(newList)
        }
    }
}
