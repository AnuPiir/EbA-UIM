const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');
const { spawn } = require("child_process");
const fs = require('fs');
const log = require('electron-log'); // Import electron-log

const logDir = path.join(app.getPath('documents'), 'ebam');
const logFilePath = path.join(logDir, 'electron-app-log.txt');

// Ensure the directory exists
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
}

// Configure electron-log
log.transports.file.level = 'info'; // Set minimum log level
log.transports.file.format = '{h}:{i}:{s}:{ms} {text}'; // Custom log format
log.transports.file.resolvePathFn = () => logFilePath; // Set log file path

// Example log
log.info('Electron log initialized and writing to:', logFilePath);

let mainWindow;
let backendProcess;
let developerMode = true //change to true if you want to debug backend

function createWindow() {

    if (!developerMode) {
        const backendPath = app.isPackaged
            ? path.join(process.resourcesPath, "app", "jars", "backend-1.2.0.jar")
            : path.join(__dirname, "jars", "backend-1.2.0.jar");

        log.info(`Starting backend from: ${backendPath}`);

        backendProcess = spawn("java", ["-jar", backendPath], {
            detached: false,
            stdio: ['pipe', 'pipe', 'pipe'],
        });

        backendProcess.stdout.on('data', (data) => {
            log.info(`Backend stdout: ${data}`);
        });

        backendProcess.stderr.on('data', (data) => {
            log.error(`Backend stderr: ${data}`);
        });

        backendProcess.on('error', (err) => {
            log.error('Error spawning backend:', err);
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