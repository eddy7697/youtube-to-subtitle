var express = require('express');
var router = express.Router();
var youtubeStream = require('youtube-audio-stream')
var fs = require('fs');
 


/* GET users listing. */
router.get('/', function(req, res, next) {
  var requestUrl = 'https://www.youtube.com/watch?v=47JiyRa4kog'
  var writeStream = fs.createWriteStream('./output.mp3');
  try {
    
    youtubeStream(requestUrl).pipe(writeStream)

    writeStream.on('finish', function () { 
      res.send('save success')
    });
    // res.send('save success')
  } catch (exception) {
    res.status(500).send(exception.message)
  }
});

module.exports = router;
