
//-------------- # Module Imports
const { app, ipcMain, BrowserWindow, Menu, globalShortcut } = require('electron')
const Constants = require('./app/utils/constants.js')
const Global = require('./app/utils/globals.js')
const MenuService = require('./app/utils/services/menu-service.js')
const { TextFilterService } = require('./app/utils/services/text-service.js')
const pdfText = require('pdf-text')
const fs = require('fs')
const PDFParser = require("pdf2json")

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
    
    pdfText(file, function(err, text) {
        if(err){
            ModalService.showError('Ooops!','Houve um problema na hora de abrir o arquivo.\nTem certeza que é o PDF certo?', Constants.ICON.ALERT)
            return
        }

        let d1 = `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}:${new Date().getMilliseconds()}`
        
        /*
        let pdfParser = new PDFParser();
 
        pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError) );
        pdfParser.on("pdfParser_dataReady", pdfData => {
            fs.writeFile(folder+"/teste.json", JSON.stringify(pdfData));
        });
    
        pdfParser.loadPDF(file)*/
        text = text
            .filter((x,i) => {
                if(text[i+1] == 'indústria') return x
            })
            .map( x => 
                x.slice(x.lastIndexOf('-')+1)
                .trim())
        console.log(text)
        //TextFilterService.proceed(text.slice(0,20))
        let d2 = `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}:${new Date().getMilliseconds()}`

        console.log(d1,' - ',d2)
    })
    
}

function _closeApp() {
    app.quit()
}