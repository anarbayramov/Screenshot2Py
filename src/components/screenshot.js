const childProcess = require('child_process')

const os = require('os')

const config = require('../config')

const { clipboard } = require('electron')

module.exports = class {
  constructor (parent) {
    this.parent = parent
    this.directory = "./screenshots"
  }

  captureSelection () {
    this.execute(this.directory, (file, error) => {

    })
  }

  execute (dir, callback) {
    const name = this.getTimestamp()
    const output = `${dir}/${name}.png`
    let command

    if (os.platform() === 'darwin') command = `/usr/sbin/screencapture -i -x ${output} && python lib/img2py.py ${output}`

    childProcess.exec(command, (error, stdout, stderr) => {
      if (!error) {
        console.log('Selection captured!')
        return callback(output)
      }

      console.log('Error while capturing!')
      console.log(error)

      return callback(null, error)
    })
  }

  getTimestamp (unix) {
    if (unix === true) {
      return (Math.floor(Date.now() / 1000))
    }

    const dateObj = new Date()

    let hours = dateObj.getHours()

    if (hours > 12) hours -= 12
    if (hours === 0) hours = 12

    let minutes = dateObj.getMinutes()

    if (minutes < 10) minutes = ('0' + minutes)

    const date = `${dateObj.getMonth() + 1}.${dateObj.getDate()}.${dateObj.getFullYear()}`
    const time = `${hours}:${minutes}:${dateObj.getSeconds()}`

    return (`${date}_${time}`)
  }
}
