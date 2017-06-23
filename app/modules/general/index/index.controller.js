(function(){

    //-------------- # Variables and Properts
    let vm = this;
    const {ipcRenderer} = require('electron')
    vm.closeButton = document.querySelector('#close-btn')
    vm.fullscreenButton = document.querySelector('#fullscreen-btn')
    vm.fullscreen = false
    vm.minimizeButton = document.querySelector('#minimize-btn')

    //-------------- # Event Handling
    closeButton.addEventListener('click', _onCloseButtonClick)
    fullscreenButton.addEventListener('click', _onFullscreenButtonClick)
    minimizeButton.addEventListener('click', _onMinimizeButtonClick)

    //-------------- # Private Functions
    function _onMinimizeButtonClick() {
        ipcRenderer.send('minimize-page')
    }

    function _onFullscreenButtonClick() {
        if(fullscreen){
            ipcRenderer.send('fullscreen-off-page')
            fullscreen = false
            return
        }
        ipcRenderer.send('fullscreen-on-page')
        fullscreen = true
    }

    function _onCloseButtonClick() {
        ipcRenderer.send('close-app')
    }
})()