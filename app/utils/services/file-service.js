const fs = require('fs')

class KMLService {

    constructor(){}

    static createKML(points){
        /*kmlString = `
        <?xml version="1.0" encoding="UTF-8"?>
        <kml xmlns="http://www.opengis.net/kml/2.2">
        <Folder>`
        points.forEach(point => {
            kmlString += 
            `<Placemark>
                <name>${point.city}</name>
                <Point>
                    <coordinates>${point.utm_n},${point.utm_e}</coordinates>
                </Point>
            </Placemark>`
        })*/
    }
}

class XLSService {

    constructor(){}

    static createXLS(filePath, cities){
        //let writeStream = fs.createWriteStream(`${filePath}/Áreas_Contaminadas_e_Reabilitadas.xls`)
        let rows = []

        Object.keys(cities).forEach(prop => {
            cities[prop].forEach(point => rows.push(`${point.city}\t${point.city}\t${point.fuso}\t${point.datum}\t${point.utm_e}\t${point.utm_n}`))
        })

        let buffer = new Buffer(`NOME\tNOME\tFUSO\tDATUM\tUTM_E\tUTM_N\n${rows.join('\n')}`)

        fs.open(`${filePath}/Áreas_Contaminadas_e_Reabilitadas.xlsx`, 'w', (err, fd) => {
            if (err) {
                throw 'error opening file: ' + err;
            }

            fs.write(fd, buffer, 0, buffer.length, null, err => {
                if (err) throw 'error writing file: ' + err;
                fs.close(fd, () => {
                    console.log('fim da escrita de XLS')
                })
            });
        });

    }
}

function _toTag(tagName, tagContent){
    return `<${tagName}>${tagContent}</${tagName}>`
}

module.exports = {
    KMLService,
    XLSService
}