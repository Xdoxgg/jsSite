
async function onAddressChange() {
    window.addEventListener('hashchange', () => {
        alert(window.location.hash)
        
        switch (window.location.hash) {
            case '#todos':
                callbackUsersTodos()
                
               
                break;
            case '#posts':
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

async function callbackUsersTodos(userId) {
    await loadAndRenderTodos(userId)
}

async function callbackUsersPosts(userId) {
    await loadAndRenderPosts(userId)
}

