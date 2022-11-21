import { useReducer, useContext } from "react"
import { create_post, upload_file } from "../Utilities/FetchFunction"


const useHome = () => {
    const [info, setInfo] = useReducer(infoReducer, initialInfo)

    const submit = (e) => {
        e.preventDefault()
        
        if(info.post && info.file){
            if(info.file.type === 'text/csv'){
                //uploading the file to an S3 aws bucket first
                setInfo({hasSubmitted: true})
                const formData = new FormData()
                
                formData.append("csv_file", info.file)
                formData.append("Username", "toch")
                formData.append("Description", info.post)
                formData.append("Tags", null)
                create_post(formData)
                .then(res => {
                    if(res === 200){
                        setInfo({hasSubmitted: false, post: '', file: null, hasError: false})
                        window.location.reload(true)
                    }
                    else{
                        setInfo({hasSubmitted: false, hasError: true, errorMessage: "Error in posting, please try again."})
                    }
                }) 

            }
            else{
                setInfo({hasSubmitted: false, hasError: true, errorMessage: "File must be in csv format"})
            }
        }
        else{
            setInfo({hasSubmitted: false, hasError: true, errorMessage: "Please upload a file and/or write a description."})
        }

    }


    return {info, setInfo, submit}
}

export default useHome


const initialInfo = {
    post: '',
    file: null,
    hasError: false,
    errorMessage: '',
    hasSubmitted: false
}

const infoReducer = (state, action) => {
    return {
        ...state,
        ...action
    }
}