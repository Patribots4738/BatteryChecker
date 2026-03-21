import { ref, get} from 'firebase/database';
import 'firebase/database';
import { db } from '.firebase/firebaseConfig';

async function getBatteries() {
    const dbRef = ref(db)
    const snapshot = await get(dbRef)
    const howManyBatteries = snapshot.size
    console.log(howManyBatteries)
    return snapshot
}

export async function getBattery(battery) {
    
}

