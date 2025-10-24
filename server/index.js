
const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

app.get(/^\/openAPI\/.*/, async (req, res) => {
  try {
    const url = req.url.replace('/openAPI', '');
	  console.log(url);
    const response = await axios.get(`http://openAPI.seoul.go.kr:8088${url}`);
    res.send(response.data);
  } catch (error) {
    res.status(error.response ? error.response.status : 500).send(error.message);
  }
});

app.get(/^\/swopenAPI\/.*/, async (req, res) => {
  try {
    const url = req.url.replace('/swopenAPI', '');
	  console.log(url);
    const response = await axios.get(`http://swopenAPI.seoul.go.kr/api/subway${url}`);
    res.send(response.data);
  } catch (error) {
    res.status(error.response ? error.response.status : 500).send(error.message);
  }
});

app.listen(port, () => {
  console.log(`Proxy server listening at http://localhost:${port}`);
});
