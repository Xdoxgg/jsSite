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

