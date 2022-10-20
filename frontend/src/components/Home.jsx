import React from 'react'
import "../styles/home.css";

function Home(){
    return(
        <div className="home">
            <div className = "card"> 
                <div className = 'tweet'>
                    <form>
                    <textarea className='text-tweet' placeholder='Share something...'> 
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