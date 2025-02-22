const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');
const { spawn } = require("child_process");

let mainWindow;
let backendProcess;

function createWindow() {

    const backendPath = app.isPackaged
        ? path.join(process.resourcesPath, "app", "jars", "backend-1.1.0.jar") // Packaged path
        : path.join(__dirname, "jars", "backend-1.1.0.jar"); // Development path

    backendProcess = spawn("java", ["-jar", backendPath], {
        detached: true,
        stdio: "ignore",
        windowsHide: true, // Prevents opening a terminal window
    });

    backendProcess.unref();

    mainWindow = new BrowserWindow({
        width: 1200,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false, // if you are using a contextBridge, set this to true
            webSecurity: false // Disable security restrictions (for debugging only)
        },
    });

    mainWindow.loadURL(
        url.format({
            pathname: path.join(__dirname, 'dist/frontend/index.html'),
            protocol: 'file:',
            slashes: true,
        })
    );

    mainWindow.on('closed', function () {
        mainWindow = null;
    });

    process.env.API_URL = 'http://localhost:8080/api';
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
    if (backendProcess) {
        backendProcess.kill();
    }
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', function () {
    if (mainWindow === null) {
        createWindow();
    }
});