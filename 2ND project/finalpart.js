const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

let todos = JSON.parse(localStorage.getItem('todos')) || [];

function renderTodos() {
    todoList.innerHTML = '';
    todos.forEach((todo, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="${todo.done ? 'done' : ''}">${todo.text}</span>
            <div class="task-buttons">
                <button onclick="toggleDone(${index})"><i class="fas fa-check"></i></button>
                <button onclick="deleteTodo(${index})"><i class="fas fa-trash"></i></button>
            </div>
        `;
        todoList.appendChild(li);
    });
    saveTodos();
    updateProgress();
}

function addTodo(text) {
    todos.push({ text, done: false });
    renderTodos();
}

function toggleDone(index) {
    todos[index].done = !todos[index].done;
    renderTodos();
}

function deleteTodo(index) {
    todos.splice(index, 1);
    renderTodos();
}

function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function updateProgress() {
    const total = todos.length;
    const completed = todos.filter(todo => todo.done).length;
    const progressPercentage = total === 0 ? 0 : Math.round((completed / total) * 100);
    
    const progressElement = document.querySelector('.progress');
    if (!progressElement) {
        const progressBar = `
            <div class="progress">
                <div class="progress-bar" style="width: ${progressPercentage}%"></div>
                <span>${progressPercentage}% Complete</span>
            </div>
        `;
        todoList.insertAdjacentHTML('beforebegin', progressBar);
    } else {
        const progressBar = progressElement.querySelector('.progress-bar');
        const progressText = progressElement.querySelector('span');
        progressBar.style.width = `${progressPercentage}%`;
        progressText.textContent = `${progressPercentage}% Complete`;
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (text) {
        addTodo(text);
        input.value = '';
    }
});

renderTodos();