const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Product = mongoose.model('Product', new mongoose.Schema({
  productName : String,
  productPrice : Number,
  productImage: String
}),'Products');

const Order = mongoose.model('Order', new mongoose.Schema({
  orderDetails : Array
  
}),'Orders');

// Serve only the static files form the dist directory
router.use(express.static(__dirname + '/dist/project'));

router.get('/', function (req, res) {
  res.sendFile(__dirname+'/dist/Project/index.html');
});
router.get('/orders', function (req, res) {
  res.sendFile(__dirname+'/dist/Project/index.html');

});
router.get('/cart', function (req, res) {
  res.sendFile(__dirname+'/dist/Project/index.html');
});

router.get('/list', async (req, res) => {
  const products = await Product.find().sort( { _id : -1});
 res.json(products);

});

router.get('/my-orders', async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
});

router.post('/add', async (req, res) => {
  //let product = new Product({ productName: 'Tomatoes', productPrice:'10', productImage: 'https://images.pexels.com/photos/1367243/pexels-photo-1367243.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' });
 let product = new Product(req.body);
 genre = product.save().then(() => {
  //console.log(stud);        
  res.status(200).json({'students' : 'Student added successfuly!'});
}).catch(err => {
  //console.log(err);
  res.status(400).send('Unable to add!');        
});
});
  // res.send(genre);


router.post('/add-order', async (req, res) => {
  //let orderDetailsArray=[{"productName": "Ready", "qty": 21, },{ "productName": "dssd", "qty": 455 }];
   obj = new Order({ orderDetails: req.body });
  console.log(obj);
  order = new Order(obj);
  result =  order.save().then(() => {
    res.status(200).json({'students' : 'Student added successfuly!'});
  }).catch(err => {
    res.status(400).send('Unable to add!');        
  });
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
