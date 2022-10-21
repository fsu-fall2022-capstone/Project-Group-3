import { useReducer, useContext } from "react"
import { create_post } from "../Utilities/FetchFunction"


const useHome = () => {
    const [info, setInfo] = useReducer(infoReducer, initialInfo)

    const submit = (e) => {
        e.preventDefault()

        let data = {'Username': 'toch', 'PostFileName': null, 'Description': info.post, 'Tags': null}
        setInfo({hasSubmitted: true})
        create_post(data)
        .then(res => {
            if(res === 200){
                setInfo({hasSubmitted: false, post: '', hasError: false})
            }
            else{
                setInfo({hasSubmitted: false, hasError: true})
            }
        })
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