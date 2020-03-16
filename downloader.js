const readline = require('readline')
const fs = require('fs')
const path = require('path')
const axios = require('axios')

const readInterface = readline.createInterface({
  input: fs.createReadStream('./deathrow.tsv')
})

const baseURL = 'https://twtjcdb.tjc.gov.tw'
let files = []

readInterface.on('line', line => {
  let [name, url] = line.split('\t')
  files.push({
    name,
    url
  })
})

readInterface.on('close', async line => {
  for(let file of files) {
    let { name, url } = file
    url = baseURL + url
    const filePath = path.resolve(__dirname, 'images', name + '.jpg')
    const writer = fs.createWriteStream(filePath)
    console.log(name + '\t' + url)
    const response = await axios.get(url, {
      responseType: 'stream'
    })
    response.data.pipe(writer)

    await new Promise(resolve => setTimeout(resolve, 1000));
  }
})
