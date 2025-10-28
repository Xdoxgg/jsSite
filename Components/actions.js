async function onUserClick(event) {
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

    await loadAndRenderTodos(selectedUserId);

}



