const path = require('path')
const { app, ipcMain } = require('electron')

// our constructors
const Window = require('./js/Window')
const DataStore = require('./js/DataStore')

// create a new todo store named 'Todos Main'
const todosData = new DataStore({ name: 'Todos Main' })

const main = () => {
    // todo list window
    const mainWindow = new Window({
        file: path.join('renderer', 'index.html')
    })

    // add todo window (initially does not exist)
    let addTodoWindow

    // TODO: put these events into their own file

    // initialize with todos
    mainWindow.once('show', () => {
        mainWindow.webContents.send('todos', todosData.todos)
    })

    // create add todo window
    ipcMain.on('add-todo-window', () => {
        // if addTodoWindow does not already exist
        if (!addTodoWindow) {
            // create a new addTodoWindow
            addTodoWindow = new Window({
                file: path.join('renderer', 'add-todos', 'add.html'),
                width: 400,
                height: 400,
                // close with the main parent window
                parent: mainWindow
            })

            // cleanup
            addTodoWindow.on('closed', () => {
                addTodoWindow = null
            })
        }
    })

    // add-todo from addTodoWindow
    ipcMain.on('add-todo', (event, todo) => {
        const updatedTodos = todosData.addTodo(todo).todos

        mainWindow.send('todos', updatedTodos)
    })

    // delete-todo from todo list window
    ipcMain.on('delete-todo', (event, todo) => {
        const updatedTodos = todosData.deleteTodo(todo).todos

        mainWindow.send('todos', updatedTodos)
    })
}

app.on('ready', main)

app.on('window-all-closed', () => {
    app.quit()
})
