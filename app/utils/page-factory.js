const { BrowserWindow } = require('electron')

module.exports = class PageFactory {
    constructor(config, url){
        this.config = config
        this.url = url
        this.win = _create(this.config, this.url)
    }

    minimize(){
        this.win.minimize()
    }
    
    /*fullscreenOn = () => {
        this.setFullscreen(true)
    }

    fullscreenOff = () => {
        this.win.setFullscreen(false)
    }

    close = () => {
        this.win.hide()
    }

    open = () => {
        this.win.show()
    }*/
}

function _create(config, url) {
    let win = new BrowserWindow(config)
    win.loadURL(url)
}