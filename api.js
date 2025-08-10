import axios from "axios"
const URL = 'http://localhost:3000'

//user url
export async function getUsers(){
    //http://localhost:3000/user/idnumber
    const response = await axios.post(`${URL}/users`)

    if(response.status ===200){
        return response.data
    }else{
        return
    }
}


export async function getUser(id){
    //http://localhost:3000/user/idnumber
    const response = await axios.post(`${URL}/users/${id}`)

    if(response.status ===200){
        return response.data
    }else{
        return
    }
}
