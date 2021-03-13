const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  Category.findAll({
      include: [{ model: Product }],
      attributes: {
        include: [ "id", "product_name", "price", "stock", "category_id" ]
      }
    })
    .then(allCatergoryData => {
      if (!allCatergoryData) {
        res.status(404).json({ message: 'No category found with that id!'});
        return;
    }
    res.json(allCatergoryData);
  }) 
  .catch (err => {
    res.status(500).json(err);
  });
  // find all categories
  // be sure to include its associated Products
});

router.get('/:id', (req, res) => {
  Category.findbyPk(req.params.id, {
      include: [{ model: Product }],
      attributes: {
        include: [ "id", "product_name", "price", "stock", "category_id" ]
      }
    })
    .then(allCatergoryData => {
      if (!allCatergoryData) {
        res.status(404).json({ message: 'No category found with that id!'});
        return;
    }
    res.json(allCatergoryData);
  })
  .catch (err => {
    res.status(500),json(err);
  });
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', (req, res) => {
  Category.create({
      category_name: req.body.category_name,
    })
    .then(productData =>
      res.json(productData))
    .catch (err => {
    res.status(400).json(err);
  });
  // create a new category
});

router.put('/:id', (req, res) => {
  Category.update({
      where: {
        id: res.params.id
      }
    })
    .then(productData => {
    if (!productData) {
      res.status(404).json({ message: 'No product found with this id!' });
      return;
    }

    res.json(productData);
  })
   .catch (err => {
    res.status(500).json(err);
  });
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  Category.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(productData => {
        if (!productData) {
          res.status(404).json({ message: 'No product found with this id!' });
          return;
        }
    
        res.json(productData);
      })
       .catch (err => {
        res.status(500).json(err);
      });
  // delete a category by its `id` value
});

module.exports = router;
