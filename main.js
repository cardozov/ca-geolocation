
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

//-------------- # Event Handling - Main Process
app.on('ready', _onReady)
app.on('window-all-closed', _closeApp)

//-------------- # Event Handling - Rendering Process
ipcMain.on('start-process', _onStartProcess)
ipcMain.on('filter-stop', _onFilterStop)
ipcMain.on('info-required', _onInfoRequired)
ipcMain.on('close-info', _onCloseInfo)

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

function _onStartProcess(event, file, folder){
    console.log(`file: ${file}\nfolder: ${folder}`)
    pdfPath = file
    folderPath = folder
    
    TextFilterService.proceed(file, folder, win)
}

function _onFilterStop(areas) {
    areasByCity = areas
    //KMLService.createKML(areasByCity)
    XLSService.createXLS(folderPath, areasByCity)
}

function _onInfoRequired() {
    if(infoWin == null){
        infoWin = new BrowserWindow(Global.infoConfig)
        infoWin.on('closed', () => {
            infoWin = null
        })
    }
    
    infoWin.loadURL(`${__dirname}/${Constants.URL.INFO}`)
}

function _onCloseInfo() {
    infoWin.close()
}

function _closeApp() {
    app.quit()
}