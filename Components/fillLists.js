async function renderPosts(posts) {
    const itemList = document.getElementById('itemList');
    const rightTitle = document.getElementById('rightTitle');

    let user =await getUser(selectedUserId)
    rightTitle.textContent = selectedUserId ? `Посты пользователя ${user.username}` : 'Выберите пользователя';

    itemList.innerHTML = '';
    if (!posts || posts.length === 0) {
        HtmlGenerator.createTag(itemList, 'li', 'emptyListItem');
        HtmlGenerator.setContent('emptyListItem', 'Список пуст');
        return;
    }

    posts.forEach(post => {
        const liId = `post-li-${post.id}`;
        HtmlGenerator.createTag(itemList, 'li', liId);
        HtmlGenerator.setContent(liId, `${post.title} (комментариев: ${post.comments.length})`);
        HtmlGenerator.setAttribute(liId, ['style', 'data-post-id'], ['cursor:pointer', post.id]);
        HtmlGenerator.setEventListener(liId, 'click', () => showComments(post.id));
    });
}

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
        await renderPosts(currentPosts);
        clearComments();
    } catch (e) {
        console.error('Ошибка загрузки постов:', e);
    }
}

async function renderItems(items, titlePrefix) {
    const itemList = document.getElementById('itemList');
    const rightTitle = document.getElementById('rightTitle');

    let user = await getUser(selectedUserId)
    rightTitle.textContent = selectedUserId ? `${titlePrefix} пользователя ${user.username}` : 'Выберите пользователя';

    itemList.innerHTML = '';
    if (!items || items.length === 0) {
        HtmlGenerator.createTag(itemList, 'li', 'emptyItemsList');
        HtmlGenerator.setContent('emptyItemsList', 'Список пуст');
        return;
    }

    items.forEach((text, index) => {
        const liId = `item-li-${index}`;
        HtmlGenerator.createTag(itemList, 'li', liId);
        HtmlGenerator.setContent(liId, text);
    });
}

function showComments(postId) {
    const post = currentPosts.find(p => p.id === postId);
    const rightPanel = document.getElementById('rightPanel');

    let commentsDiv = document.getElementById('commentsDiv');
    if (commentsDiv) {
        commentsDiv.remove();
    }

    HtmlGenerator.createTag(rightPanel, 'div', 'commentsDiv');
    HtmlGenerator.setAttribute('commentsDiv', ['style'], ['margin-top:10px; padding:10px; border-top:1px solid #ccc;']);

    HtmlGenerator.createTag(document.getElementById('commentsDiv'), 'h3', 'commentsTitle');
    HtmlGenerator.setContent('commentsTitle', `Комментарии к посту: "${post.title}"`);

    if (post.comments.length === 0) {
        HtmlGenerator.createTag(document.getElementById('commentsDiv'), 'p', 'noComments');
        HtmlGenerator.setContent('noComments', 'Комментариев нет');
    } else {
        HtmlGenerator.createTag(document.getElementById('commentsDiv'), 'ul', 'commentsList');
        HtmlGenerator.setAttribute('commentsList', ['style'], ['list-style:none; padding:0;']);

        post.comments.forEach((comment, index) => {
            const liId = `comment-li-${index}`;
            HtmlGenerator.createTag(document.getElementById('commentsList'), 'li', liId);
            HtmlGenerator.setAttribute(liId, ['style'], ['border-bottom:1px solid #eee; margin-bottom:5px; padding-bottom:5px;']);
            HtmlGenerator.setContent(liId, '');


            const liElement = document.getElementById(liId);
            liElement.innerHTML = `<strong>${comment.name} (${comment.email}):</strong><br>${comment.body}`;
        });
    }
}

function clearComments() {
    const commentsDiv = document.getElementById('commentsDiv');
    if (commentsDiv) commentsDiv.remove();
}
