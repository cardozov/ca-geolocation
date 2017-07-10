const fs = require('fs')

class KMLService {

    constructor(){}

    static createKML(filePath, cities){

        Object.keys(cities).forEach(city => {
            _createKMLFromCity(filePath, city, cities)
        })
    }
}

class XLSService {

    constructor(){}

    static createXLS(filePath, cities){
        let rows = []

        Object.keys(cities).forEach(prop => {
            cities[prop].forEach(point => rows.push(`${point.name}\t${point.city}\t${point.fuso}\t${point.datum}\t${point.utm_e}\t${point.utm_n}\t${point.latitude}\t${point.longitude}`))
        })

        let content = `NOME\tCIDADE\tFUSO\tDATUM\tUTM_E\tUTM_N\tLATITUDE\tLONGITUDE\n${rows.join('\n')}`
        let name = `${filePath}/Áreas_Contaminadas_e_Reabilitadas.xls`

        _writeFile(content, name)

    }
}

function _toTag(tagName, tagContent){
    return `<${tagName}>${tagContent}</${tagName}>`
}

function _createKMLFromCity(filePath, city, cities) {
    kmlString = 
`<?xml version="1.0" encoding="UTF-8"?>\r
<kml xmlns="http://www.opengis.net/kml/2.2">\r
    <Folder>\r
        <name>${cities[city][0].city}</name>\r`
        
    cities[city].forEach(point => {
        kmlString += `
        <Placemark>\r
            <name>${point.name}</name>\r
            <Point>\r
                <coordinates>${point.longitude},${point.latitude}</coordinates>\r
            </Point>\r
        </Placemark>\r`
    })
    
    kmlString += `
    </Folder>\r
</kml>`

    let name = `${filePath}/${cities[city][0].city}.kml`

    _writeFile(kmlString.toString(),name)
}

function _writeFile(content, name) {
    let buffer = new Buffer(content)

    fs.open(name, 'w', (err, fd) => {
        if (err) {
            throw 'error opening file: ' + err;
        }

        fs.write(fd, buffer, 0, buffer.length, null, err => {
            if (err) throw 'error writing file: ' + err;
            fs.close(fd, () => {
                console.log('fim da escrita de arquivo')
            })
        });
    });
}

module.exports = {
    KMLService,
    XLSService
}