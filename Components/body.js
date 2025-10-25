function generateBody(parentElement) {
    //левая панель, Мишаня тут будут юзеры, атрибуты нужно будет доделать
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

    //правая панель
    HtmlGenerator.createTag(parentElement, 'div', 'rightPanel');
    HtmlGenerator.setAttribute('rightPanel', ['class'], ['right-panel']);
    HtmlGenerator.createTag(document.getElementById('rightPanel'), 'h2', 'rightTitle');
    HtmlGenerator.setContent('rightTitle', 'Выберите пользователя');

    // тут в ul будут либо todo либо посты 
    HtmlGenerator.createTag(document.getElementById('rightPanel'), 'ul', 'itemList');
    HtmlGenerator.setAttribute('itemList', ['class'], ['item-list']);
}


