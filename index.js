const { app, BrowserWindow, ipcMain, ipcRenderer } = require('electron')
const axios = require("axios");

const fs = require('fs');

const createWindow = async () => {
    const win = new BrowserWindow({
        width: 1080,
        height: 1080,
        webPreferences:
            {
                nodeIntegration: true,
                contextIsolation: false,
                enableRemoteModule: true,
            },
    })

    await win.loadFile('./renderer/index.html')

    axios.get('https://reqres.in/api/users')
        .then(function(response) {
            console.log(response.data.data)
            convertToJSON(response.data.data)
            win.webContents.send('send-user', response.data.data)
        })
        .catch(function(error) {
            console.error('Произошла ошибка при получении данных', error);
            console.log(error);
        });
}


function convertToJSON (dict) {
    var json_file = JSON.stringify(dict);
    var fs = require('fs');
    fs.writeFile("user_info.json", json_file, function(err, result) {
        if(err) console.log('error', err);
    });
}

// function check_online () {
//
//
// }

// function getUser() {
//     let user;
//     axios.get('https://reqres.in/api/users')
//         .then(function(response) {
//             user = response.data.data
//         })
//         .catch(function(error) {
//             console.error('Произошла ошибка при получении данных', error);
//             console.log(error);
//         });
//     return user;
// }

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        // ipcMain.on('get-user', handleSetUser)

        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})