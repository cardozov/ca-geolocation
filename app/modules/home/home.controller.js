
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
let file = ""
let folder = ""

//-------------- # Event Handling
startBtn.addEventListener('click', _onStartBtnClick)


//-------------- # Private Functions
function _uploadCallback(data) {
    uploadPath.value = file = data.files[0].path
    _validateRequirements()
}

function _exportCallback(data) {
    exportPath.value = folder = data.files[0].path
    _validateRequirements()
}

function _validateRequirements(){
    if(file && folder)
        startBtn.classList.remove("disabled")
}

function _onStartBtnClick(){
    ipcRenderer.send('start-process', file, folder)
    startBtn.setAttribute('disabled',true)
}