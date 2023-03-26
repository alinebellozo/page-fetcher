const request = require("request");
const fs = require("fs");

 // command line arguments for the URL and local file path
const url = process.argv[2];
const localPath = process.argv[3];

// Send a GET request to the specified URL
function downloadFile(url, localPath, result) {

  request.get(url, (error, response, content) => {
    if (response.statusCode !== 200) {
      return result(`Failed to download the file: ${error}`);
    }
    
    fs.writeFile(localPath, content, (error) => {
      if (error) {
        return result(error);
      } else {
        result(
          `Downloaded and saved ${Buffer.byteLength(
            content
          )} bytes to ${localPath}`
        );
      }
    });
  });   
}

downloadFile(url, localPath, (err, message) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(message);
});