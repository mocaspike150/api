const { parse } = require('url');
const https  = require('https');
const body = `
<h1>Thank you for contacting us</h1>
We will get back to you as soon as possible
`
module.exports = (req, res) => {
  res.end(body);
};
