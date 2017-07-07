
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
    if(data.files)
        data = data.files[0]
    uploadPath.value = file = data.path
    _validateRequirements()
}

function _exportCallback(data) {
    if(data.files)
        data = data.files[0]
    exportPath.value = folder = data.path
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

    let data = event.dataTransfer
    let folderList = _getFolderList(data.files)
    let pdfList = _getPdfList(data.files)

    if(!_isValidFileLists(folderList, pdfList, data.files.length)){
        //DialogService.showConfirmModal()
        console.log('errooooou')
        return false
    }

    if(folderList.length == 1){
        _exportCallback(folderList[0])
    }

    if(pdfList.length == 1){
        _uploadCallback(pdfList[0])
    }

    return false 
}

function _getFolderList(fileList) {
    return Array.from(fileList).filter(file => {
        if(file.type == '' && file.name.split('.').length == 1) 
            return file
    })
}

function _getPdfList(fileList) {
    return Array.from(fileList).filter(file => {
        if(file.type == 'application/pdf')
            return file
    })
}

function _isValidFileLists(folderList = [], pdfList = [], totalLen = -1) {
    let pdfLen = pdfList.length
    let folderLen = folderList.length
    return (folderLen == 1 || folderLen == 0) && (pdfLen == 1 || pdfLen == 0) && (pdfLen + folderLen == totalLen)
}