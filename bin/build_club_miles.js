const axios = require('axios')
const fs = require('fs');
const { spawn } = require('child_process');
const api = 'https://www.mocaspike150.org/api';
const profile = 'club/profile.json';

axios.get(`${api}/${profile}`)
  .then( (res) => {
    let profile_data = res.data;
    for( id in profile_data) {
       const test = spawn('node', ['bin/club_miles.js', id])
       const fn = `_data/club/miles/${id}.yml`;
       test.stdout.on('data', (data) => {
         fs.writeFile(fn, `${data}`, (error) => {
           if(error) { console.log(error) }
             else { console.log(fn) }
           });
       });
    }
  })
  .catch((error) => { console.log(error) });

