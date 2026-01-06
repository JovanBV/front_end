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
    try {
        console.log(body)
        const response = await axios.post('https://api.restful-api.dev/objects', body);
        return response;
    } catch (error) {
        return {success: false, error: "Could not register user."};
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
        console.log(result);
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
            info.innerHTML = JSON.stringify(data.data);
        }
        
    } catch (error) {
        info.innerHTML = `Error: ${error.message}`;
    }
});
// ff8081819782e69e019b8ec49d704f12
async function getUser(id) {
  const response = await axios.get(`https://api.restful-api.dev/objects/${id}`);
  console.log(response.data)
  return response.data;
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
// ff8081819782e69e019b8ec49d704f12

async function updateAddress(id, newAddress) {
  const getResponse = await getUser(id)

    const updatedData = {
    id: getResponse.id,
    name: getResponse.name,
    data: {
        email: getResponse.data.email,
        password: getResponse.data.password,
        address: newAddress
    }
    };

    const response = await axios.put(`https://api.restful-api.dev/objects/${id}`, updatedData);
    console.log("Update log: ", response.data)
    return response.data;
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