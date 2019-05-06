const axios = require('axios')
const fs = require('fs');
const jsdom = require('jsdom');
const sharp = require('sharp');
const { JSDOM } = jsdom;
const api = 'https://www.mocaspike150.org/api'
const profile = 'club/profile.json'

const avatar = (id, logo) => {
  const fn = `_data/club/avatar/${id}.yml`;
  if(logo) {
    axios.get(logo, { responseType: 'arraybuffer' })
      .then( (response) => {
        const data = response.data;
        const buffer = Buffer.from(data, 'binary');
        sharp(buffer).resize({ width: 128, height: 128 })
          .toBuffer()
          .then( (data) => {
             const src = `data:image/png;base64,${data.toString('base64')}`
             fs.writeFile(fn, JSON.stringify({ src: src }), (error) => {
               if(error) { console.log(error) }
               else { console.log(fn) }
             });
           })
          .catch((error) => { console.log(errorr) });
       })
       .catch((error) => { console.log(errorr) });
  }
  else {
    let url = `https://www.strava.com/clubs/${id}`;
    JSDOM.fromURL(url)
      .then( (dom) => {
        const src = dom.window.document.querySelector('img.avatar-img').src;
        axios.get(src, { responseType: 'arraybuffer' })
         .then( (response) => {
           const data = response.data;
           const buffer = Buffer.from(data, 'binary');
           sharp(buffer).resize({ width: 128, height: 128 })
             .toBuffer()
             .then( (data) => {
                const src = `data:image/png;base64,${data.toString('base64')}`
                fs.writeFile(fn, JSON.stringify({ src: src }), (error) => {
                  if(error) { console.log(error) }
		          else { console.log(fn) } 
			    });
              })
             .catch((error) => { console.log(errorr) });
         })
         .catch((error) => {
           console.log(error.response.data)
         })
      })
      .catch((error) => { console.log(error) });
  }
}

axios.get(`${api}/${profile}`)
  .then( (res) => {
    let profile_data = res.data;
    for( k in profile_data) {
      if(profile_data[k].logo) {
        avatar(k, profile_data[k].logo)
      }
      else {
        avatar(k)
      }
    }
  })
  .catch((error) => { console.log(error) });

