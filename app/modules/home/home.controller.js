
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
let startBtn = document.querySelector('#start-btn')

//-------------- # Event Handling


//-------------- # Private Functions
function _uploadCallback(data) {
    uploadPath.textContent = data.files[0].path
    _validateRequirements()
}

function _exportCallback(data) {
    exportPath.textContent = data.files[0].path
    _validateRequirements()
}

function _validateRequirements(){
    if(uploadPath.textContent && exportPath.textContent)
        startBtn.classList.remove("disabled")
}