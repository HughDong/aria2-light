import { ipcMain, ipcRenderer } from "electron";

export enum channel {
    CLOSE = "close"
}

export function closeApplication() {
    ipcRenderer.send(channel.CLOSE);
}

export function on(channel : string, fn : any) {
    ipcMain.on(channel, fn);
}