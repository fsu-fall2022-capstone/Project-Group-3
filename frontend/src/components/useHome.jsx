import { useReducer, useContext } from "react"
import Axios from "axios"


const useHome = () => {
    const [info, setInfo] = useReducer(infoReducer, initialInfo)

    const submit = (e) => {
        e.preventDefault()
        console.log(info.post)
    }


    return {info, setInfo, submit}
}

export default useHome


const initialInfo = {
    post: '',
    hasError: false,
    hasSubmitted: false
}

const infoReducer = (state, action) => {
    return {
        ...state,
        ...action
    }
}