const fs = require('fs');
const puppeteer = require('puppeteer');
const id = '327007';
const url = `https://www.strava.com/clubs/${id}`;
const output = `leaderboard/${id}.html`;
(async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(url, {waitUntil: 'networkidle2'})
  let leaderboard = await page.evaluate(() => document.body.querySelector('.leaderboard').outerHTML)
  console.log(leaderboard)
  fs.writeFile(output, leaderboard, console.log)
  await browser.close()
})();
