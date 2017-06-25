
//-------------- # Module Imports
const { app, ipcMain, BrowserWindow, Menu, globalShortcut } = require('electron')
const Constants = require('./app/utils/constants.js')
const Global = require('./app/utils/globals.js')
const MenuService = require('./app/utils/services/menu-service.js')

//-------------- # Variables and Properts
let win = null

//-------------- # Event Handling - Main Process
app.on('ready', _onReady)
app.on('window-all-closed', _closeApp)

//-------------- # Event Handling - Rendering Process

//-------------- # Private Functions
function _onReady() {
    
    console.log('Aplicacao Iniciada')

    win = new BrowserWindow(_getConfig())

    _menuTemplateHandler()

    win.loadURL(_getPath())
}

function _getConfig() {
    return Global.windowConfig
}

function _getPath(){
    return `${__dirname}/${Constants.URL.HOME}`
}

function _menuTemplateHandler(){
    let templateMenu = MenuService.generateTemplateMenu(app.getName())
    let menuPrincipal = Menu.buildFromTemplate(templateMenu)
    Menu.setApplicationMenu(menuPrincipal)

    //Atalhos globais da aplicação
    globalShortcut.register('CmdOrCtrl+Shift+A', () => {
        win.send('atalho-upload');
    });
}

function _closeApp() {
    app.quit()
}