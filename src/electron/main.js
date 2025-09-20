import { app, BrowserWindow } from 'electron';
import path from 'path';
import { isDev } from './util.js';
function createMainWindow() {
    const mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
    });
    if (isDev()) {
        mainWindow.loadURL('http://localhost:5173');
    }
    else {
        mainWindow.loadFile(path.join(app.getAppPath(), '/dist-react/index.html'));
    }
}
app.whenReady().then(createMainWindow);
app.on("window-all-closed", () => {
    if (process.platform !== "darwin")
        app.quit();
});
app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0)
        createMainWindow();
});
//# sourceMappingURL=main.js.map