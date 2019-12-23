const { app } = require('electron')

const Window = require('./Window')

const main = () => {
    const mainWindow = new Window({
        file: 'index.html'
    })
}

app.on('ready', main)

app.on('window-all-closed', () => {
    app.quit()
})
