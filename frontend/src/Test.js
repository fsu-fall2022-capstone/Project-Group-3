import React, {useState, useEffect} from 'react'
import { get_index } from './Utilities/FetchFunction'


function Test() {
    const [valid, setValid] = useState(false)

    useEffect(() => {
        get_index()
        .then(res => {
            if(res.data === 200){
                setValid(true)
            }
        })

    }, [])

    return(
        <div>
            {
                valid ?
                <h1> This works! </h1>
                :
                <h1> There's an issue bro </h1>
            }

        </div>
    )
}

export default Test