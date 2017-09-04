
module.exports = class LocalStorageService {

    constructor(){}

    static get(key){
        return new Promise((resolve, reject) => {
            let result = localStorage.getItem(key)
            if(result == null)
                reject('This key have no matches into Local Storage')
            resolve(result)
        })
    }

    static set(key,value){
        return new Promise((resolve, reject) => {
            localStorage.setItem(key,value)
            _get(key)
            .then(_value => {
                if(_value == value)
                    resulve(value)
                else
                    reject('An error ocurred into Local Storage process')
            })
            .catch(err => reject('An error ocurred into Local Storage process'))
        })
    }
}