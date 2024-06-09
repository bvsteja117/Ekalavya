const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('node:path');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

let mainWindow;

const createMainWindow = () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  mainWindow.loadFile(path.join(__dirname, 'index.html'));
  mainWindow.webContents.openDevTools();
};

app.whenReady().then(() => {
  createMainWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

ipcMain.on('navigate-to-home', () => {
  if (mainWindow) {
    mainWindow.loadFile(path.join(__dirname, 'index.html'));
  }
});

ipcMain.on('navigate-to-about', () => {
  if (mainWindow) {
    mainWindow.loadFile(path.join(__dirname, 'about.html'));
  }
});

ipcMain.on('navigate-to-register', () => {
  if (mainWindow) {
    mainWindow.loadFile(path.join(__dirname, 'register.html'));
  }
});

ipcMain.on('navigate-to-resources', () => {
  if (mainWindow) {
    mainWindow.loadFile(path.join(__dirname, 'resources.html'));
  }
});

ipcMain.on('navigate-to-login', () => {
  if (mainWindow) {
    mainWindow.loadFile(path.join(__dirname, 'login.html'));
  }
});

ipcMain.on('navigate-to-scene1', () => {
  if (mainWindow) {
    mainWindow.loadFile(path.join(__dirname, 'scene1.html'));
  }
});

ipcMain.on('navigate-to', (event, nextScene) => {
  if (mainWindow) {
    mainWindow.loadFile(path.join(__dirname, nextScene));
  }
});
