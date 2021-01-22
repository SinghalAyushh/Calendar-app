let mongoose = require('mongoose'),
  express = require('express'),
  router = express.Router();
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
let path = require('path');



  const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'images');
    },
    filename: function(req, file, cb) {   
        cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if(allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}
let upload = multer({ storage, fileFilter });
let eventSchema = require('./event');
router.route('/create-event').post(upload.single('image_url'), (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const image_url = req.file.filename;
  const start_date = req.body.start_date;
  const end_date = req.body.end_date;

  const newEventData = {
     title,
     description,
     image_url,
     start_date,
     end_date
  }

  const newEvent = new eventSchema(newEventData );

  newEvent.save()
         .then(() => res.json('Event Added'),console.log('event added'))
         .catch(err => res.status(400).json('Error: ' + err));
});

// READ events
router.route('/').get((req, res) => {
  eventSchema.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get Single event
router.route('/edit-event/:id').get((req, res) => {
  eventSchema.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})


// Update event
router.route('/update-event/:id').put(upload.single('image_url'),(req, res, next) => {
  eventSchema.findByIdAndUpdate(req.params.id).then((events)=>{

    events.image_url= req.file.filename
    events.title= req.body.title
    events.description= req.body.description
    events.start_date = req.body.start_date;
    events.end_data = req.body.end_data;

    events.save().then(()=>res.json("Event updated"))
    .catch(err => res.status(400).json('Error: ' + err));
  }).catch(err => res.status(400).json('Error: ' + err));


})

// Delete event
router.route('/delete-event/:id').delete((req, res, next) => {
  eventSchema.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

module.exports = router;