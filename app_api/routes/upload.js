const express = require('express');
const router = express.Router();
const fs = require('fs');

multer  = require('multer')
upload = multer({ dest: 'uploads/' }).single('file');



router.post('/', (req, res) => {

    upload(req, res, (err) => {
        if (err) {
            // handle err
        } else {
            res.json(req.file);
        }
    })

    
});

router.get('/:fileName', (req, res) => {
    let fileName = req.params.fileName;
    var file = './uploads/' + fileName;
    console.log(file);
    res.download(file); // Set disposition and send it.
})

router.delete('/:fileName', (req, res) => {
    let fileName = req.params.fileName;
    var file = './uploads/' + fileName;
    fs.unlinkSync(file, function(error) {
        if (error) {
            throw error;
        }
        console.log('fileName');
    })
})

module.exports = router;