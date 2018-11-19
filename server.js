const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules')));
app.get('/', (req, res) => res.sendFile( __dirname + "/" + "index.html" ))

app.listen(port, () => console.log(`app listening on port ${port}!`))