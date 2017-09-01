const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ silent: true });
}

require('./database/connect');

const app = express();
app.use(bodyParser.json());

const request = axios.create({
  baseURL: 'https://exp.host/--/api/v2/push',
  headers: {
    'Content-Type': 'application/json',
    'Accept-Encoding': 'gzip, deflate',
    'Accept': 'application/json'
  }
});

app.post('/notification/send', async (req, res) => {
  const { token, title, body } = req.body;
  console.log(token, title, body);

  const notification = {
    to: token,
    title,
    body,
    data: {
      text: body
    }
  };

  try {
    const response = await request.post('/send', notification);

    res.send({ data: { status: 'ok' }});
  } catch (e) {
    res.status(500).send(e);
  }
});

const server = app.listen(process.env.PORT || 8080, () => {
  const { port } = server.address();
  console.log('App now running on port %d in %s mode', port, process.env.NODE_ENV);
});
