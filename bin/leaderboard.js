const axios = require('axios');
const fs = require('fs');

const puppeteer = require('puppeteer');


const leaderboard = (id) => {
  let url = `https://www.strava.com/clubs/${id}`;
  let text_output = `leaderboard/${id}.text`;
  let html_output = `leaderboard/${id}.html`;
  console.log(`leaderboard(${id})`);

  (async () => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    page.setDefaultTimeout(60000)

    await page.goto(url, {waitUntil: 'networkidle2'})
    let text = await page.evaluate(() => document.body.querySelector('.leaderboard').innerText)
    let html = await page.evaluate(() => document.body.querySelector('.leaderboard').innerHTML)
    fs.writeFile(text_output, text, (error) => { if(!error) { console.log(text_output) } else { console.log(error) } })
    fs.writeFile(html_output, html, (error) => { if(!error) { console.log(html_output) } else { console.log(error) } })
  await browser.close()
 })();
};


axios.get('https://www.mocaspike150.org/api/club/profile.json')
  .then( (res) => {
    let data = res.data
    let keys = Object.keys(data).slice(0, 5);
    console.log(data)
    let index = '<ol>';
    for( let id of keys) {
      index += `
        <li><a href="${id}.html">Leaderboard for ${data[id].en}</a></li>
        `;
      leaderboard(id);
    }
    index += '</ol>';
    fs.writeFile('leaderboard/index.html', index, (error) => { if(!error) { console.log(index) } else { console.log(error) } });
  })
  .catch((error) => {
  });
