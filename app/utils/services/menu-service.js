
const Global = require('../globals.js')

module.exports = class MenuService {

    constructor(){}

    static generateTemplateMenu(appName){
        let template = Global.templateMenu

        //Inserindo um menu obrigatório no inicio, caso a aplicação esteja rodando no Mac
        if(process.platform == 'darwin'){
            template.unshift({
                label: appName
            })
        }
        return template
    }
}