const express = require('express')
const router = express.Router()
const multer = require('multer')
//Model
const Housing = require('../models/housing')

// Set up multer storage engine
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, new Date().toISOString() + '-' + file.originalname);
    },
  });
  
  const upload = multer({ storage: storage });

// GET all products
router.get('/', async (req, res) => {
    try {
      const housings = await Housing.find({});
      res.json(housings);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  });
  
  // GET a product by ID
  router.get('/:id', async (req, res) => {
    try {
      const housing = await Housing.findById(req.params.id);
      if (housing) {
        res.json(housing);
      } else {
        res.status(404).json({ error: 'Housing Land not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  });
  
  // POST a new product
  router.post('/', upload.array('images'), async (req, res) => {
    try {
      const housing = new Housing({
        title: req.body.title,
        type: req.body.type,
        city: req.body.city,
        village_or_quartar: req.body.village_or_quartar,
        phone: req.body.phone,
        details: req.body.details,
        area: req.body.area,
        post_time : req.body.post_time,
        price: req.body.price,
        images: req.files.map((file) => ({
          data: file.buffer,
          contentType: file.mimetype,
        })),
      });
      await housing.save();
      res.status(201).json({ message: 'Housing created successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  });
  
  
  // Update a project by id
  router.put('/:id', upload.array('images', 5), async (req, res) => {
    try {
      const housing = await Housing.findById(req.params.id);
      if (!housing) {
        return res.status(404).send('Housing Land not found');
      }
      
      // Update title, description, category fields if provided
      if (req.body.title) {
        housing.title = req.body.title;
      }
      if (req.body.type) {
        housing.type = req.body.type;
      }
      if (req.body.city) {
        housing.city = req.body.city;
      }
      if (req.body.village_or_quartar) {
        housing.village_or_quartar = req.body.village_or_quartar;
      }
      if (req.body.phone) {
        housing.phone = req.body.phone;
      }
      if (req.body.details) {
        housing.details = req.body.details;
      }
      if (req.body.area) {
        housing.area = req.body.area;
      }
      if (req.body.post_time) {
        housing.post_time = req.body.post_time;
      }
      if (req.body.price) {
        housing.price = req.body.price;
      }

      // Update images array if provided
      if (req.files) {
        const images = req.files.map(file => {
          return {
            data: file.buffer,
            contentType: file.mimetype
          };
        });
        housing.images = images;
      }
  
      // Save updated project and return it
      const updatedHousing = await housing.save();
      res.send(updatedHousing);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
  });
  
  // Delete a housing land by id
  router.delete('/:id', async (req, res) => {
    try {
      const housing = await Housing.findByIdAndDelete(req.params.id);
      if (!housing) {
        return res.status(404).send('Housing Land not found');
      }
      res.send('Housing deleted successfully');
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
  });

  module.exports = router;
