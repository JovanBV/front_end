import { apiKey } from './keys.js';  

async function getUser(id) {
    console.log("Loading");
    const key = apiKey;
    try{
    const response = await fetch(`https://reqres.in/api/users/${id}`,
            {
                headers: { Authorization: `Bearer ${key}` }
            }
        )
    if(!response.ok){
        throw new Error("User not found.")
    }
        console.log("Data loaded!");
        
        return response.json()
    }catch (error){
        return { success: false, error: error.message };
    }
    }

export { getUser }