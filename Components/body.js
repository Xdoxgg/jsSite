let selectedUserId = null;
let currentPosts = [];
let showingTodos = true;


async function generateBody(parentElement) {
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

    HtmlGenerator.createTag(parentElement, 'div', 'rightPanel');
    HtmlGenerator.setAttribute('rightPanel', ['class'], ['right-panel']);
    HtmlGenerator.createTag(document.getElementById('rightPanel'), 'h2', 'rightTitle');
    HtmlGenerator.setContent('rightTitle', 'Выберите пользователя');
    HtmlGenerator.createTag(document.getElementById('rightPanel'), 'ul', 'itemList');
    HtmlGenerator.setAttribute('itemList', ['class'], ['item-list']);

    HtmlGenerator.setEventListener('toggleBtn', 'click', () => {
        if (!selectedUserId) return;

        showingTodos = !showingTodos;
        const toggleBtn = document.getElementById('toggleBtn');
        toggleBtn.textContent = showingTodos ? 'Показать посты' : 'Показать TODO';

        if (showingTodos) {
            loadAndRenderTodos(selectedUserId);
        } else {
            loadAndRenderPosts(selectedUserId);
        }
    });

    try {
        const users = await getUser();
users.forEach(user => {
    const liId = 'user-' + user.id;
    HtmlGenerator.createTag(document.getElementById('userList'), 'li', liId);
    HtmlGenerator.setAttribute(liId, ['data-user-id'], [user.id]);

    const liElement = document.getElementById(liId);
    liElement.innerHTML = '';

    const fields = [
        { label: 'Имя', value: user.name },
        { label: 'Username', value: user.username },
        { label: 'Email', value: user.email },
        { label: 'Телефон', value: user.phone }
    ];

    fields.forEach(field => {
        const div = document.createElement('div');
        div.textContent = `${field.label}: ${field.value}`;
        liElement.appendChild(div);
    });

    liElement.addEventListener('click', onUserClick);
});

    } catch (error) {
        console.error('Ошибка при загрузке пользователей:', error);
    }

    const filterInput = document.getElementById('filterInput');
const userList = document.getElementById('userList');

filterInput.addEventListener('input', () => {
    const filterText = filterInput.value.toLowerCase();

    Array.from(userList.children).forEach(li => {
        const text = li.textContent.toLowerCase();
        if (text.includes(filterText)) {
            li.style.display = '';
        } else {
            li.style.display = 'none';
        }
    });

    if (selectedUserId) {
        const selectedLi = document.querySelector(`#userList li[data-user-id="${selectedUserId}"]`);
        if (selectedLi && selectedLi.style.display === 'none') {
            selectedUserId = null;
            document.getElementById('toggleBtn').disabled = true;
            document.getElementById('rightTitle').textContent = 'Выберите пользователя';
            document.getElementById('itemList').innerHTML = '';
        }
    }
});

}
