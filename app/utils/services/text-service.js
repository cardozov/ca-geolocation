
//-------------- # Module Imports
const {app, ipcMain} = require('electron')
const fs = require("fs")
const epsg = require('epsg')
const proj4 = require('proj4')
require('pdfjs-dist')

//-------------- # Variables and Properties
let win = null
let areasByCity = {}
let isGrey = true
let isFilteringName = false

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
        .catch(err => ipcMain.emit('process-error',err))
    }
}

class GeometricCalculator {

    constructor(){}

    static convertToWGS84(obj){
        return _convertToWGS84(obj.datum, obj.fuso, obj.utm_e, obj.utm_n)
    }
}

//-------------- # Private Functions

function _formatByPage(doc, idx, max, callback) {
    doc.getPage(idx)
    .then(page => {
        page.getTextContent()
    })
    .then(content => {
        _formatPageContent(content)

        if(idx >= max){
            ipcMain.emit('filter-stop', areasByCity)
            return
        }
        
        _formatByPage(doc, idx+1, max, callback)
    })
    .catch(err => ipcMain.emit('process-error',err))
    
}

function _formatPageContent(content) {
    let str = content.items.map(item => item.str)

    _resolveStr(str)
    .then(filter => {
        filter.isGrey = isGrey
        isGrey = !isGrey
    
        if(filter.datum == "Córrego Alegre")
            filter.datum = "CORREGO_ALEGRE"
    
        const latLon = GeometricCalculator.convertToWGS84(filter)
        filter.latitude = latLon.y
        filter.longitude = latLon.x
        
        if(!areasByCity[filter.city]){
            areasByCity[filter.city] = []
            while(isFilteringName){}
            filter.name = filter.name.replace(`${filter.city}`,"")
        }
    
        areasByCity[filter.city].push(filter)
    })
}

function _resolveStr(str) {
    return new Promise((resolve, reject) => {
        let filter = {}
        str.forEach((row, idx) => {
            // if(str.name.indexOf("EAST SIDE CONDOMÍNIO") > 0)
            //     debugger
            if(str[idx+2] == 'indústria'){
                filter.name = str.slice(2,idx+1).reduce((x,y) => x+y)
                [   
                    {char: "&",  alias: "&amp;" },
                    {char: "<",  alias: "&lt;"  },
                    {char: ">",  alias: "&gt;" },
                    {char: "\'", alias: "&apos;"},
                    {char: "\"", alias: "&quot;"}
                ].forEach(item => {
                    while (filter.name.indexOf(item.char) > 0) {
                        filter.name = filter.name.replace(item.char, item.alias)
                    }
                })
            }
            
            if(str[idx+1] == 'indústria')
                filter.city = row.slice(row.lastIndexOf('- ')+1).trim()
            if(row == 'fuso')
                filter.fuso = str[idx+1]
            if(row == 'UTM_E')
                filter.utm_e = str[idx+1]
            if(row == 'UTM_N')
                filter.utm_n = str[idx+1]
            if(row == 'DATUM')
                filter.datum = str[idx+1]
        }, data => {
            resolve(filter)
        })
    })
}

function _pdfErrorHandler(err) {
    ipcMain.emit('pdf-reading-error')
}

function _convertToWGS84(datum, fuso, lat, lon) {
    let datumIdx = Constants.DATUM[`${datum}_${fuso}_S`]
    

    let a = new proj4.Proj('WGS84')
    let b = new proj4.Proj(epsg[datumIdx])    

    let point = new proj4.toPoint(_formatGeodesicPoint(lat, lon));

    return proj4(b, a, point);
}

function _formatGeodesicPoint(lat, lon) {
    lat = parseFloat(lat.replace('.','').replace(',','.'))
    lon = parseFloat(lon.replace('.','').replace('.','').replace(',','.'))

    return [lat, lon]
}

//-------------- # Export Object
module.exports = {
    TextFilterService,
    GeometricCalculator
}