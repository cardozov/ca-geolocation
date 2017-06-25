const Constants = require('./constants.js')

module.exports = Global = {
    windowConfig: {
        height: 900,
        width: 1000,
        minWidth: 900,
        minHeight: 900,
        backgroundColor: Constants.BACKGROUND_COLOR
    },
    templateMenu: [
        {
            label: 'View',
            submenu: [{
                role: 'reload'
            },
            {
                role: 'toggledevtools'
                }
            ]
        },
        {
            label: 'Window',
            submenu: [
                {
                    role: 'minimize',
                    accelerator: 'CmdOrCtrl+M'
                },
                {
                    role: 'close'
                }
            ]
        },
        {
            label: 'Sobre',
            submenu: [
                {
                    label: 'Sobre o Alura Timer',
                    click: () => {
                        ipcMain.emit('abrir-janela-sobre');
                    },
                    accelerator: 'CmdOrCtrl+I'
                }
            ]
        }
    ]
}