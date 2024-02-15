import React, { useState } from 'react'
import { DndContext } from '@dnd-kit/core'
import BatteryMenu from './components/BatteryMenu'

export default function App() {
    return (
        <div className="App">
            <BatteryMenu items={['Battery 1', 'Battery 2', 'Battery 3']} />
        </div>
    )
}
