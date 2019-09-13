global.fetch = require('node-fetch')
let output = `start: 2019-10-28                                     
end: 2019-11-03
phase: 3
teams:`

let api = 'https://www.mocaspike150.org/donation/data/clubs.json'
fetch(api).then(res => res.text())
  .then( json => {
     const data = JSON.parse(json)
     let club_list = []
     for(const k in data) {
       if (k != '5337023') {
         club_list.push([k, data[k].amount])
       }
     }
     fetch('https://www.mocaspike150.org/api/club/profile.json').then(res => res.text())
       .then(json => {
          const profile = JSON.parse(json)
          let counter = 0;
          for(const club of club_list.sort((x, y) => (x[1] < y[1] ? 1 : -1))) {
            if(counter++ < 10) {
            let crowdrise_id = `${club[0]}`
            let name = ''
            let id = ''
            for(const k in profile) {
               if(profile[k]['crowdrise_id'] == crowdrise_id) {
                  name = profile[k]['en']
                  id = profile[k]['id']
               }
            }
          output += `
  - 
    id: ${id}
    mile: 0
    name: "${name}"`
          }
       }
       console.log(output)
     })
     .catch( err => { console.log(err) })
  })
  .catch( err => { console.log(err) })

