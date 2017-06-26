
//-------------- # Module Imports
const {app, ipcMain} = require('electron')
const fs = require("fs")
require('pdfjs-dist')

//-------------- # Variables and Properties
let win = null
let areasByCity = {}

//-------------- # Exporting Modules
class TextFilterService {

    constructor(){}

    static proceed(filePath, folderPath, wind){
        win = wind

        let data = new Uint8Array(fs.readFileSync(filePath))
        PDFJS.getDocument(data)
        .then(doc => {
            let max = doc.numPages
            _formatByPage(doc, 1, max, _formatPageContent)
        })
    }
}

class GeometricCalculator {

    constructor(){}

    static convertToWGS84(obj){
        
        switch(obj.datum){
            case 'SAD69':
                return _convert_SAD69_To_WGS84(obj)
                break
            case 'SIRGAS2000':
                return _convert_SIRGAS2000_To_WGS84(obj)
                break
            case 'Córrego Alegre':
                return _convert_CORREGOALEGRE_To_WGS84(obj)
                break
            default :
                console.log(obj)
                return {}
        }
    }
}

//-------------- # Private Functions

function _formatByPage(doc, idx, max, callback) {
    doc.getPage(idx)
    .then(page => {
        page.getTextContent()
        .then(content => {
            _formatPageContent(content)

            if(idx >= max){
                ipcMain.emit('filter-stop', areasByCity)
                return
            }
            
            _formatByPage(doc, idx+1, max, callback)
        })
    })
    
}

function _formatPageContent(content) {
    let str = content.items.map(item => item.str)

    let filter = {}

    str.forEach((row, idx) => {
        if(str[idx+1] == 'indústria')
            filter.city = row.slice(row.lastIndexOf('-')+1).trim()
        if(row == 'fuso')
            filter.fuso = str[idx+1]
        if(row == 'UTM_E')
            filter.utm_e = str[idx+1]
        if(row == 'UTM_N')
            filter.utm_n = str[idx+1]
        if(row == 'DATUM')
            filter.datum = str[idx+1]
    })

    if(filter.datum != 'WGS84')
        filter = GeometricCalculator.convertToWGS84(filter)
    
    if(!areasByCity[filter.city])
        areasByCity[filter.city] = []

    areasByCity[filter.city].push(filter)
}

function _pdfErrorHandler(err) {
    ipcMain.emit('pdf-reading-error')
}

function _convert_SAD69_To_WGS84(obj) {
    return obj
}

function _convert_SIRGAS2000_To_WGS84(obj) {
    return obj
}

function _convert_CORREGOALEGRE_To_WGS84(obj) {
    return obj
}


//-------------- # Export Object
module.exports = {
    TextFilterService,
    GeometricCalculator
}