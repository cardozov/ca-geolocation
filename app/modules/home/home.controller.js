
document.addEventListener('DOMContentLoaded',() => {
    InputFileService.createInputTrigger(uploadComponent, uploadBtn, _uploadCallback)
    InputFileService.createInputTrigger(exportComponent, exportBtn, _exportCallback)
})

//-------------- # Module Imports
const { ipcRenderer } = require('electron')
const InputFileService = require('../../utils/services/input-file-service.js')

//-------------- # Variables and Properts
let uploadComponent  = document.querySelector( "#upload-input" )  
let uploadBtn = document.querySelector( "#upload-btn" )
let uploadPath = document.querySelector("#upload-path")
let exportComponent  = document.querySelector( "#export-input" )  
let exportBtn = document.querySelector( "#export-btn" )
let exportPath = document.querySelector("#export-path")

//-------------- # Event Handling


//-------------- # Private Functions
function _uploadCallback(data) {
    uploadPath.textContent = data.files[0].path
}

function _exportCallback(data) {
    exportPath.textContent = data.files[0].path
}