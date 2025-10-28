async function getTodoByUserId(id) {
    let response = await fetch("https://jsonplaceholder.typicode.com/todos");
    const data = await response.json();
    let result = [];
    data.forEach(e => {
        if (e.userId == id) {
            result.push(e)
        }
    })
    return result;
}


async function getAllTodos() {
    let response = await fetch("https://jsonplaceholder.typicode.com/todos ");
    return await response.json();
}

