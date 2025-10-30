async function getUser(userId = null) {
    let response = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await response.json();
    if (userId !== null) {
        for (let i =0; i<data.length; i++) {
            if (data[i].id == userId) {
                return data[i];
            }
        }
    } else {
        return data;
    }
}


