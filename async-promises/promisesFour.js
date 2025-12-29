import { apiKey } from './keys.js';  

function getUser(id) {
    const key = apiKey;
    return fetch(`https://reqres.in/api/users/${id}`, {
            headers: { Authorization: `Bearer ${key}` }
        })
        .then((result) => {
            if (!result.ok) {
                throw new Error(`HTTP error!: ${result.status}`);
            }
            return result.json();
        })
        .then((data) => {
            return { success: true, data: data.data };
        })
        .catch((error) => {
            return { success: false, error: error.message };
        });
}

const button = document.getElementById('button')
const info = document.getElementById('users-info')

button.addEventListener('click', ()=>{
    const userId = document.getElementById('input').value;

    getUser(userId).then((userData) => {
        console.log(userData)
        
        if(userData.success === false){
            info.innerHTML = `Error: user not found`
        }else{
            const user = userData.data;
            info.innerText = `name: ${user.first_name}, lastname: ${user.last_name}, email: ${user.email}`;
        }
    });
})