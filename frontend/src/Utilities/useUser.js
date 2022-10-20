import {useReducer} from "react"

const useUser = () => {
    const [user, setUser] = useReducer(reducer, userInitialState)

    return {user, setUser}
}

export default useUser

const userInitialState = {
    firstname:'',
    lastname:'',
    email:'',
    isLoggedIn: true
}

export const reducer = (state, action) => {
    switch(action.type){
        case 'modify':
            return {...state, ...action.value}

        case 'logout':
            return {...userInitialState, isLoggedIn:false}

        default:
            return userInitialState
    }
}