const mongoose = require('mongoose');
const genres = require('./routes');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(genres);
// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/project'));

app.get('/', function(req,res) {
    
res.sendFile(path.join(__dirname+'/dist/project/index.html'));
});


mongoose.connect('mongodb+srv://omri:987987@cluster0.rrpys.mongodb.net/omri-db?retryWrites=true&w=majority')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));



const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
