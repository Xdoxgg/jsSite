
async function onAddressChange() {
    window.addEventListener('hashchange', () => {
        switch (window.location.hash) {
            case '#users/todos':
                alert(window.location.hash)
                
                callbackUsersTodos()
                break;
            case '#users/posts':
                alert(window.location.hash)
                
                callbackUsersPosts()
                break;

        }
    });
}
function changeAddress(newHash) {
    if (newHash.startsWith('#')) {
        window.location.hash = newHash;
    } else {
        window.location.hash = '#' + newHash;
    }
}

async function callbackUsersTodos() {
    await loadAndRenderTodos(1)
}

async function callbackUsersPosts() {
    await loadAndRenderPosts(1)
}

