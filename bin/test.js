const axios = require('axios')
const api = 'https://www.mocaspike150.org/api'
const path = 'club/list.json'

const test = (path) => {

  axios.get(`${api}/${path}`)
  .then( (res) => {
    console.log(`Test ${path}`)
    console.log(res)
  })
  .catch((error) => {
    console.log(error)
  });
}

[
	'club/list.json', 
	'club/id.json',
	'club/72363.json'
].forEach(test)
