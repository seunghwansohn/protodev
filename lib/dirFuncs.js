const { lstatSync, readdirSync } = require('fs')
const { join } = require('path')

module.exports = {
    isDirectory : source => lstatSync(source).isDirectory(),
    getDirectories : source => {
        const isDirectory = source => lstatSync(source).isDirectory()

        return readdirSync(source).map(name => join(source, name)).filter(isDirectory)
    }
}