const axios = require('axios')
const fs = require('fs')
const api = 'https://www.mocaspike150.org/api'

const feature = (d) => ({
  "type": "Feature",
  "geometry": {
    "type": "Point",
    "coordinates": [
      d[0],
      d[1]
    ]
  }
})

const build = (path) => {

  axios.get(`${api}/${path}`)
  .then( (res) => {
    let data = res.data
    for( k in data) {
      let geojson = {
        "type": "FeatureCollection",
        "features": data[k].map(feature) 
      }
      let output = JSON.stringify(geojson)
      let fn = `map/club/${k}.geojson`
      console.log(fn)
      fs.writeFile(`map/club/${k}.geojson`, output, () => {})
    }
  })
  .catch((error) => {
    console.log(error)
  });
}

build('map/club/geo.json')
