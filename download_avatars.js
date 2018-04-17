var request = require('request');
require('dotenv').config();
if(process.env.GITHUB_TOKEN === undefined)
{
  return console.log("no token")
}
console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  if((repoOwner && repoName) === undefined){
    return console.log("please enter repoOwner and repoName")
  }
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization':`token ${process.env.GITHUB_TOKEN}`
    }
  };

  request(options, function(err, res, body) {
    if(res.headers.status === "401 Unauthorized"){
      return console.log("bad token")
    }
    if(res.headers.status !== "200 OK"){
      return console.log("invalid link");
    }
    cb(err, body);
  });
}


function downloadImageByURL(url, filePath) {
  var request = require('request');
  var fs = require('fs');
  var outfile = fs.createWriteStream(`avatars/${filePath}`);
  outfile.on('error', function(err){
    console.log("missing folder")
  });

  request.get(url)
         .on('error', function (err) {

          })
         .on('response', function (response) {
           console.log(response.statusMessage);
           // console.log('Download complete.');
         })
         .pipe(outfile);

         // console.log('Downloading image...');
}



getRepoContributors(process.argv[2], process.argv[3], function(err, result) {
  var repos = JSON.parse(result);
  console.log("Errors:", err);
  repos.forEach(function(repo) {
    downloadImageByURL(repo.avatar_url, repo.login);
  });
});


