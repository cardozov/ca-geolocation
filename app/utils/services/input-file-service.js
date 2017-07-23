module.exports = class InputFileService {

    constructor(){}

    static createInputTrigger(component, trigger, callback){
        trigger.addEventListener( "keydown", function( event ) { 
            if ( event.keyCode == 13 || event.keyCode == 32 ) {  
                component.click();  
            }  
        }, false)

        trigger.addEventListener( "click", function( event ) {
            event.preventDefault()
            component.click()
            return false
        }, false)

        component.addEventListener( "change", function( event ) {  
            callback(this)
        }, false)
    }
}