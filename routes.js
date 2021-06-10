const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

// Serve only the static files form the dist directory
router.use(express.static(__dirname + '/dist/project'));

router.get('/', function(req,res) {
    
res.sendFile(path.join(__dirname+'/dist/project/index.html'));
});

const Product = mongoose.model('Product', new mongoose.Schema({
  productName : String,
  productPrice : Number,
  productImage: String
}),'Products');

const Order = mongoose.model('Order', new mongoose.Schema({
  orderDetails : Array
  
}),'Orders');


router.get('/', async (req, res) => {
  const products = await Product.find();
  res.send(products);
});

router.get('/my-orders', async (req, res) => {
  const orders = await Order.find();
  res.send(orders);
});

router.post('/', async (req, res) => {
  let product = new Product({ productName: 'Tomatoes', productPrice:'10', productImage: 'https://images.pexels.com/photos/1367243/pexels-photo-1367243.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' });
  genre = await product.save();
  res.send(genre);
});

router.post('/my-orders', async (req, res) => {
  let orderDetailsArray=[{"productName": "Ready", "qty": 21, },{ "productName": "dssd", "qty": 455 }];
  let product = new Order({ orderDetails: orderDetailsArray });
  genre = await product.save();
  res.send(genre);
});

router.put('/:id', async (req, res) => {
 // const { error } = validateGenre(req.body); 
  //if (error) return res.status(400).send(error.details[0].message);

  const genre = await Product.findByIdAndUpdate(req.params.id, { name: req.body.name }, {
    new: true
  });

  if (!genre) return res.status(404).send('The genre with the given ID was not found.');
  
  res.send(genre);
});

router.delete('/:id', async (req, res) => {
  const genre = await Product.findByIdAndRemove(req.params.id);

  if (!genre) return res.status(404).send('The genre with the given ID was not found.');

  res.send(genre);
});

router.get('/:id', async (req, res) => {
  const genre = await Product.findById(req.params.id);

  if (!genre) return res.status(404).send('The genre with the given ID was not found.');

  res.send(genre);
});



module.exports = router;