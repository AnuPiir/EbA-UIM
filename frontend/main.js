const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');
const { spawn } = require("child_process");

let mainWindow;
let backendProcess;

function createWindow() {

    const backendPath = app.isPackaged
        ? path.join(process.resourcesPath, "app", "jars", "backend-1.1.0.jar")
        : path.join(__dirname, "jars", "backend-1.1.0.jar");

    backendProcess = spawn("java", ["-jar", backendPath], {
        detached: false,
        stdio: "ignore",
    });

    backendProcess.unref();

    mainWindow = new BrowserWindow({
        width: 1200,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            webSecurity: false
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

app.on('quit', () => {
    if (backendProcess) {
        killBackend()
    }
});

app.on('activate', function () {
    if (mainWindow === null) {
        createWindow();
    }
});

function killBackend() {
    if (backendProcess) {
        if (process.platform === 'win32') {
            spawn("taskkill", ["/pid", backendProcess.pid, '/f', '/t']);
        } else {
            backendProcess.kill('SIGTERM');
        }

        setTimeout(() => {
            if (backendProcess && !backendProcess.killed) {
                if (process.platform !== 'win32'){
                    backendProcess.kill('SIGKILL');
                }
            }
        }, 5000);
    }
}