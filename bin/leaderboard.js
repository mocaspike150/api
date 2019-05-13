const axios = require('axios');
const fs = require('fs');
const puppeteer = require('puppeteer');

const leaderboard = (week, id) => {
  const base = `leaderboard/${week}`

  if(id) {
    const url = `https://www.strava.com/clubs/${id}`;
    const output = `${base}/${id}.json`;

    (async () => {
      const browser = await puppeteer.launch()
      const page = await browser.newPage()
      page.setDefaultTimeout(60000)

      await page.goto(url, {waitUntil: 'networkidle2'})
      const text = await page.evaluate(() => document.body.querySelector('.leaderboard').innerText)
      const lines = text.split('\n').filter((d) => (d.match(/km/)))
      let data = []
      for(let line of lines) {
        data.push(line.split('\t'))
      }
      fs.writeFile(output, JSON.stringify(data), (err) => {
        if (err) throw err;
        console.log(output);
      })
    
      await browser.close()
   })();
  }
  else {
    let data = { };
    const output = 'leaderboard.json'
    fs.readdirSync(base).forEach((input) => {
      if(/[0-9].json/.test(input))  {
        const key = input.split('.')[0]
        console.log(key)
        data[key] = JSON.parse(fs.readFileSync(`${base}/${input}`, 'utf8'))
      }
    });
    fs.writeFile(`${base}/${output}`, JSON.stringify(data), (err) => {
        if (err) throw err;
        console.log(output);
    });
  }
};

leaderboard(process.argv[2], process.argv[3])
