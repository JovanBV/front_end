const switchToUser = () => {
    window.location.href = 'my-user.html'
}

const verifyIfOpenSession = () => {
    const session = JSON.parse(localStorage.getItem("data"))
    if (session) {
        console.log("Session: ", session);
        return session;
    }
}

async function postLogin(email, password, id) {
    try {
        console.log("ID from postLogin: ", id)
        const response = await fetch(`https://api.restful-api.dev/objects/${id}`)
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        console.log("Requested data (postLogin): ", data)

        if (data.data && (data.data.password !== password || data.data.email !== email)) {
            window.alert("Invalid credentials.")
            throw new Error("Invalid credentials.")
        }
        
        return data
        
    } catch (error) {
        console.log('Error: ', error.message)
        throw error
    }
}

async function logInUser() {
    try {
        const email = document.getElementById('email').value
        console.log("email: ", email)

        const password = document.getElementById('password').value
        console.log("password: ", password)

        const id = localStorage.getItem("id")
        console.log("id: ", id)

        const result = await postLogin(email, password, id)
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

const form = document.querySelector('.log_in_form')
form.addEventListener('submit', async (event) => {
    event.preventDefault()
    
    try {
        const data = await logInUser()
        
        await saveUserToLocalStorage(data)
        switchToUser()
        
    } catch (error) {
        console.error('Login error:', error.message)
        window.alert(`Error: ${error.message}`)
    }
})

const clearLs = document.getElementById('clear-local-storage')
clearLs.addEventListener('click', () => {
    console.log(localStorage.getItem('data'))
    localStorage.clear()
})