const { shell, ipcRenderer } = require('electron')

function openExternal() {
    shell.openExternal('http://areascontaminadas.cetesb.sp.gov.br/relacao-de-areas-contaminadas/')
}

function closeWindow() {
    ipcRenderer.send('close-info')
}