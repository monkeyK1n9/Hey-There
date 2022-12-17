import { doc, onSnapshot } from 'firebase/firestore';
import { db } from "../../../firebase-config";

const discussionsRequest = async (id) => {
    return new Promise((resolve, reject) => {        
        let discussionsList = []
        let discussionRef = doc(db, "discussionsList", id)
        onSnapshot(discussionRef, (snapshot) => {
            if (!snapshot) {
                resolve(discussionsList)
            }
            discussionsList.push(snapshot.data()?.data[0]);
        
            if(discussionsList.length === 0){
                return reject("Nothing found")
            }
            // console.log(discussionsList)
            resolve(discussionsList)
        })
        
    })
}


const discussionsTransform = (results = []) => {
    const mappedResults = results.map((discussions) => {
        return {
            ...discussions
        }
    })
    return mappedResults
}

export const fetchDiscussionsList = async (id) => {
    return await discussionsRequest(id).then(discussionsTransform)
}