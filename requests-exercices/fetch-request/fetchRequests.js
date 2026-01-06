

const getElement = async () => {
    const result = await fetch(`https://api.restful-api.dev/objects`);
    return result.json()
}

const filterElements = (allElements) => {
    const result = allElements.filter((element) => element.data != null);
    return result;
}

const button = document.getElementById('button')
const info = document.getElementById('users-info')

button.addEventListener('click', async ()=>{
    const data = await getElement();
    console.log(data);
    const filteredElements = filterElements(data);
    console.log(filterElements);
    info.innerText = JSON.stringify(filteredElements, null, 4);
})