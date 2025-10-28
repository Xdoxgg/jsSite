const routes = {
    '#users': 'Пользователи',
    '#users/todos': '',
    '#users/posts': 'Раздел 2',
};

function updateBreadcrumbs() {
    const breadcrumbsContainer = document.getElementById('breadcrumbs');
    const hash = window.location.hash || '';

    // Разбиваем путь на части по "/"
    const parts = hash.split('/').filter(Boolean);

    let path = '';
    const crumbs = [];

    // Добавляем "Главная" всегда в начало
    crumbs.push(`<a href="#">${routes['']}</a>`);

    parts.forEach((part, index) => {
        path += (index === 0 ? '#' : '/') + part;
        const name = routes[path] || part;
        crumbs.push(`<a href="${path}">${name}</a>`);
    });

    // Отобразить хлебные крошки через " > "
    breadcrumbsContainer.innerHTML = crumbs.join(' &gt; ');
}

// Обновлять хлебные крошки при загрузке и при изменении хэша
window.addEventListener('hashchange', updateBreadcrumbs);
window.addEventListener('load', updateBreadcrumbs);