
// index.js

// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const os = require('os')





const createWindow = () => {
// Create the browser window.
const mainWindow = new BrowserWindow({
    title: 'Dice Thrower',
    icon: __dirname+'/www/assets/icon/fishy.png',
    width: 800,
    height: 600,
    webPreferences: {
        contextIsolation: true,
        preload: path.join(__dirname, 'preload.js')
    }
})

// and load the index.html of the app.
mainWindow.loadFile('../www/index.html') //WDA aangepast!!

// Open the DevTools.
// mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
createWindow()

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
})
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

// Example IPC communication
// This listener listens on channel 'do-a-thing' defined in preload.js
ipcMain.on('do-a-thing', (event, arg) => {
console.log("Running in main process triggered from renderer");
//example node.js api call:
let hostname = os.hostname();
event.reply('do-a-thing-reply', 'Hi this is main process, I am running on host: '+ hostname)
})



