module.exports = class InputFileService {

    constructor(){}

    static createInputTrigger(component, trigger, callback){
        trigger.addEventListener( "keydown", function( event ) {  
            if ( event.keyCode == 13 || event.keyCode == 32 ) {  
                component.click();  
            }  
        })

        trigger.addEventListener( "click", function( event ) {
            component.click()
            return false
        })  

        component.addEventListener( "change", function( event ) {  
            callback(this)
        })
    }
}