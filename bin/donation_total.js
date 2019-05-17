const axios = require('axios')
const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const api = 'https://www.crowdrise.com/o/en/campaign';
const teams = ['moca-spike-150', 'moca-spike-150-ambassadors']
const profile = 'club/profile.json'

let total = 0;
let count = 0;
for (let team of teams) {
  const url = `${api}/${team}`;

  JSDOM.fromURL(url)
    .then( (dom) => {
      const html = dom.window.document.querySelector('h2.raised').innerHTML;
      const amount = html.replace(/\$/, '').replace(/,/, '');
      total += parseInt(amount);
      count++;
      if( count > 1 ) {
        console.log(JSON.stringify({amount: total}));
      }
    })
   .catch((error) => { console.log(error) })
}

