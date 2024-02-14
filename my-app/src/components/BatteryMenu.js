import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import './BatteryMenu.css'

import {DndContext} from '@dnd-kit/core'
import { Battery } from './Battery'

export default function BatteryMenu({ items: batteries }) {
    if (!batteries) { batteries = ['There are no batteries to display']}
    return (
        <div className="battery-menu">
            <Box sx={{ width: '60%' }}>
                <Stack spacing={2} direction={"column-reverse"}>
                    {batteries.map((item, index) => (
                        <Battery key={index}>{item}</Battery>
                    ))}
                </Stack>
            </Box>
        </div>
    )
}
