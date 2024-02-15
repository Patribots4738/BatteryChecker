import BatteryColumn from './BatteryColumn'
import './BatteryContainer.css'
import { Stack } from '@mui/material'

export default function BatteryContainer() {
    return (
        <div>
            <h3>The List of batteries: </h3>
            <div className="battery-container">
                <Stack
                    direction="column-reverse"
                    spacing={0.5}
                    justifyContent="center"
                >
                    <BatteryColumn />
                </Stack>
            </div>
        </div>
    )
}
