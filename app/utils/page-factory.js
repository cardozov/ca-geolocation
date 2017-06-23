winReference = null;

module.exports = class PageFactory {
    constructor(config, url){
        this.config = config
        this.url = url
        this.win = winReference = _create(this.config, this.url)
    }

    minimize = _minimize
    fullscreenOn = _fullscreenOn
    fullscreenOff = _fullscreenOff
    close = _close
}

function _create(config, url) {
    let win = new BrowserWindow(config)
    win.loadURL(url)
}

function _minimize(){
    
}