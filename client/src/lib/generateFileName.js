import {getDate_yyyymmddhhmm}   from './funcs/fGetDate'
import bcrypt                   from 'bcryptjs' //해시 형성 및 해시 검증하여 정보를 확실히 검증


export const generateFileName = async () => {
  let returnStr = ''
  console.log(bcrypt.genSalt(8, async (err,salt) => {
    return await bcrypt.hash("not_bacon", salt, async (err, hash) => {
      let fixed = await hash.replace(/\/|\$|\*|\\|\"|\<|\>|\||(\.)/g, 'e').slice(7,36)
      await console.log(fixed)
      fixed = await getDate_yyyymmddhhmm() + '_' + fixed
      fixed = await fixed.slice(0, 30)
      returnStr = await fixed
    })
  }))
  await console.log(returnStr)
  return await returnStr
}

export const getFolderStr = () => {
  let salt = bcrypt.genSaltSync(10);

  let fixed = salt.replace(/\/|\$|\*|\\|\"|\<|\>|\||(\.)/g, 'e').slice(7,36)
  fixed = getDate_yyyymmddhhmm() + '_' + fixed
  fixed = fixed.slice(0, 30)
  return fixed
}