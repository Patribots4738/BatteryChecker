import SortableItem from './SortableItem'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import {
    DndContext,
    MouseSensor,
    TouchSensor,
    closestCenter,
    useSensor,
} from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'

import { Droppable } from './Droppable'
import { useEffect, useState } from 'react'
import { ref, onValue, set, update } from 'firebase/database'
import { db } from '../firebase/firebaseConfig'

export default function BatteryColumn() {
    const [batteryList, setBatteryList] = useState([])
    const [activeBattery, setActiveBattery] = useState('')
    const [data, setData] = useState({})

    useEffect(() => {
        // Check if there is data in local storage
        const localData = localStorage.getItem('batteryData')
        if (localData) {
            const parsedData = JSON.parse(localData)
            setData(parsedData)
            setBatteryList(Object.keys(parsedData).filter(key => key !== 'Active Battery' && key !== 'donot'))
            setActiveBattery(parsedData['Active Battery'])
        }

        // Fetch data from the database
        const query = ref(db, 'batteries')
        onValue(query, (snapshot) => {
            const data = snapshot.val()
            if (snapshot.exists()) {
                setData(data)
                localStorage.setItem('batteryData', JSON.stringify(data)) // Update local storage
                let batteryList = []
                Object.keys(data)
                    .filter((key) => key !== 'donot' && key !== 'Active Battery')
                    .sort((a, b) => data[a].index - data[b].index)
                    .forEach((key) => {
                        if (data[key].index === -1) return
                        batteryList.push(key)
                    })
                setActiveBattery(data['Active Battery'])
                setBatteryList(batteryList)
            }
        })
    }, [])

    const mouseSensor = useSensor(MouseSensor)
    const touchSensor = useSensor(TouchSensor)

    return (
        <div>
            <DndContext
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
                sensors={[mouseSensor, touchSensor]}
                autoScroll={{ threshold: { x: 0, y: 0.2 } }}
            >
                <Droppable id={activeBattery} value={activeBattery} count={data[activeBattery]?.count} />
                <SortableContext
                    items={batteryList}
                    strategy={verticalListSortingStrategy}
                >
                    {console.log('batteryList:', batteryList)}
                    {batteryList.map((battery, index) => (
                        <SortableItem
                            key={battery}
                            id={battery}
                            index={index}
                            count={data[battery].count}
                        />
                    ))}
                </SortableContext>
            </DndContext>
        </div>
    )

    function resetDatabase() {
        const updates = {
            'Battery 1': { index: -1, count: 0 },
            'Battery 2': { index: 0, count: 0 },
            'Battery 3': { index: 1, count: 0 },
            'Battery 4': { index: 2, count: 0 },
            'Battery 5': { index: 3, count: 0 },
            'Battery 6': { index: 4, count: 0 },
            'Battery 7': { index: 5, count: 0 },
            'Battery 8': { index: 6, count: 0 },
            donot: 'delete',
            'Active Battery': 'Battery 1',
        }
        set(ref(db, 'batteries'), updates)
    }

    function handleActiveBatteryChange(event) {
        const { active, over } = event
        console.log('active:', active.id)
        console.log('over:', over.id)
        let newBatteryList = [...batteryList]
        if (active.id !== over.id) {
            setActiveBattery(active.id)
            const activeIndex = batteryList.indexOf(active.id)
            const overIndex = batteryList.indexOf(over.id)

            newBatteryList.splice(activeIndex, 1)

            const lastActive = overIndex === -1

            newBatteryList.splice((lastActive) ? activeIndex : overIndex, 0, (lastActive) ? over.id : active.id)
        } else {
            const activeIndex = batteryList.indexOf(active.id)
            newBatteryList.splice(activeIndex, 1)
        }
        return newBatteryList
    }

    function sendDatabaseChange(event) {
        const { active, over } = event
        const updates = {
            [active.id]: {index: batteryList.indexOf(over.id), count: data[active.id].count},
            [over.id]: {index: batteryList.indexOf(active.id), count: data[over.id].count + 1},
            'Active Battery': active.id,
        }
        updateDatabase(updates)
    }

    function updateDatabase(updates) {
        update(ref(db, 'batteries'), updates)
        // Update local storage
        const updatedData = { ...data, ...updates }
        setData(updatedData)
        localStorage.setItem('batteryData', JSON.stringify(updatedData))
    }

    function handleDragEnd(event) {
        const { active, over } = event

        let newBatteryList = [...batteryList]

        if (!over) return
        if (activeBattery !== over.id) {
            const oldIndex = batteryList.indexOf(active.id)
            const newIndex = batteryList.indexOf(over.id)
            newBatteryList = arrayMove(batteryList, oldIndex, newIndex)

            let updates = {}
            newBatteryList.forEach((battery, index) => {
                if (battery === -1) return
                updates[battery] = {index: index, count: data[battery].count}
            })
            updates['Active Battery'] = activeBattery
            console.log('activeBattery:', activeBattery)
            console.log('over.id:', over.id)
            updateDatabase(updates)
        }else if (active.id !== over.id) {
            // check if we are dragging onto the active battery, if so, we don't want to change the order
            console.log('activeBattery:', activeBattery)
            console.log('over.id:', over.id)
            sendDatabaseChange(event)
            newBatteryList = handleActiveBatteryChange(event)
            
        }

        setBatteryList(newBatteryList)
    }
}
