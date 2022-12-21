const express = require("express");
const bodyParser = require("body-parser");
const axios = require('axios');

const { client_id, redirect_uri, client_secret } = require("./config");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.json({ type: "text/*" }));
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.post("/authenticate", (req, res) => {

  const { code } = req.body;

  const data = {
    client_id: client_id,
    client_secret: client_secret,
    code: code,
    redirect_uri: redirect_uri
  }

  // Request to exchange code for an access token
  axios.post(`https://github.com/login/oauth/access_token`, data)
    .then((response) => {
      console.log(response)
      const access_token = response.data.slice(13, -29)
      return axios.get(`https://api.github.com/user`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

    })
    .then((response) => {
      return res.status(200).json(response.data);

    })
    .catch((error) => {
      console.log(error)
      return res.status(400).json(error);
    });
});

app.get("/", (req, res) => {

})

const PORT = process.env.SERVER_PORT || 5000;
app.listen(PORT, () => console.log(`Listening on ${PORT}`));