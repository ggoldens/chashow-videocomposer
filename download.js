var http = require('http');
var fs = require('fs');

var download = function (url, dest, cb) {
  console.log('Begin - Downloading the file ' + url);
  
  var file = fs.createWriteStream(dest);
  var request = http.get(url, function(response) {
        response.pipe(file);
        file.on('finish', function() {
          file.close(cb);
        });
  });
};


module.exports = download;

