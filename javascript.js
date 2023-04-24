/*Wrapper egy placeholder a HTML dokumentumban, ahová a user majd a beírt taskokat listázza, a newItemInput pedig az input field, ahová berhatja a task tárgyat
a querySelector pedig a betöltéskor megvizsgálja, hogy ezek a HTML dokumentumban megvannak-e.
*/
const wrapper = document.querySelector('[data-todoapp]');

const newItemInput = document.querySelector('[data-new-todo]');

/*Local storage működik adatbázis helyett, ahová a felsorolt taskokat lehet menteni és a mentés megmarad.
 Gondolom a gép kikapcsolásáig (mert új filet, nem hoz létre vagy tempet igen?) 
 A todos elsőnek az elmentett taskokat átkonvertálja obejctté a JSONból a saveTodos pont fordítva stringgé alaktva tárolja.

 Kérdés:

 JSON.parse(savedTodos) || []; - ennél a sornál miért kell a vagy üres array?
*/
const savedTodos = localStorage.getItem('todos');
const todos = JSON.parse(savedTodos) || [];

const saveTodos = () => {
    localStorage.setItem('todos', JSON.stringify(todos));
}

//Létrehozza az új taskot objektumként, ahol a unique ID a timestamp, lesz neve, ami a task lerása és alapból nem completed.
const createNewTodoItem = (name) => {
    return ({
        id: Date.now(),
        name: name,
        completed: false
    });
}

/*
Enter leütésére elmenti a megadott taskot a savedTodosba.

Kérdés: event.target.value mit határoz meg mint paraméter és miért üres?

*/
newItemInput.addEventListener('keyup', (event) => {
    if (event.keyCode === 13 && event.target.value) {
        const newItem = createNewTodoItem(event.target.value);
        todos.unshift(newItem);
        event.target.value = '';
        saveTodos();
        render();
    }
});

/*Frissíti a taskot, azaz kipipálja a checkboxot meg a css miatt áthúzza a taskot.
A map alapján végigmegy az összes taskon, ahol az ID egyezik azt kipipálja.
*/
const updateTodoItem = (id, isCompleted) => {
    todos.map(todo => {
        if (todo.id === id) {
            todo.completed = isCompleted;
        }
        return todo;
    });
    saveTodos();
}

/*
Ez a rész megcsinálja majd a HTML dokumentumben a listát, benne a taskokkal, megvizsálja, hogy készre van-e állítva, akkor bepipálja a checkboxot.
A lista generálásakor a checkbox a tárgy elé kerül.
*/
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


/*
A lista bejefezése, azaz megjelenítése a HTML dokumentumban. Az appendChild mindig a lista elejére helyezi az új taskot.

Kérdés: A wrapper innerHTML az üres helyet azért tartalmazza, mert a HTML fileban is placeholdernek minősülő részbe fogja az adatot beírni?
*/
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
