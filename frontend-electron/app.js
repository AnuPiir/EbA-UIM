const {
    app,
    BrowserWindow
} = require('electron')

let appWindow

function createWindow() {
    appWindow = new BrowserWindow({
        width: 800,
        height: 600
    })

    appWindow.loadFile('dist/frontend/index.html');

    appWindow.on('closed', function () {
        appWindow = null
    })
}

app.whenReady().then(createWindow)
