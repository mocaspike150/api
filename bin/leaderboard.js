const fs = require('fs');
const puppeteer = require('puppeteer');

const leaderboard = (id) => {
  let url = `https://www.strava.com/clubs/${id}`;
  let text_output = `leaderboard/${id}.text`;
  let html_output = `leaderboard/${id}.html`;
  (async () => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(url, {waitUntil: 'networkidle2'})
    let text = await page.evaluate(() => document.body.querySelector('.leaderboard').innerText)
    let html = await page.evaluate(() => document.body.querySelector('.leaderboard').innerHTML)
    fs.writeFile(text_output, text, (error) => { if(!error) { console.log(text_output) } else { console.log(error) } })
    fs.writeFile(html_output, html, (error) => { if(!error) { console.log(html_output) } else { console.log(error) } })
  await browser.close()
 })();
};

leaderboard('241951');
leaderboard('327007');
