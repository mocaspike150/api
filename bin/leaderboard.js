const axios = require('axios');
const fs = require('fs');

const puppeteer = require('puppeteer');

const leaderboard = (id) => {
  let url = `https://www.strava.com/clubs/${id}`;
  let text_output = `leaderboard/${id}.text`;
  let html_output = `leaderboard/${id}.html`;

  (async () => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    page.setDefaultTimeout(60000)

    await page.goto(url, {waitUntil: 'networkidle2'})
    let text = await page.evaluate(() => document.body.querySelector('.leaderboard').innerText)
    console.log(text)
  await browser.close()
 })();
};

leaderboard(process.argv[2])
