
const transToLet  = require('./transToLet')
const transToGeneral  = require('./transToGeneral')

const fs = require('fs');


fs.readFile('./translatePre.js', 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return
  }

  // const translateData = transToLet(data);
  const translateData = transToGeneral(data);
  fs.writeFile('./translateAfter.js', translateData, err => {
    if (err) {
      console.error(err)
      return
    }
  })

})


