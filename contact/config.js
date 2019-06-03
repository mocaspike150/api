let config = {}

config.mailer = {
  service: 'gmail',
  auth: {
    user: `${process.env.from}`,
    pass: `${process.env.xxx}`
  },
  mailOptions : (data) => ({
    from: `Moca Spike 150 bot 🤖 <${process.env.from}>`,
    to: `${process.env.to}`, 
    subject: 'Contact Form from mocaspike150',
    html: `
    <html>
    <p>Hi Renny, </p>
    <p>
    Someone had sent your a message via <a href="https://mocaspike150.github.io/contact/">https://mocaspike150.github.io/contact/</a>.
    </p>
    <dl style="background: #FFF7ED;padding: 1em;">
      <dt>First</dt>
      <dd>${data[0].first}</dd>
      <dt>Last</dt>
      <dd>${data[0].last}</dd>
      <dt>Email</dt>
      <dd>${data[1]}</dd>
      <dt>Message</dt>
      <dd>${data[2]}</dd>
    </dl>
    <p>
    <p>Yours,</p>
    <p>Moca Spike 150 bot 🤖 </p>
    `
  }),
  redirect: `https://mocaspike150.github.io/contact/thankyou`
}

module.exports = config;
