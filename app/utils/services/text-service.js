
class TextFilterService {

    constructor(){}

    static proceed(text){
        console.log(text.slice(0,20),'...')
    }
}

module.exports = {
    TextFilterService
}