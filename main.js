var { app, BrowserWindow } = require('electron');
let mainWindow = null;
function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({ width: 1920, height: 1080 })//创建一个浏览器窗口，可配置宽高
  // and load the index.html of the app.
  mainWindow.loadFile('./dist/index.html');//加载html
  // Open the DevTools.
  // mainWindow.webContents.openDevTools()//打开调试窗口
  mainWindow.on('closed', function () {
    mainWindow = null;
  })
}

app.on('ready', createWindow);
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
})
app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
})