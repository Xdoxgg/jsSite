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
