import { getUser } from './module.js';  

button.addEventListener('click', async () => {
    const info = document.getElementById('users-info')
    const userId = document.getElementById('input').value
    const userData = await getUser(userId);
    
    if(userData.success === false) {
        info.innerHTML = `Error: ${userData.error}`;
    } else {
        const user = userData.data
        info.innerText = `name: ${user.first_name}, lastname: ${user.last_name}, email: ${user.email}`;
    }
  }
)