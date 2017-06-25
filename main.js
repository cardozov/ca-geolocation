
//-------------- # Module Imports
const { app, ipcMain, BrowserWindow, Menu, globalShortcut } = require('electron')
const Constants = require('./app/utils/constants.js')
const Global = require('./app/utils/globals.js')
const MenuService = require('./app/utils/services/menu-service.js')
const pdfreader = require('pdfreader')

//-------------- # Variables and Properts
let win = null

//-------------- # Event Handling - Main Process
app.on('ready', _onReady)
app.on('window-all-closed', _closeApp)

//-------------- # Event Handling - Rendering Process
ipcMain.on('start-process', _onStartProcess)

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

    let text = ""

    new pdfreader.PdfReader().parseFileItems(file, function(err, item){
        if (err)
            console.log('err')
        else if (!item)
            console.log('!item')
        else if (item.text)
            text = item.text
    });

    if(!text){
        ModalService.showError('Ooops!','Houve um problema na hora de abrir o arquivo.\nTem certeza que é o PDF certo?')
        return
    }

    TextFilterService.proceed(text)
}

function _closeApp() {
    app.quit()
}