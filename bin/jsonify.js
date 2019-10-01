const yaml = require('js-yaml')
const fs  = require('fs')
const input = process.argv[2]; 
try {
  const doc = yaml.safeLoad(fs.readFileSync(input, 'utf8'))
  console.log(JSON.stringify(doc))
} catch (e) {
  console.log(e)
}
