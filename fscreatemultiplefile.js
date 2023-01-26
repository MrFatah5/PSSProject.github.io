var fs = require('fs');
var inputFolder = "input/";
var outputFolder = "output/";
var https = require("https");

var key = "WotZ46HnxPl_HwpT3uZjtY_0f8fMEiSR";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

var options = require("url").parse("https://api.tinypng.com/shrink");
options.auth = "api:" + key;
options.method = "POST";

console.log("Reading files...");

fs.readdir("./input", function (err, files) {

  if (err) throw err;

  console.log(files.length + " files read...");

  var input, request;

  for(var i = 0; i < files.length; i++){
    input = fs.createReadStream(inputFolder + files[i]);
    request = closureRequest(fs.createWriteStream(outputFolder + files[i]));
    input.pipe(request);
  }

});


function closureRequest(output){
    return new https.request(options, function(response) {
        if (response.statusCode === 201) {
          /* Compression was successful, retrieve output from Location header. */
          https.get(response.headers.location, function(response) {
            response.pipe(output);
          });
        } else {
          /* Something went wrong! You can parse the JSON body for details. */
          console.log("Compression failed");
        }
    });
} 