if (require('electron-squirrel-startup')) return;

const os = require('os');
const { app, BrowserWindow, globalShortcut, Menu} = require('electron');
const path = require('path');
const url = require('url');
const { spawn } = require("child_process");
const fs = require('fs');
const log = require('electron-log');

const logDir = path.join(app.getPath('documents'), 'ebam');
const logFilePath = path.join(logDir, 'electron-app-log.txt');
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
}

log.transports.file.level = 'info';
log.transports.file.format = '{h}:{i}:{s}:{ms} {text}';
log.transports.file.resolvePathFn = () => logFilePath;

log.info('Electron log initialized and writing to:', logFilePath);

let mainWindow;
let backendProcess;
let developerMode = false //change to true if you want to debug backend

function createWindow() {

    if (!developerMode) {
        let backendPath;
        let javaPath;

        if (app.isPackaged) {
            const platform = os.platform();
            const isMac = platform === 'darwin';
            const isWindows = platform === 'win32';

            backendPath = isMac
                ? path.join(process.resourcesPath, 'app', 'jars', 'backend-1.3.0.jar')
                : path.join(process.resourcesPath, 'jars', 'backend-1.3.0.jar');

            javaPath = isMac
                ? path.join(process.resourcesPath, 'app', 'jre', 'temurin-21.jre', 'Contents', 'Home', 'bin', 'java')
                : isWindows
                    ? path.join(process.resourcesPath, 'jre', 'jdk-21.0.7+6-jre', 'bin', 'java.exe')
                    : path.join(process.resourcesPath, 'jre', 'jdk-21.0.7+6-jre', 'bin', 'java'); // Linux case, no .exe
        } else {
            backendPath = path.join(__dirname, 'jars', 'backend-1.2.0.jar');
            javaPath = 'java';
        }

        log.info(`Starting backend from: ${backendPath}`);
        log.info(`Using Java at: ${javaPath}`);

        backendProcess = spawn(javaPath, ["-jar", backendPath], {
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
        title: 'Experience-based Analysis',
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            webSecurity: false
        },
    });

    Menu.setApplicationMenu(null);

    mainWindow.maximize();

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

    globalShortcut.register('CommandOrControl+R', function() {
        mainWindow.loadURL(
            url.format({
                pathname: path.join(__dirname, 'dist/frontend/index.html'),
                protocol: 'file:',
                slashes: true,
            })
        );
    })

    globalShortcut.register('CommandOrControl+=', () => {
        let zoomLevel = mainWindow.webContents.getZoomLevel();
        mainWindow.webContents.setZoomLevel(zoomLevel + 1);
    });

    globalShortcut.register('CommandOrControl+-', () => {
        let zoomLevel = mainWindow.webContents.getZoomLevel();
        mainWindow.webContents.setZoomLevel(zoomLevel - 1);
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
