const router = require('express').Router();
const productModel = require('../model/product');
const jwt = require("jsonwebtoken");

// Get list of products products
router.get('/', (req, res, next) => {
  try{
  // const queryPage = req.query.page;
  //     const pageSize = 5;
  let tokenRecieved = req.headers.authorization.split(" ")[1];
  let decoded = jwt.verify(tokenRecieved, "secret");

  req.decoded = decoded;
  let Products = [];
  productModel.find()
    // .sort({price: -1})
    // .skip((queryPage -1) * pageSize)
    // .limit(pageSize)
    .then((result) => {
      result.map((item) => {
        let data = {
          _id: item.id,
          name: item.name,
          description: item.description,
          image: item.image,
          price: item.price
        };

        Products.push(data)
      });

      res.status(200).json(Products);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: 'Error in fetching Products' });
    })
  } catch(err){
    res.status(500).json({ message: 'Token Expired' });
    
  }
});

// Get single product
router.get('/:id', (req, res, next) => {
  try{
  let tokenRecieved = req.headers.authorization.split(" ")[1];
  let decoded = jwt.verify(tokenRecieved, "secret");

  req.decoded = decoded;
  productModel.findById({ _id: req.params.id })
    .then((product) => {
      res.status(200).json(product);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: 'Error in fetching details' });
    })
  } catch(err){
    res.status(500).json({ message: 'Token Expired' });
    
  }
});

// Add new product
// Requires logged in user
router.post('', (req, res, next) => {
  try{
  let tokenRecieved = req.headers.authorization.split(" ")[1];
  let decoded = jwt.verify(tokenRecieved, "secret");

  req.decoded = decoded;
  const newProduct = {
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    image: req.body.image
  };

  productModel
    .create(newProduct)
    .then((result) => {
      res.status(200).json({ message: 'Product Added' });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: 'Error in add in Product' });
    })
  } catch(err){
    res.status(500).json({ message: 'Token Expired' });
    
  }
});

// Edit existing product
// Requires logged in user
router.patch('/:id', (req, res, next) => {
  try{
    let tokenRecieved = req.headers.authorization.split(" ")[1];
  let decoded = jwt.verify(tokenRecieved, "secret");

  req.decoded = decoded;
  const updatedProduct = {
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    image: req.body.image
  };
  productModel.findByIdAndUpdate({ _id: req.params.id }, updatedProduct)
    .then(() => {
      res.status(200).json({ message: 'Product updated' });
    })
    .catch(() => {
      res.status(500).json({ message: 'Error in updating Product' });
    })
  } catch(err){
    res.status(500).json({ message: 'Token Expired' });
    
  }
});

// Delete a product
// Requires logged in user
router.delete('/:id', (req, res, next) => {
  try{
    let tokenRecieved = req.headers.authorization.split(" ")[1];
  let decoded = jwt.verify(tokenRecieved, "secret");

  req.decoded = decoded;
  productModel.findByIdAndDelete({ _id: req.params.id })
    .then(() => {
      res.status(200).json({ message: 'Product deleted' });
    })
    .catch(() => {
      res.status(500).json({ message: 'Error in deleting Product' });
    })
  } catch(err){
    res.status(500).json({ message: 'Token Expired' });
    
  }
});

module.exports = router;
