import { app, BrowserWindow, ipcMain } from 'electron';
import { spawn } from 'child_process';
import path from 'path';
import { isDev } from './util.js';

function createMainWindow(): void {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
  });
  if (isDev()) {
    mainWindow.loadURL('http://localhost:5123');
  } else {
    mainWindow.loadFile(path.join(app.getAppPath(), '/dist-react/index.html'));
  }
}

app.whenReady().then(createMainWindow);

app.on("activate", (): void => {
  if (BrowserWindow.getAllWindows().length === 0) createMainWindow();
})


ipcMain.on("open-secondary-window", (event, video) => {
  const secondaryWindow = new BrowserWindow({
    width: 250,
    height: 400,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
    },
  });

  if (isDev()) {
    secondaryWindow.loadURL("http://localhost:5173/secondary");
  } else {
    secondaryWindow.loadFile(path.join(app.getAppPath(), '/dist-react/secondary.html'));
  }

  secondaryWindow.webContents.on("did-finish-load", () => {
    secondaryWindow.webContents.send("video-data", video);
  });
});

ipcMain.handle("yt-dlp-download", async (event, videoUrl: string, option: number) => {
  return new Promise((resolve, reject) => {
    let yt;

    if (option === 0) {
      yt = spawn("yt-dlp", ["-f", "best", videoUrl], {
        cwd: path.join(app.getPath("downloads")),
      });
    } else if (option === 1) {
      yt = spawn("yt-dlp", ["-x", "mp3", videoUrl], {
        cwd: path.join(app.getPath("downloads")),
      });
    }

    if (yt) {
      yt.stdout.on("data", (data) => {
        console.log(`stdout: ${data}`);
      });

      yt.stderr.on("data", (data) => {
        console.error(`stderr: ${data}`);
      });

      yt.on("close", (code) => {
        if (code === 0) {
          resolve("Download concluído!");
        } else {
          reject(`yt-dlp falhou com código ${code}`);
        }
      });
    }
  });
});

app.on("window-all-closed", (): void => {
  if (process.platform !== "darwin") app.quit()
})
