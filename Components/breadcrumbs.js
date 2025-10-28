const routes = {
    '#users': 'Пользователи',
    '#users/todos': 'Todos',
    '#users/posts': 'Посты',
};

function updateBreadcrumbs(path) {
    const breadcrumbsContainer = document.getElementById('breadcrumbs');

    // Разбиваем путь на части по "/"
    const parts = path.split('/').filter(Boolean);

    let accumulatedPath = '';
    const crumbs = [];

    // Добавляем "Главная" в начало
    crumbs.push(`<a href="#" data-route="">Главная</a>`);

    parts.forEach((part, index) => {
        accumulatedPath += (index === 0 ? '#' : '/') + part;
        const name = routes[accumulatedPath] || part;
        crumbs.push(`<a href="#" data-route="${accumulatedPath}">${name}</a>`);
    });

    breadcrumbsContainer.innerHTML = crumbs.join(' &gt; ');
}