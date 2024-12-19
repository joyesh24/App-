const express = require('express');
const http = require('http');
const request = require('request');

const app = express();
const PORT = process.env.PORT || 3000;

// প্রাথমিক লিঙ্ক
const M3U8_URL = 'http://tv.dugdugilive.com:8080/0ne$ky23/sonysix/index.m3u8';

// CORS ইস্যু সমাধান
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  next();
});

// মূল প্রক্সি রুট
app.get('/stream.m3u8', (req, res) => {
  request(M3U8_URL)
    .on('error', (err) => {
      console.error(err);
      res.status(500).send('Error retrieving stream.');
    })
    .pipe(res);
});

// সার্ভার চালু করুন
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
