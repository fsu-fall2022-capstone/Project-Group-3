import React from 'react'
import "../styles/home.css";
import useHome from './useHome';
import Alert from '@mui/material/Alert';
import { CircularProgress } from '@mui/material';
import PostsList from './PostsList';

function Home(){
    const {info, setInfo, submit} = useHome()

    return(
        <div className="home">
            { info.hasError ? <Alert severity="error">Error posting. Try again.</Alert> : <></>}
            <div className = "card"> 
                <div className = 'tweet'>
                    <form className = "post-form" onSubmit={submit}>
                    <textarea className='text-tweet' placeholder='Share something...' value = {info.post} onChange={(e) => setInfo({post:e.target.value})}> 
                    </textarea>
                    {
                        info.hasSubmitted ?
                        <CircularProgress />
                        :
                        <button type="submit">Post</button>
                    }
                    
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