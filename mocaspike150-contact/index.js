const util = require('util');
const https  = require('https');
const body = `
<h1>Thank you for contacting us</h1>
We will get back to you as soon as possible
`

let config = {};

config.mailer = {
  service: 'gmail',
  auth: {
    user: process.env.USER,
    pass: process.env.PASS
  },
  mailOptions : (data) => ({
    from: `Moca Spike 150 bot 🤖 <${process.env.USER}>`,
    to: process.env.TO,
    subject: 'Contact Form from mocaspike150',
    html: `
    <html>
    <p>Hi Renny, </p>
    <p>
    Someone had sent your a message via <a href="https://www.mocaspike150.org/contactus/">www.mocaspike150.org/contactus/</a>.
    </p>
    <dl style="background: #FFF7ED;padding: 1em;">
      <dt>First</dt>
      <dd>${data[0].first}</dd>
      <dt>Last</dt>
      <dd>${data[0].last}</dd>
      <dt>Email</dt>
      <dd>${data[1]}</dd>
      <dt>Message</dt>
      <dd><pre>${data[2]}</pre></dd>
    </dl>
    <p>
    <p>Yours,</p>
    <p>Moca Spike 150 bot 🤖 </p>
    `
  }),
  redirect: `https://www.mocaspike150.org/contact/thankyou`
}

const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport(config.mailer);

module.exports = async (req, res) => {

  let body = [];
  req.on('data', (chunk) => {
    body.push(chunk);
  }).on('end', () => {

    body = Buffer.concat(body).toString();


    const separator = body.trim().split('\n')[0].trim()
    const parts = body.split(separator)
      .map(part => part.trim()).filter(part => part !== '' && part !== '--')
      .map( (d) => (d.split('\r\n\r\n').splice(1).join('\n')))
    const data = [
      {
        "first": parts[0],
        "last": parts[1]
      }, 
      parts[2],
      parts[3]
    ];

    transporter.sendMail(config.mailer.mailOptions(data), (err, info) => {
      if(err) { console.log(err) }
      else { console.log(info); }
      res.writeHead(302, {
        'Location': config.mailer.redirect
     });
      res.end();
  });
 })
}
