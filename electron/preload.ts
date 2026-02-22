import { ipcRenderer, contextBridge } from 'electron'

contextBridge.exposeInMainWorld('ipcRenderer', {
  // Вместо прямого вызова shell, шлем сигнал в main
  openExternal: (url: string) => ipcRenderer.send('open-external-link', url),

  on(channel: string, listener: (event: any, ...args: any[]) => void) {
    const subscription = (event: any, ...args: any[]) => listener(event, ...args)
    ipcRenderer.on(channel, subscription)
    return () => {
      ipcRenderer.removeListener(channel, subscription)
    }
  },

  send(channel: string, ...args: any[]) {
    ipcRenderer.send(channel, ...args)
  },

  invoke(channel: string, ...args: any[]) {
    return ipcRenderer.invoke(channel, ...args)
  },

  removeListener(channel: string, listener: (...args: any[]) => void) {
    ipcRenderer.removeListener(channel, listener)
  }
})