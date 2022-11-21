import React from 'react'
import "../styles/home.css";
import useHome from './useHome';
import Alert from '@mui/material/Alert';
import { CircularProgress } from '@mui/material';
import PostsList from './PostsList';
import FileUploader from './FileUploader';

function Home(){
    const {info, setInfo, submit} = useHome()

    return(
        <div className="home">
            { info.hasError ? <Alert severity="error"> {info.errorMessage} </Alert> : <></>}
            <div className = "card"> 
                <div className = 'tweet'>
                    <form className = "post-form" onSubmit={submit}>
                    <textarea className='text-tweet' placeholder='Share something...' value = {info.post} onChange={(e) => setInfo({post:e.target.value})}>                     
                    </textarea>
                    <div className='aftertextarea'>                 
                    {
                        info.hasSubmitted ?
                        <CircularProgress />
                        :
                        <button type="submit">Post</button>
                    }
                    <FileUploader
                    onFileSelectSuccess={(fileupload) => setInfo({file: fileupload})}
                    />
                    </div>
                    </form>
                </div>

                <div className = 'posts'>
                    <PostsList />
                </div>

            </div>
        </div>
    )
}

export default Home