import express from 'express'; // express 모듈을 가져오기
import axios from 'axios';
import cors from 'cors';
import multer from 'multer';
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


// form data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.post(/^\/seoulmetro\/.*$/, multer().none(), async (req, res) => {
  try {
    const url = req.url.replace('/seoulmetro', '');
    const options = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Accept': 'application/xml, text/xml, */*; q=0.01',
        'Accept-Language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
        'X-Requested-With': 'XMLHttpRequest'
      }
    }
    const response = await axios.post(
      `http://www.seoulmetro.co.kr${url}`,
      req.body,
      options
    );

    res.status(response.status ? response.status : 200).send(response.data);
  } catch (error) {
    console.log(error);
    res.status(error.response ? error.response.status : 500).send(error.message);
  }
});

app.listen(port, () => {
  console.log(`Proxy server listening at http://localhost:${port}`);
});
