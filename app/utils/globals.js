const Constants = require('./constants.js')
const {ipcMain} = require('electron')

module.exports = Global = {
    windowConfig: {
        height: 900,
        width: 1000,
        minWidth: 900,
        minHeight: 900,
        backgroundColor: Constants.BACKGROUND_COLOR
    },
    infoConfig: {
        height: 800,
        width: 900,
        minWidth: 600,
        minHeight: 700,
        backgroundColor: Constants.BACKGROUND_COLOR,
        modal: true,
        frame: false
    },
    templateMenu: [
        {
            label: 'CA Geolocation',
            submenu: [{
                    label: 'Escolher PDF de Entrada',
                    click: () => {
                        ipcMain.emit('input-short')
                    },
                    accelerator: 'CmdOrCtrl+E'
                },
                {
                    label: 'Escolher Pasta Destino',
                    click: () => {
                        ipcMain.emit('output-short')
                    },
                    accelerator: 'CmdOrCtrl+S'
                } 
            ]
        },
        {
            label: 'Janela',
            submenu: [
                {
                    label: 'Minimizar',
                    role: 'minimize',
                    accelerator: 'CmdOrCtrl+M'
                },
                {
                    label: 'Fechar',
                    role: 'close'
                },
                {
                    label: 'Dev',
                    role: 'toggledevtools'
                }
            ]
        },
        {
            label: 'Sobre',
            submenu: [
                {
                    label: 'Sobre o CA Geolocation',
                    click: () => {
                        ipcMain.emit('info-required')
                    },
                    accelerator: 'CmdOrCtrl+I'
                }
            ]
        }
    ]
}