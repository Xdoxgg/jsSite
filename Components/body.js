async function generateBody(parentElement) {
    // левая панель
    HtmlGenerator.createTag(parentElement, 'div', 'leftPanel');
    HtmlGenerator.setAttribute('leftPanel', ['class'], ['left-panel']);
    HtmlGenerator.createTag(document.getElementById('leftPanel'), 'input', 'filterInput');
    HtmlGenerator.setAttribute('filterInput', ['type', 'class', 'placeholder'], ['text', 'filter-input', 'Фильтр пользователей']);
    HtmlGenerator.createTag(document.getElementById('leftPanel'), 'ul', 'userList');
    HtmlGenerator.setAttribute('userList', ['class'], ['user-list']);
    HtmlGenerator.createTag(document.getElementById('leftPanel'), 'button', 'toggleBtn');
    HtmlGenerator.setAttribute('toggleBtn', ['class', 'disabled'], ['toggle-btn', '']);
    HtmlGenerator.setContent('toggleBtn', 'Показать посты');
    document.getElementById('toggleBtn').disabled = true;

    // правая панель
    HtmlGenerator.createTag(parentElement, 'div', 'rightPanel');
    HtmlGenerator.setAttribute('rightPanel', ['class'], ['right-panel']);
    HtmlGenerator.createTag(document.getElementById('rightPanel'), 'h2', 'rightTitle');
    HtmlGenerator.setContent('rightTitle', 'Выберите пользователя');
    HtmlGenerator.createTag(document.getElementById('rightPanel'), 'ul', 'itemList');
    HtmlGenerator.setAttribute('itemList', ['class'], ['item-list']);

    // Получаем пользователей и заполняем список
    try {
        const users = await getUser();
        users.forEach(user => {
            const liId = 'user-' + user.id;
            HtmlGenerator.createTag(document.getElementById('userList'), 'li', liId);

            const userInfo =
                `Имя: ${user.name}
Username: ${user.username}
Email: ${user.email}
Телефон: ${user.phone}`;

            HtmlGenerator.setContent(liId, userInfo);
            HtmlGenerator.setAttribute(liId, ['data-user-id'], [user.id]);
        });
    } catch (error) {
        console.error('Ошибка при загрузке пользователей:', error);
    }
}
