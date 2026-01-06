function createBody(email, password, name, address){
    return {
        name: name,
        data: {
            email: email,
            password: password,
            address: address
        }
    }
}

async function postProduct(body) {
    try{
        const response =  await fetch(`https://api.restful-api.dev/objects`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
        });
        return await response.json();
    }catch(error){
        console.log('Error: ', error.message)
        throw error;
    }
}

async function main() {
    try {
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const address = document.getElementById('address').value;

        const requestBody = createBody(email, password, name, address);
        
        const result = await postProduct(requestBody);
        return result;
        
    } catch (error) {
        return { error: error.message };
    }
}

const button = document.getElementById('button');
button.addEventListener('click', async () => {
    const info = document.getElementById('users-info');
    
    try {
        info.innerHTML = 'Cargando...';
        
        const data = await main();
        
        if (data.error) {
            info.innerHTML = `Error: ${data.error}`;
        }else{
            info.innerHTML = JSON.stringify(data);
        }
        
    } catch (error) {
        info.innerHTML = `Error: ${error.message}`;
    }
});

async function getUser(id) {
  const response = await fetch(`https://api.restful-api.dev/objects/${id}`);
  
  if(!response.ok){
    return {success: false, error: "User not found."}
  }
  
  const data = await response.json();
  return data;
}


const searchButton = document.getElementById('search-button')
searchButton.addEventListener('click', async () => {
    const info = document.getElementById('users-info');
    const searchId = document.getElementById('search-id').value;

    try {
        info.innerHTML = 'Cargando...';
        
        const data = await getUser(searchId);

        if(data.error){
            throw Error("User not found.")
        }

        info.innerHTML = JSON.stringify(data, null, 2);
        
    } catch (error) {
        if (error.message.includes('404')) {
            info.innerHTML = `Error: User not found`;
        } else {
            info.innerHTML = `Error: ${error.message}`;
        }
    }
})

async function updateAddress(id, newAddress) {
  const getResponse = await fetch(`https://api.restful-api.dev/objects/${id}`);
  const currentData = await getResponse.json();

    const updatedData = {
    id: currentData.id,
    name: currentData.name,
    data: {
        email: currentData.data.email,
        password: currentData.data.password,
        address: newAddress
    }
    };

    const response = await fetch(`https://api.restful-api.dev/objects/${id}`, {
        method: 'PUT',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedData)
    });

    if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
    }

    return await response.json();
    }


const updateButton = document.getElementById('update-button');
updateButton.addEventListener('click', async () => {
    const info = document.getElementById('users-info');
    const userId = document.getElementById('search-id').value;
    const userAddress = document.getElementById('new-address').value;

    try {
        info.innerHTML = 'Updating...';
        
        const data = await updateAddress(userId, userAddress);

        if(data.error){
            throw Error("User not found.")
        }

        info.innerHTML = JSON.stringify(data, null, 2);
        
    } catch (error) {
        if (error.message.includes('404')) {
            info.innerHTML = `Error: User not found`;
        } else {
            info.innerHTML = `Error: ${error.message}`;
        }
    }
})