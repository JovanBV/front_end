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
        const response = await fetch(`https://api.restful-api.dev/objects`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return await response.json();
    } catch(error) {
        console.log('Error: ', error.message)
        throw error;
    }
}

async function registerUser() {
    try {
        const name = document.getElementById('full_name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const address = document.getElementById('address').value;

        const requestBody = createBody(email, password, name, address);
        
        const result = await postProduct(requestBody);
        return result;
        
    } catch (error) {
        throw error;
    }
}

const saveUserToLocalStorage = (data) => {
    try {
        localStorage.setItem("id", data.id)
        
        localStorage.setItem("data", JSON.stringify(data))
        
        console.log("Saving to local storage ID: ", localStorage.getItem("id"))
        console.log("Saving to local storage data: ", localStorage.getItem("data"))
        return true;
    } catch (error) {
        console.log("Error saving to local storage: ", error)
        throw error;
    }
};

const switchToUser = () => {
    window.location.href = 'my-user.html'
}

const form = document.querySelector('.sign_up_form');
form.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    try {
        const data = await registerUser();
        console.log("Registration successful:", data)
        saveUserToLocalStorage(data)
        switchToUser()
        
    } catch (error) {
        console.error('Registration error:', error.message);
        window.alert(`Error: ${error.message}`);
    }
});