const routes = {
    '': 'Главная',
    '#users': 'Пользователи',
    '#users/todos': 'Todos',
    '#users/posts': 'Посты',
};

// Функция для реакции на изменение адресной строки (хэша)
function onAddressChange(callback) {
    window.addEventListener('hashchange', () => {
        callback(window.location.hash);
    });
}

// Функция для изменения адресной строки (хэша)
function changeAddress(newHash) {
    if (newHash.startsWith('#')) {
        window.location.hash = newHash;
    } else {
        window.location.hash = '#' + newHash;
    }
}
