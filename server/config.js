const path = require("path");

require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const config = {
  client_id: 'af42d609288a6b924c99',
  redirect_uri: 'http://localhost:3000/login',
  client_secret: '028aa0e1b794c0f8a43128bf6d06e63905d804d3',
  proxy_url: 'http://localhost:5000/authenticate'
};

module.exports = config;