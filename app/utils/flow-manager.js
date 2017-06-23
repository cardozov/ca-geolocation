module.exports = FlowManager = {
    ROOT:'',
    goToIndex: _goToIndex,
    minimize: _minimize
}

//-------------- # Variables and Properts
const { BrowserWindow } = require('electron')
const Constants = require('./constants.js')
let win;

//-------------- # Private Functions
function _goToIndex(config) {
    _renderPage(config, `${FlowManager.ROOT}/${Constants.URLS.INDEX_URL}`)
}

function _renderPage(config = {}, path){
    win = new BrowserWindow(config)
    
    if(FlowManager.ROOT == '')
        throw new Error('Root constant is not defined!')

    win.loadURL(path)
}

function _minimize(){
    win.minimize()
}

function _fullscreenOn(){
    win.setFullscreen(true)
}

function _fullscreenOff(){
    win.setFullscreen(false)
}