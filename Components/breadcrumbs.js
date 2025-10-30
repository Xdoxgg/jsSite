
async function onAddressChange() {
    window.addEventListener('hashchange', () => {
        let str = window.location.hash;
        let userNumberMatch = str.match(/#user(\d+)#/);
        let userNumber = userNumberMatch ? userNumberMatch[1] : null;
        let newStr = str.replace(/#user\d+#/, '');
        switch (newStr) {
            case '#todos':
                callbackUsersTodos(userNumber)
                
                break;
            case '#posts':
                
                callbackUsersPosts(userNumber)
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
    alert(userId);
    await loadAndRenderTodos(userId)
}

async function callbackUsersPosts(userId) {
    alert(userId);
    await loadAndRenderPosts(userId)
}

