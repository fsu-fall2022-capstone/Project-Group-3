import Axios from "axios"
import { fetch_url } from ".."

export async function get_index(){
    const response = await Axios.get(`${fetch_url}/index`)
    return response
}