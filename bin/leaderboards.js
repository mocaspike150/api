const axios = require('axios')
const fs = require('fs');
const { spawn } = require('child_process');
const api = 'https://www.mocaspike150.org/api';
const profile = 'club/profile.json';


axios.get(`${api}/${profile}`)
  .then( (res) => {
    let profile_data = res.data;
    for( id in profile_data) {
       const test = spawn('node', ['bin/leaderboard.js', id])
       const fn = `leaderboard/${id}.txt`;
       test.stdout.on('data', (data) => {
         fs.writeFile(fn, `${data}`, (error) => {
           if(error) { console.log(error) }
             else { console.log(fn) }
           });
       });
    }
  })
  .catch((error) => { console.log(error) });

