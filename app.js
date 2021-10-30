const express = require('express');
const path = require('path');
const app = express();
const localeDb = require("localedb");

app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
});

const server = app.listen(process.env.PORT || 8080, () => {
  const { port } = server.address();
  console.log(`Server running on PORT ${port}`);
});