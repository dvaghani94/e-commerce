const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
      include: [{ model: Product }],
      attributes: {
            include: [ "product_name", "price", "stock", "category_id" ]
          }
        })
        .then(tagData => {
          if (!tagData) {
            res.status(404).json({ message: 'No tag found with that id!'});
            return;
        }
        res.json(tagData);
      })
        .catch (err => {
        res.status(500).json(err);
      })
    });

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findbyPk(req.params.id, {
      include: [{ model: Product }],
      attributes: {
        include: [ "id", "product_name", "price", "stock", "category_id" ]
      }
    })
    .then(tagData => {
      if (!tagData) {
        res.status(404).json({ message: 'No tag found with that id!'});
        return;
    }
    res.json(tagData);
  })
    .catch (err => {
    res.status(500).json(err);
  })
});

router.post('/', (req, res) => {
  Tag.create({
      tag_name: req.body.tag_name,
    })
    .then(tagData => 
    res.json(tagData))
    .catch (err => {
    res.status(400).json(err)
  });
  // create a new tag
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update({
      where: {
        id: res.params.id
      }
    })
    .then(tagData => {
      if (!tagData) {
        res.status(404).json({ message: 'No tag found with that id!'});
        return;
    }
    res.json(tagData);
  })
    .catch (err => {
    res.status(500).json(err);
  })
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
      where: {
        id: req.params.id
      }
    })
    .then(tagData => {
      if (!tagData) {
        res.status(404).json({ message: 'No tag found with that id!'});
        return;
    }
    res.json(tagData);
  })
    .catch (err => {
    res.status(500).json(err);
  });
});

module.exports = router;
