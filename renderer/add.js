const { ipcRenderer } = require('electron')

// listen for the form to be submitted
document.getElementById('todoForm').addEventListener('submit', (e) => {
    // prevent default refresh functionality of forms
    e.preventDefault()

    // get form input
    const input = e.target[0]

    // send todo to main process
    ipcRenderer.send('add-todo', input.value)

    // reset input
    input.value = ''
})
