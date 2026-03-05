"use strict";
const electron = require("electron");
electron.contextBridge.exposeInMainWorld("ipcRenderer", {
  // Вместо прямого вызова shell, шлем сигнал в main
  openExternal: (url) => electron.ipcRenderer.send("open-external-link", url),
  on(channel, listener) {
    const subscription = (event, ...args) => listener(event, ...args);
    electron.ipcRenderer.on(channel, subscription);
    return () => {
      electron.ipcRenderer.removeListener(channel, subscription);
    };
  },
  send(channel, ...args) {
    electron.ipcRenderer.send(channel, ...args);
  },
  invoke(channel, ...args) {
    return electron.ipcRenderer.invoke(channel, ...args);
  },
  removeListener(channel, listener) {
    electron.ipcRenderer.removeListener(channel, listener);
  }
});
