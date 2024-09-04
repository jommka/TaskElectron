const { ipcRenderer } = require('electron')

let status_online = () => {
    return navigator.onLine;
}

ipcRenderer.on('send-user', (event, user) => {
    console.log(user)
    console.log(status_online())

})



