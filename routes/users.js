var express = require('express');
var router = express.Router();
var youtubeStream = require('youtube-audio-stream')
var fs = require('fs');
 


/* GET users listing. */
router.get('/', function(req, res, next) {
  var requestUrl = 'https://www.youtube.com/watch?v=amYeSaYkSWg'
  var writeStream = fs.createWriteStream('./output.wav');
  try {
    youtubeStream(requestUrl).pipe(writeStream)
    res.send('save success')
  } catch (exception) {
    res.status(500).send(exception)
  }
});

module.exports = router;
