import { doc, onSnapshot } from 'firebase/firestore';
import { db } from "../../firebase-config";

const messagesRequest = async (id) => {
    return new Promise((resolve, reject) => {        
        let messagesList = []
        let messageRef = doc(db, "messages", id)
        onSnapshot(messageRef, (snapshot) => {
            if (!snapshot) {
                resolve(messagesList)
            }
            messagesList.push(snapshot.data());
        
            if(messagesList.length === 0){
                return reject("Nothing found")
            }
            // console.log(discussionsList)
            resolve(messagesList)
        })
        
    })
}


const messagesTransform = (results = []) => {
    const mappedResults = results.map((messages) => {
        return {
            ...messages
        }
    })
    return mappedResults
}

export const fetchMessages = async (id) => {
    return await messagesRequest(id).then(messagesTransform)
}