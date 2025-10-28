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
let selectedUserId = null;
    let showingTodos = true;
    let currentPosts = []; 

async function loadAndRenderTodos(userId) {
    try {
        const todos = await getTodoByUserId(userId);
        renderItems(todos, 'TODO список');
        clearComments();
    } catch (e) {
        console.error('Ошибка загрузки TODO:', e);
    }
}


    async function loadAndRenderPosts(userId) {
        try {
            const posts = await getAllPostsWithComments();
            currentPosts = posts.filter(post => post.userId == userId);
            renderPosts(currentPosts);
            clearComments();
        } catch (e) {
            console.error('Ошибка загрузки постов:', e);
        }
    }

    function renderItems(items, titlePrefix) {
        const itemList = document.getElementById('itemList');
        const rightTitle = document.getElementById('rightTitle');

        rightTitle.textContent = selectedUserId ? `${titlePrefix} пользователя ${selectedUserId}` : 'Выберите пользователя';

        itemList.innerHTML = '';
        if (!items || items.length === 0) {
            itemList.innerHTML = '<li>Список пуст</li>';
            return;
        }
        items.forEach(text => {
            const li = document.createElement('li');
            li.textContent = text;
            itemList.appendChild(li);
        });
    }

    function renderPosts(posts) {
        const itemList = document.getElementById('itemList');
        const rightTitle = document.getElementById('rightTitle');

        rightTitle.textContent = selectedUserId ? `Посты пользователя ${selectedUserId}` : 'Выберите пользователя';

        itemList.innerHTML = '';
        if (!posts || posts.length === 0) {
            itemList.innerHTML = '<li>Список пуст</li>';
            return;
        }

        posts.forEach(post => {
            const li = document.createElement('li');
            li.textContent = `${post.title} (комментариев: ${post.comments.length})`;
            li.style.cursor = 'pointer';
            li.dataset.postId = post.id;
            li.addEventListener('click', () => showComments(post.id));
            itemList.appendChild(li);
        });
    }

    function showComments(postId) {
        const post = currentPosts.find(p => p.id === postId);
        const rightPanel = document.getElementById('rightPanel');

        let commentsDiv = document.getElementById('commentsDiv');
        if (commentsDiv) {
            commentsDiv.remove();
        }

        commentsDiv = document.createElement('div');
        commentsDiv.id = 'commentsDiv';
        commentsDiv.style.marginTop = '10px';
        commentsDiv.style.padding = '10px';
        commentsDiv.style.borderTop = '1px solid #ccc';

        const title = document.createElement('h3');
        title.textContent = `Комментарии к посту: "${post.title}"`;
        commentsDiv.appendChild(title);

        if (post.comments.length === 0) {
            const p = document.createElement('p');
            p.textContent = 'Комментариев нет';
            commentsDiv.appendChild(p);
        } else {
            const ul = document.createElement('ul');
            ul.style.listStyle = 'none';
            ul.style.padding = '0';
            post.comments.forEach(comment => {
                const li = document.createElement('li');
                li.style.borderBottom = '1px solid #eee';
                li.style.marginBottom = '5px';
                li.style.paddingBottom = '5px';
                li.innerHTML = `<strong>${comment.name} (${comment.email}):</strong><br>${comment.body}`;
                ul.appendChild(li);
            });
            commentsDiv.appendChild(ul);
        }

        rightPanel.appendChild(commentsDiv);
    }

    function clearComments() {
        const commentsDiv = document.getElementById('commentsDiv');
        if (commentsDiv) commentsDiv.remove();
    }

    function onUserClick(event) {
        const li = event.target;
        if (!li || !li.dataset.userId) return;

        const prevSelected = document.querySelector('#userList li.selected');
        if (prevSelected) prevSelected.classList.remove('selected');

        li.classList.add('selected');

        selectedUserId = li.dataset.userId;
        showingTodos = true;

        const toggleBtn = document.getElementById('toggleBtn');
        toggleBtn.disabled = false;
        toggleBtn.textContent = 'Показать посты';

        loadAndRenderTodos(selectedUserId);
        
    }

    const userList = document.getElementById('userList');
    userList.addEventListener('click', onUserClick);

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

            const userInfo =
                `Имя: ${user.name} \n
Username: ${user.username}\n
Email: ${user.email}\n
Телефон: ${user.phone}`;

            HtmlGenerator.setContent(liId, userInfo);
            HtmlGenerator.setAttribute(liId, ['data-user-id'], [user.id]);
        });
    } catch (error) {
        console.error('Ошибка при загрузке пользователей:', error);
    }
}
