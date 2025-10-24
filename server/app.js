import express from 'express'; // express 모듈을 가져오기
import axios from 'axios';
import cors from 'cors';
import { corsConfig } from './configs/cors.config.js';

const app = express();
const port = 3000;

app.use(cors(corsConfig));

app.get(/^\/openAPI\/.*/, async (req, res) => {
  try {
    const url = req.url.replace('/openAPI', '');
    const response = await axios.get(`http://openAPI.seoul.go.kr:8088${url}`);
    res.send(response.data);
  } catch (error) {
    res.status(error.response ? error.response.status : 500).send(error.message);
  }
});

app.get(/^\/swopenAPI\/api\/subway\/.*/, async (req, res) => {
  try {
    const url = req.url.replace('/swopenAPI', '');
    const response = await axios.get(`http://swopenAPI.seoul.go.kr${url}`);
    res.send(response.data);
  } catch (error) {
    res.status(error.response ? error.response.status : 500).send(error.message);
  }
});

app.listen(port, () => {
  console.log(`Proxy server listening at http://localhost:${port}`);
});
