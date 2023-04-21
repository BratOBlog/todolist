const wrapper = document.querySelector('[data-todoapp]');
const newItemInput = document.querySelector('[data-new-todo]');

const savedTodos = localStorage.getItem('todos');
const todos = JSON.parse(savedTodos) || [];

const saveTodos = () => {
    localStorage.setItem('todos', JSON.stringify(todos));
}

const createNewTodoItem = (name) => {
    return ({
        id: Date.now(),
        name: name,
        completed: false
    });
}

newItemInput.addEventListener('keyup', (event) => {
    if (event.keyCode === 13 && event.target.value) {
        const newItem = createNewTodoItem(event.target.value);
        todos.unshift(newItem);
        event.target.value = '';
        saveTodos();
        render();
    }
});

const updateTodoItem = (id, isCompleted) => {
    todos.map(todo => {
        if (todo.id === id) {
            todo.completed = isCompleted;
        }
        return todo;
    });
    saveTodos();
}

const createListItem = (item) => {
    const li = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    if (item.completed) {
        checkbox.setAttribute('checked', true);
        li.classList.add('completed')
    }
    li.textContent = item.name;
    li.prepend(checkbox);

    checkbox.addEventListener('change', (event) => {
        updateTodoItem(item.id, event.target.checked);
        render();
    });

    return li;
};

const render = () => {
    const ul = document.createElement('ul');

    todos.map(todo => {
        const item = createListItem(todo);
        ul.appendChild(item); 
    });

    wrapper.innerHTML = '';
    wrapper.appendChild(ul);
}

render();
