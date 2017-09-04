const createWindowsInstaller = require('electron-winstaller').createWindowsInstaller
const path = require('path')

getInstallerConfig()
     .then(createWindowsInstaller)
     .catch((error) => {
     console.error(error.message || error)
     process.exit(1)
 })

function getInstallerConfig () {
    console.log('creating windows installer')
    const rootPath = path.join('./')
    const outPath = path.join(rootPath, 'release-builds')

    return Promise.resolve({
       appDirectory: path.join(outPath, 'ca-geolocation-win32-ia32/'),
       authors: 'Vinicius Goulart Cardozo',
       noMsi: true,
       outputDirectory: path.join(outPath, 'windows-installer'),
       exe: 'ca-geolocation.exe',
       setupExe: 'ca-geolocation.exe',
       setupIcon: path.join(rootPath, 'app', 'img', 'ca-logo.ico')
   })
}