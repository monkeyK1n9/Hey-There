import {db} from '../../firebase-config'
import {getDoc, getDocs, collection, doc} from 'firebase/firestore'

const getUsersLocation = async () => {
    const users = await getDocs(collection(db, 'users'))

    let data = []
    users.forEach(user => {

        data.push(user.data())
    })
    return data
}

/*
* we will use the Haversine formular of greatest circle distance to compute the distance
* between the main user and the other users and return just those whose distance from this
* user is less than 1000 metres (1km)
*/

export const mapFilter = async (id) => {
    // console.log(id)
    const mainUser = await getDoc(doc(db, "users", id))
    const usersLocation = await getUsersLocation()
    // console.log(usersLocation)
    const validUsers = usersLocation.filter((user) => {
        //main user position
        const lat1 = mainUser.data().data.location[0]
        const lon1 = mainUser.data().data.location[1]

        //other user position
        const lat2 = user.data.location[0]
        const lon2 = user.data.location[1]

        //applying Haversine formular
        const R = 6371e3; // metres
        const φ1 = lat1 * Math.PI/180; // φ, λ in radians
        const φ2 = lat2 * Math.PI/180;
        const Δφ = (lat2-lat1) * Math.PI/180;
        const Δλ = (lon2-lon1) * Math.PI/180;
    
        const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
                Math.cos(φ1) * Math.cos(φ2) *
                Math.sin(Δλ/2) * Math.sin(Δλ/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    
        const d = R * c; // in metres
        // console.log(d)
        if (d <= 1000) {
            return user
        }
    })

    return validUsers
}