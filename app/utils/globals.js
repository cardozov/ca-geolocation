const Constants = require('./constants.js')

module.exports = Global = {
    windowConfig: {
        height: 900,
        width: 1000,
        minWidth: 900,
        minHeight: 900,
        backgroundColor: Constants.BACKGROUND_COLOR
    },
    infoConfig: {
        height: 500,
        width: 700,
        minWidth: 400,
        minHeight: 600,
        backgroundColor: Constants.BACKGROUND_COLOR,
        modal: true,
        frame: false
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
                        ipcMain.emit('info-required');
                    },
                    accelerator: 'CmdOrCtrl+I'
                }
            ]
        }
    ]
}