import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    sendPasswordResetEmail } from "firebase/auth";
  
  
export const createAccountRequest = (email, password) => {
    const auth = getAuth();
    return createUserWithEmailAndPassword(auth, email, password)
}

export const loginRequest = (email, password) => {
    const auth = getAuth();
    return signInWithEmailAndPassword(auth, email, password)
}

// export const resetPasswordRequest = (email) => {
//     const auth = getAuth();
//     return sendPasswordResetEmail(auth, email)
// }