const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Product = mongoose.model('Product', new mongoose.Schema({
  productName : String,
  productPrice : Number,
  productImage: String,
  categoryName: String
}),'Products');

const Order = mongoose.model('Order', new mongoose.Schema({
  orderDetails : Array,
  orderTotalPrice: Number
  
}),'Orders');

// Serve only the static files form the dist directory
router.use(express.static(__dirname + '/dist/project'));

router.get('/', function (req, res) {
  res.sendFile(__dirname+'/dist/project/index.html');
});
router.get('/orders', function (req, res) {
  res.sendFile(__dirname+'/dist/project/index.html');

});
router.get('/cart', function (req, res) {
  res.sendFile(__dirname+'/dist/project/index.html');
});


router.get('/list', async (req, res) => {
  const products = await Product.find().sort( { _id : -1});
 res.json(products);

});

router.get('/my-orders', async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
});

router.get('/find-order/:id', async (req, res) => {
   const genre = await Order.findOne({ _id: req.params.id });   
   res.json(genre);
 });


router.get('/find-product/:id', async (req, res) => {
   const genre = await Product.findOne({ _id: req.params.id });   
   res.json(genre);
 });

router.post('/add', async (req, res) => {
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
   obj = new Order({ orderDetails: req.body.items,  orderTotalPrice: req.body.totalOrderPrice});
  //order = new Order(obj);
  result =  obj.save().then(() => {
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
