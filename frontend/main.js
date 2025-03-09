const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');
const { spawn } = require("child_process");
const log = require('electron-log'); // Import electron-log

// Configure electron-log
log.transports.file.level = 'info'; // Set the minimum log level for the file
log.transports.file.format = '{h}:{i}:{s}:{ms} {text}'; // Customize log format (optional)
const logFilePath = path.join(app.getPath('desktop'), 'electron-app-log.txt'); // Log to Desktop
log.transports.file.resolvePathFn = () => logFilePath;

let mainWindow;
let backendProcess;
let developerMode = false //change to true if you want to debug backend

function createWindow() {

    if (!developerMode) {
        const backendPath = app.isPackaged
            ? path.join(process.resourcesPath, "app", "jars", "backend-1.1.0.jar")
            : path.join(__dirname, "jars", "backend-1.1.0.jar");

        log.info(`Starting backend from: ${backendPath}`); // Use electron-log for logging

        backendProcess = spawn("java", ["-jar", backendPath], {
            detached: false,
            stdio: ['pipe', 'pipe', 'pipe'], // Captures stdout, stderr
        });

        backendProcess.stdout.on('data', (data) => {
            log.info(`Backend stdout: ${data}`); // Log stdout
        });

        backendProcess.stderr.on('data', (data) => {
            log.error(`Backend stderr: ${data}`); // Log stderr as errors
        });

        backendProcess.on('error', (err) => {
            log.error('Error spawning backend:', err); // Log spawning errors
        });


        backendProcess.unref();
    }

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

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});


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
        log.info("Attempting to kill backend process");
        if (process.platform === 'win32') {
            const taskkillProcess = spawn("taskkill", ["/pid", backendProcess.pid, '/f', '/t']);
            taskkillProcess.on('error', (err) => {
                log.error('Error killing backend process with taskkill:', err);
            });
            taskkillProcess.on('close', (code) => {
                log.info(`taskkill process exited with code ${code}`);
                backendProcess = null; // Clear the backendProcess reference
            });

        } else {
            backendProcess.kill('SIGTERM');
        }

        setTimeout(() => {
            if (backendProcess && !backendProcess.killed) {
                log.warn("Backend process still running after SIGTERM, attempting SIGKILL");
                if (process.platform !== 'win32'){
                    backendProcess.kill('SIGKILL');
                }
                backendProcess = null;
            }
        }, 5000);
    }
}