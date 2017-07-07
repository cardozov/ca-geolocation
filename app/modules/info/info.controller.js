
//-------------- # Module Imports
const { shell, ipcRenderer } = require('electron')

//-------------- # Variables and Properts
let dropContainer = document.querySelector('.container')

//-------------- # Event Handling
dropContainer.ondragover = () => { return false }  //     \
dropContainer.ondragleave = () => { return false } //      \    Drag &
dropContainer.ondragend = () => { return false }   //      /     Drop
dropContainer.ondrop =  () => { return false }     //     /

//-------------- # Private Functions
function openExternal() {
    shell.openExternal('http://areascontaminadas.cetesb.sp.gov.br/relacao-de-areas-contaminadas/')
}

function closeWindow() {
    ipcRenderer.send('close-info')
}