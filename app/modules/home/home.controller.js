
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
let exportComponent = document.querySelector( "#export-input" )  
let exportBtn = document.querySelector( "#export-btn" )
let exportPath = document.querySelector("#export-path")
let dropContainer = document.querySelector('#drop-container')
let startBtn = document.querySelector('#start-btn')
let infoBtn = document.querySelector('#info-btn')
let file = ""
let folder = ""

//-------------- # Event Handling
startBtn.addEventListener('click', _onStartBtnClick)
infoBtn.addEventListener('click', _onInfoBtnClick)
dropContainer.ondragover = () => { return false }
dropContainer.ondragleave = () => { return false }
dropContainer.ondragend = () => { return false }
dropContainer.ondrop = _onDropContainerDrop

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
    startBtn.setAttribute('disabled', true)
    ipcRenderer.send('start-process', file, folder)
}

function _onInfoBtnClick(){
    ipcRenderer.send('info-required')
}

function _onDropContainerDrop(event){
    event.preventDefault()

    if(event.dataTransfer.files[0].type == 'application/pdf'){
        _uploadCallback(event.dataTransfer)
        return false
    }

    if(event.dataTransfer.files[0].type == '' && event.dataTransfer.files[0].name.split('.').length == 1){
       _exportCallback(event.dataTransfer)
       return false 
    }
    
    DialogService.showConfirmModal()
    return false 
}