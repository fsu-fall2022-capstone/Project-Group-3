import React from 'react'
import "../styles/home.css";
import useHome from './useHome';

function Home(){
    const {info, setInfo, submit} = useHome()

    return(
        <div className="home">
            <div className = "card"> 
                <div className = 'tweet'>
                    <form className = "post-form" onSubmit={submit}>
                    <textarea className='text-tweet' placeholder='Share something...' onChange={(e) => setInfo({post:e.target.value})}> 
                    </textarea>
                    <button type="submit">Post</button>
                    </form>
                </div>

                <div className = 'posts'>
                    
                </div>

            </div>
        </div>
    )
}

export default Home