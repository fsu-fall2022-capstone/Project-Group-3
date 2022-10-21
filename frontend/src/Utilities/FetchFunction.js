import Axios from "axios"
import { fetch_url } from ".."

export async function get_index(){
    const response = await Axios.get(`${fetch_url}/index`)
    return response
}

export async function create_post(body){
    Axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
    Axios.defaults.xsrfCookieName = "csrftoken";
    const response = await Axios.post(`${fetch_url}create_post`, body, {
        headers:{
            'Content-Type': '"application/json"'
        }
    })

    return await response.data
}