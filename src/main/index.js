'use strict'

import { app, Menu, BrowserWindow } from 'electron'
import path from 'path'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  var infoPath = path.join(app.getPath('userData'), 'bounds-info.json')
  var dbPath = path.join(app.getPath('userData'), '/data.db')
  var fs = require('fs')

  var boundsInfo
  try {
    boundsInfo = JSON.parse(fs.readFileSync(infoPath, 'utf8'))
  } catch (e) {
    boundsInfo = { width: 600, height: 800 }
  }

  try {
    fs.statSync(dbPath)
  } catch (e) {
    fs.writeFile(dbPath, '')
  }

  mainWindow = new BrowserWindow({
    width: boundsInfo.width,
    height: boundsInfo.height,
    useContentSize: true
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('close', () => {
    var infoPath = path.join(app.getPath('userData'), 'bounds-info.json')

    fs.writeFileSync(infoPath, JSON.stringify(mainWindow.getBounds()))
  })

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
