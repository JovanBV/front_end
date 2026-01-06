const switchToUser = () => {
    window.location.href = 'my-user.html'
}

async function updatePassword(id, newPassword) {
  const getResponse = await fetch(`https://api.restful-api.dev/objects/${id}`);
  const currentData = await getResponse.json();

    const updatedData = {
    id: currentData.id,
    name: currentData.name,
    data: {
        email: currentData.data.email,
        password: newPassword,
        address: currentData.data.address
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


async function changePassword(email, password, newPassword, passwordConfirmation, id) {
    try {
        console.log("ID from changePassword: ", id)
        const response = await fetch(`https://api.restful-api.dev/objects/${id}`)
        

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        if(newPassword !== passwordConfirmation){
            throw new Error(`New password does not match the confirmation.`)
        }

        const data = await response.json()
        console.log("Requested data (changePassword): ", data)

        if (data.data && (data.data.password !== password || data.data.email !== email)) {
            window.alert("Invalid credentials.")
            throw new Error("Invalid credentials.")
        }

        const updatedDataPassword = await updatePassword(id, newPassword);
        
        return updatedDataPassword;
        
    } catch (error) {
        console.log('Error: ', error.message)
        throw error
    }
}


async function main() {
    try {
        const email = document.getElementById('email').value;
        console.log("email: ", email)

        const password = document.getElementById('password').value;
        console.log("password: ", password)

        const newPassword = document.getElementById('new-password').value;
        console.log("new password: ", newPassword);

        const passwordConfirmation = document.getElementById('password-confirmation').value;
        console.log("password confirmation: ", passwordConfirmation);

        const id = localStorage.getItem("id")
        console.log("id: ", id)

        const result = await changePassword(email, password, newPassword, passwordConfirmation, id)
        console.log("result: ", result)
        return result
        
    } catch (error) {
        throw error
    }
}

async function saveUserToLocalStorage(data) {
    try {
        localStorage.setItem("data", JSON.stringify(data))
        console.log("Saving to local storage: ", localStorage.getItem("data"))
        return true
    } catch (error) {
        console.log("Error saving to local storage: ", error)
        throw error
    }
}

const form = document.querySelector('.change_password_form')
form.addEventListener('submit', async (event) => {
    event.preventDefault()
    
    try {
        const data = await main()
        
        await saveUserToLocalStorage(data)
        switchToUser()
        
    } catch (error) {
        console.error('Error changing password:', error.message)
        window.alert(`Error: ${error.message}`)
    }
});