const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

multer  = require('multer')

    
    

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {

        cb(null,  file.originalname );
  
    },
    
  })

upload = multer({ storage: storage, 
    fileFilter: function (req, file, cb) {
        var filetypes = /pdf|PDF/;
        var mimetype = filetypes.test(file.mimetype);
        var extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    
        if (mimetype && extname) {
          return cb(null, true);
        }
        cb("Error: File upload only supports the following filetypes - " + filetypes);
    } 
});

router.post('/', upload.single('file'), (req, res) => {
    
    

    console.log(req.file)
    res.json(req.file);
    
});

router.get('/:fileName', (req, res) => {
    let fileName = req.params.fileName;
    var file = './uploads/' + fileName;
    console.log(file);
    res.download(file, 'cv.pdf'); // Set disposition and send it.
})

router.delete('/:fileName', (req, res) => {
    let fileName = req.params.fileName;
    var file = './uploads/' + fileName;
    fs.unlinkSync(file, function(error) {
        if (error) {
            console.log('fileName');
        }
        console.log('fileName');
    })
})

module.exports = router;