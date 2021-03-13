const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  try {
    const allCatergoryData = await Category.findAll({
      include: [{ model: Product }],
      attributes: {
        include: [ "id", "product_name", "price", "stock", "category_id" ]
      }
    });
    
    res.status(200).json(allCatergoryData);
  } catch (err) {
    res.status(500).json(err);
  }
  // find all categories
  // be sure to include its associated Products
});

router.get('/:id', (req, res) => {
  try {
    const allCatergoryData = await Category.findbyPk(req.params.id, {
      include: [{ model: Product }],
      attributes: {
        include: [ "id", "product_name", "price", "stock", "category_id" ]
      }
    })

    if (!allCatergoryData) {
      res.status(404).json({ message: 'No category found with that id!'});
      return;
    }

    res.status(200).json(allCatergoryData);
  } catch (err) {
    res.status(500),json(err);
  }
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', (req, res) => {
  try {
    const productData = await Category.create({
      category_name: req.body.category_name,
    });

    res.status(200).json(productData);
  } catch (err) {
    res.status(400).json(err)
  }
  // create a new category
});

router.put('/:id', (req, res) => {
  try {
    const productData = await Category.update({
      where: {
        id: res.params.id
      }
    });

    if (!productData) {
      res.status(404).json({ message: 'No product found with this id!' });
      return;
    }

    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  try {
    const productData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!productData) {
      res.status(404).json({ message: 'No product found with this id!' });
      return;
    }

    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
  // delete a category by its `id` value
});

module.exports = router;
