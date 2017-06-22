(function(){

    //-------------- # Variables and Properts
    let vm = this;
    const {ipcRenderer} = require('electron')
    vm.closeButton = document.querySelector('#close-button')

    //-------------- # Event Handling
    closeButton.addEventListener('click', _onCloseButtonClick)

    //-------------- # Private Functions
    function _onCloseButtonClick() {
        ipcRenderer.send('close-app')
    }
})()