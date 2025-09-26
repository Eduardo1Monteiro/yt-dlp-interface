import { ipcRenderer, contextBridge } from "electron";

contextBridge.exposeInMainWorld("electronAPI", {
  openSecondaryWindow: (video: any) => ipcRenderer.send("open-secondary-window", video),
});

contextBridge.exposeInMainWorld("electronAPI", {
  onVideoData: (callback: (video: any) => void) =>
    ipcRenderer.on("video-data", (_event, video) => callback(video)),
});

contextBridge.exposeInMainWorld("electronAPI", {
  downloadContent: (url: string, option: number) => ipcRenderer.invoke("yt-dlp-download", url, option),
});
