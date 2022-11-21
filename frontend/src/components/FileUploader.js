import React, {useRef} from 'react'

const FileUploader = ({onFileSelectSuccess, onFileSelectError}) => {
    const fileInput = useRef(null)

    const handleFileInput = (e) => {
        const file = e.target.files[0]
        
        onFileSelectSuccess(file)
    }

    return (
        <div className = 'file'>
        <input type="file" id="datafile" onChange = {handleFileInput} />
        </div>
    )
}

export default FileUploader