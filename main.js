
//-------------- # Build Settings
const setupEvents = require('./installers/setupEvents')
if (setupEvents.handleSquirrelEvent()) {
   // squirrel event handled and app will exit in 1000ms, so don't do anything else
   return;
}

//-------------- # Module Imports
const { app, ipcMain, BrowserWindow, Menu, globalShortcut } = require('electron')
const fs = require("fs")
const Constants = require('./app/utils/constants.js')
const Global = require('./app/utils/globals.js')
const MenuService = require('./app/utils/services/menu-service.js')
const { TextFilterService } = require('./app/utils/services/text-service.js')
const { KMLService, XLSService } = require('./app/utils/services/file-service')

//-------------- # Variables and Properts
let win = null
let areasByCity
let pdfPath
let folderPath
let infoWin = null
let startSender = null
let loadSender = null

//-------------- # Event Handling - Main Process
app.on('ready', _onReady)
app.on('window-all-closed', _closeApp)

//-------------- # Event Handling - Rendering Process
ipcMain.on('start-process', _onStartProcess)
ipcMain.on('process-error', _onProcessError)
ipcMain.on('filter-stop', _onFilterStop)
ipcMain.on('info-required', _onInfoRequired)
ipcMain.on('close-info', _onCloseInfo)
ipcMain.on('load-sender', _onLoadSender)
ipcMain.on('input-short', _onInputShort)
ipcMain.on('output-short', _onOutputShort)

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
        win.send('test');
    });
}

function _onStartProcess(event, file, folder){
    console.log(`file: ${file}\nfolder: ${folder}`)
    startSender = event
    pdfPath = file
    folderPath = folder
    
    TextFilterService.proceed(file, folder, win)
}

function _onProcessError(err) {
    startSender.sender.send('process-error', JSON.stringify({
        message: err.message,
        name: err.name,
        stack: err.stack
    }))
}

function _onFilterStop(areas) {
    areasByCity = areas
    folderPath = _createRootFolder(folderPath)
    KMLService.createKML(folderPath, areasByCity)
    XLSService.createXLS(folderPath, areasByCity)
    startSender.sender.send('filter-stop')
}

function _createRootFolder(folderPath) {
    let dir = folderPath + '\\Arquivos CA Geolocation'

    if (!fs.existsSync(dir))
        fs.mkdirSync(dir)

    return dir
}

function _onInfoRequired() {
    if(infoWin == null){
        Global.infoConfig.parent = win
        infoWin = new BrowserWindow(Global.infoConfig)
        infoWin.on('closed', () => {
            infoWin = null
        })
    }
    
    infoWin.loadURL(`${__dirname}/${Constants.URL.INFO}`)
}

function _onLoadSender(event) {
    loadSender = event.sender
}

function _onInputShort() {
    loadSender.send('input-short')
}

function _onOutputShort() {
    loadSender.send('output-short')
}

function _onCloseInfo() {
    infoWin.close()
}

function _closeApp() {
    app.quit()
}