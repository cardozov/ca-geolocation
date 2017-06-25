module.exports = Global = {
    windowConfig: {
        height: 700,
        width: 700,
        minWidth: 700,
        minHeight: 700
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