import * as React from 'react'
import './App.css'
import BatteryMenu from './components/BatteryMenu'

export default function App() {
    return (
        <div className="App">
            <BatteryMenu items={["Battery1", "Battery2", "Battery3"]}/>
        </div>
    )
}
