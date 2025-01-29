import { app, BrowserWindow } from "electron";
import * as path from "path";
import * as url from "url";

let mainWindow: BrowserWindow | null;

async function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
    });

    const {platformBrowserDynamic} = await import('@angular/platform-browser-dynamic');
    const {AppModule} = await import('./app/app.module.js'); // Adjust path to your AppModule

    // Bootstrap Angular app after dynamic import
    platformBrowserDynamic().bootstrapModule(AppModule)
        .catch(err => console.error(err));


    mainWindow.loadURL(
        url.format({
            pathname: path.join(__dirname, "../src/index.html"),
            protocol: "file:",
            slashes: true
        })
    );

    mainWindow.webContents.openDevTools();

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
