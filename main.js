
//-------------- # Module Imports
const { app, ipcMain, remote } = require('electron')
const FlowManager = require('./app/utils/flow-manager.js')
//Setting root constant reference
FlowManager.ROOT = `file://${__dirname}`

//-------------- # Variables and Properts

//-------------- # Event Handling - Main Process
app.on('ready', _onReady)
app.on('window-all-closed', _closeApp)

//-------------- # Event Handling - Rendering Process
ipcMain.on('close-app', _closeApp)
ipcMain.on('minimize-page',_minimizePage)

//-------------- # Private Functions
function _onReady() {
    console.log('Aplicacao Iniciada')
    FlowManager.goToIndex({
        width: 600,
        height: 400,
        minWidth: 600,
        minHeight: 400,
        frame: false
    })
}

function _minimizePage(){
    FlowManager.minimize()
}

function _closeApp() {
    app.quit()
}