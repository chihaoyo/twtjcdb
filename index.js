const Entities = require('html-entities').AllHtmlEntities
const entities = new Entities()
const axios = require('axios')

let baseURL = 'https://twtjcdb.tjc.gov.tw'

let pageCount = 101

for(let p = 1; p <= pageCount; p++) {
  let params = {
    cd: '死刑',
    n: p
  }
  axios.get(baseURL + '/Search/S', { params }).then(response => {
    let html = response.data
    let regex = /<img.+alt="([^"]+)照片".+src="([^"]+)".+>/g
    let matches = html.matchAll(regex)
    for(let match of matches) {
      let name = entities.decode(match[1])
      let url = match[2]
      console.log(name + '\t' + url)
    }
  }).catch(error => {
    console.error(error)
  })
}
