const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const axios = require('axios');
const fs = require('fs');
const puppeteer = require('puppeteer');

const leaderboard = (week, id) => {
  const base = `leaderboard/${week}`

  if(id) {
     const data = fs.readFileSync(`${base}/${id}.html`, 'utf8')
     const fn = `${base}/${id}.json`;
     const dom = new JSDOM(data);
     const table = dom.window.document.querySelector('.leaderboard table')
     const html =  table.innerHTML
     const text =  table.textContent
     const lines = text.split('\n').filter((d) => (d.length > 0));

     let output = [[], [], [], [], [], [], []]
     let count = -6
     for (let line of lines) {
       if(count > 0) {
       for (let i of [1, 2, 3, 4, 5, 6]) {
         if(count % 7 == i) {
           output[i - 1].push(line)
         }
       }
       if(count %7 == 0) {
         output[6].push(line)
       }
       }
     count++
     }

   let leaderboard = []

   let c = 0
   for( let i in output[0] ) {
     let tmp = []
     for( let j in [1, 2, 3, 4, 5, 6, 7] ) {
       tmp.push(output[j][c])
     }
     leaderboard.push(tmp)
     c++
   }
   fs.writeFile(fn, JSON.stringify(leaderboard), (err) => {
     if (err) throw err;
     console.log(fn);
   })
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
