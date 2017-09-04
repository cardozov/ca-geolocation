
//-------------- # Module Imports
const getmac = require('getmac')
const constants = require('../constants')

//-------------- # Exports
module.exports = class HttpService {
    
    constructor(){}
    
    static getAccess(){
        return new Promise((resolve, reject) => {
            getmac.getMac((err,macAddress) => {
                if (err)  reject(err)
                _get(`${constants.HTTP.SERVER}${constants.HTTP.GET_ACCESS}${macAddress}`)
                .then(data => resolve(data))
                .catch(err => reject(err))
            })
        })
    }

    static postKey(_key){
        return new Promise((resolve, rejct) => {
            getmac.getMac((err,macAddress) => {
                if (err)  reject(err)
                let params = {
                    key: _key,
                    mac: macAddress
                }
                _post(`${constants.HTTP.SERVER}${constants.HTTP.POST_KEY}`, JSON.stringify(params))
                .then(data => resolve(data))
                .catch(err => reject(err))
            })
        })
    }
}

//-------------- # Private Functions
function _get(URL){
    return _fetch(URL, {method: 'GET'})
}

function _post(URL, params){
    return _fetch(URL, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: params
    })
    
}

function _fetch(URL, config){
    return fetch(URL, config)
        .then(response => response.json())
}