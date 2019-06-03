global.fetch = require('node-fetch')
const d3 = require('d3')
const fs = require('fs');
const jsdom = require('jsdom')
const sharp = require('sharp')
const { JSDOM } = jsdom
const api = 'https://www.mocaspike150.org/api'
const profile = 'club/profile.json'

const members = (id) => {
  let url = `https://www.strava.com/clubs/${id}`;
  JSDOM.fromURL(url)
    .then( (dom) => {
      const members = dom.window.document.querySelector('.club-members h3').innerHTML.replace(/\n/g, '').replace('members', '');
      console.log(`${id}: ${members}`)
  })
  .catch((error) => { console.log(error) })
}

d3.json(`${api}/${profile}`)
  .then( (profile_data) => {
    for( k in profile_data) {
      members(k)
    }
  })
  .catch((error) => { console.log(error) });

