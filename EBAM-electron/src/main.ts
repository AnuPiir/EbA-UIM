import { app, BrowserWindow } from "electron";
import * as path from "path";
import * as url from "url";

let mainWindow: BrowserWindow | null;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
    });

    // Load the Angular app's index.html from the `dist` directory
    mainWindow.loadURL(
        url.format({
            pathname: path.join(__dirname, "../src/index.html"),
            protocol: "file:",
            slashes: true
        })
    );

    mainWindow.webContents.openDevTools(); // Optional: Open DevTools

    mainWindow.on("closed", () => {
        mainWindow = null;
    });
}

app.whenReady().then(createWindow);

app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});
