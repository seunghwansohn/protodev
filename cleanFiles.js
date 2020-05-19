const dirFuncs = require('./lib/dirFuncs')
const getDate = require('./lib/getDate')
const fs = require("fs");


const {getDate_yyyymmddhhmm, checkTimeGap} = getDate
const {isDirectory, getDirectories}        = dirFuncs

const getDateFromFolderName = (folderName) => {
  let date = folderName.slice(0,12)
  return date
}

const getLastAddr = (fullAddr) => {
  let lastPosition = fullAddr.lastIndexOf('/')
  let length = fullAddr.length
  let lastAddr = fullAddr.slice(lastPosition + 1, length)
  return lastAddr
}

const delFolder = () => {
  let publicDir = './client/public/temp'
  let dirListArr = getDirectories(publicDir)
  dirListArr.map(async dir => {
    let lastAddr = await getLastAddr(dir)
    let dateFolder = await getDateFromFolderName(lastAddr)
    let dateNow = await getDate_yyyymmddhhmm()
    let timeGap = await checkTimeGap(dateFolder, dateNow)
    console.log(timeGap)
    if (timeGap > 10 || timeGap < 0) {
      fs.rmdir(dir, {recursive:true}, async (err) => {
          if (err) throw err; 
          await console.log('The file has been deleted!');
      })
    }
  })
}

delFolder()