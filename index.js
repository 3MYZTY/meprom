const express = require('express');
const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const mime = require('mime');
const axios = require('axios');
const cors = require('cors'); // 添加这行

const app = express();
const port = 800;

app.use(cors()); // 使用 CORS 中间件

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use((req, res, next) => {
  const url = req.url === '/' ? '/index.html' : req.url;

  let pathname = path.join(__dirname, url);
  var ext = path.parse(pathname).ext;
  var mimeType = mime.getType(ext);

  if (ext) {
    fs.readFile(pathname, function (err, data) {
      if (err) {
        res.writeHead(500, {
          'Content-Type': 'text/plain'
        });
        res.end('Internal Server Error');
      } else {
        res.writeHead(200, {
          'content-type': `${mimeType || 'text/plain'};charset="utf-8"`,
        });
        res.write(data);
        res.end();
      }
    });
  }
});

app.post('/submit', async (req, res) => {
    console.log("try")
    const recaptchaToken = req.body['g-recaptcha-response'];

    const secretKey = '6LdYOyApAAAAAMuMqpyBlYQAJoAl5pcEFX4I2Z0k';

    try {
        const response = await axios.post('https://www.google.com/recaptcha/api/siteverify', {
            secret: secretKey,
            response: recaptchaToken,
        });

        const success = response.data.success;
        if (success) {
            console.log('reCAPTCHA verification successful!')
            res.send('reCAPTCHA verification successful!');
        } else {
            res.send('reCAPTCHA verification failed!');
        }
    } catch (error) {
        console.error('Error during reCAPTCHA verification:', error);
        res.status(500).send('Internal Server Error');
    }
});


const server = http.createServer(app);

server.listen(port, () => {
  console.log(`服务器运行在 http://localhost:${port}/`);
});
