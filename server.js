const mongoose = require('mongoose');
const routes = require('./routes');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json()); // To parse the incoming requests with JSON payloads
app.use(cors());
app.use(routes);




mongoose.connect('mongodb+srv://omri:987987@cluster0.rrpys.mongodb.net/omri-db?retryWrites=true&w=majority')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));



const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
