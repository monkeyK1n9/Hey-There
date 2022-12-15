import React, { createContext, useEffect, useState, useContext } from 'react';
import { AuthenticationContext } from '../Authentication/AuthenticationContext';
import { fetchDiscussionsList } from './DiscussionService';
import {getAuth, onAuthStateChanged} from 'firebase/auth';


export const DiscussionContext = createContext()

export const DiscussionContextProvider = ({children}) => {
    const {user} = useContext(AuthenticationContext)

    const [discussionsList, setDiscussionsList] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [check, setCheck] = useState(false)
    
    const auth = getAuth();
  
    useEffect(() => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setCheck(true)
        } else {
          setCheck(false)
        }
      })
    }, []);

    useEffect(() => {
        setIsLoading(true)
        
        fetchDiscussionsList(user?.uid)
        .then(discussions => {
            setDiscussionsList(discussions)
            // console.log(discussions)
            setIsLoading(false)
        })
        .catch(err => {
            // console.error(err)
            setIsLoading(false)
        })

    }, [discussionsList, check])


    return (
        <DiscussionContext.Provider
            value={{
                isLoading,
                discussionsList
            }}
        >
            {children}
        </DiscussionContext.Provider>
    )
}