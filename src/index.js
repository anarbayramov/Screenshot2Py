const os = require('os')

const electron = require('electron')

const config = require('./config')

const { Tray, Menu, Notification, shell } = electron


const app = new (class { // eslint-disable-line no-unused-vars
  constructor () {
    this.screenshotModule = new (require('./components/screenshot'))(this)
    // initialize menu bar
    this.createTray()
  }

  createTray () {
    this.app = electron.app

    if (os.platform() === 'darwin') {
      this.app.dock.hide()
    }

    this.app.commandLine.appendSwitch('disable-renderer-backgrounding')

    this.app.on('ready', () => {
      this.tray = new Tray(config.icons.tray.default)

      this.menu = Menu.buildFromTemplate([{
        label: 'Take Screenshot',
        type: 'normal',
        click: () => {
          this.screenshotModule.captureSelection()
        }
      },

      { type: 'separator' },

      {
        label: 'Quit',
        type: 'normal',
        accelerator: 'CommandOrControl+Q',
        click: () => {
          this.app.quit()
        }
      }
      ])

      Menu.setApplicationMenu(this.menu)

      this.tray.setContextMenu(this.menu)
    })
  }

  setIcon (type) {
    this.tray.setImage(config.icons.tray[type])
  }
})()
