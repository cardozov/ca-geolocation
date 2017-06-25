
//-------------- # Module Imports
const { ipcRenderer } = require('electron')

//-------------- # Variables and Properts
const $ = document.querySelector
let uploadComponent = $('#upload-input')
let exportComponent = $('#export-input')

//-------------- # Event Handling
uploadComponent.addEventListener('click', _onUploadChange)
exportComponent.addEventListener('change', _onExportChange)

//-------------- # Private Functions
function _onUploadChange(){
    alert('changed')
    //TODO: verifying statement
}

function _onExportChange(){
    alert('changed')
    //TODO: verifying statement
}