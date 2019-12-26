// This file is required by the index.html file and will
// be executed in the renderer process for that window.

const { ipcRenderer } = require('electron')

// delete todo by its text value (used below in event listener)
const deleteTodo = e => {
    ipcRenderer.send('delete-todo', e.target.textContent)
}

// open Add Todo Window button
document.getElementById('createTodoBtn').addEventListener('click', () => {
    ipcRenderer.send('add-todo-window')
})

// on receive tools
ipcRenderer.on('todos', (event, todos) => {
    // get the todoList ul
    const todoList = document.getElementById('todoList')

    // create html string
    const todoItems = todos.reduce((html, todo) => {
        html += `
                    <div class="todo-item-div px-2">
                        <li class="todo-item">${todo}</li>
                    </div>
                `

        return html
    }, '')

    // set list html to the todo items
    todoList.innerHTML = todoItems

    // get all the todo list items
    const todoItemElements = todoList.querySelectorAll('.todo-item')

    // add click handlers to delete the clicked todo
    for (let i = 0; i < todoItemElements.length; i++) {
        const todoListElement = todoItemElements[i]

        todoListElement.addEventListener('click', deleteTodo)
    }
})
