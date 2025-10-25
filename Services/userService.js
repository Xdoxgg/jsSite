

async function getUser(){
    let response = await fetch("https://jsonplaceholder.typicode.com/users");
    return await response.json();
}

