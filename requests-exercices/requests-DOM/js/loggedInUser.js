    
async function setInfo(usersInfo) {
    const info = localStorage.getItem("data")
    usersInfo.innerHTML = info

}

const usersInfo = document.getElementById("users-info")
setInfo(usersInfo);

const idButton = document.getElementById('id');
idButton.addEventListener("click", () => {
    const data = JSON.parse(localStorage.getItem("data"))
    console.log(data)
    window.alert(`Your ID is: ${data.id}`)
})