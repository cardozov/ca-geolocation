module.exports = FlowManager = {
    ROOT:'',
    goToIndex: _goToIndex 
}

//-------------- # Variables and Properts
const { BrowserWindow } = require('electron')
const Constants = require('./constants.js')

//-------------- # Private Functions
function _goToIndex(config) {
    _renderPage(config, `${FlowManager.ROOT}/${Constants.URLS.INDEX_URL}`)
}

function _renderPage(config = {}, path){
    let win = new BrowserWindow(config)
    
    if(FlowManager.ROOT == '')
        throw new Error('Root constant is not defined!')

    win.loadURL(path)
}