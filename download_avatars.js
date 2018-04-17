var request = require('request');
var getToken = require('./secrets');

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  if((repoOwner && repoName) === undefined){
  return console.log("please enter repoOwner and repoName")
}
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization':`token ${getToken.GITHUB_TOKEN}`
    }
  };

  request(options, function(err, res, body) {
    cb(err, body);
  });
}

function downloadImageByURL(url, filePath) {
  var request = require('request');
  var fs = require('fs');

  request.get(url)
         .on('error', function (err) {
         })
         .on('response', function (response) {
           console.log(response.statusMessage);
           // console.log('Download complete.');

         })
         .pipe(fs.createWriteStream(`avatars/${filePath}`));

         // console.log('Downloading image...');
}

getRepoContributors(process.argv[2], process.argv[3], function(err, result) {
    var repos = JSON.parse(result);
  console.log("Errors:", err);
  repos.forEach(function(repo) {
  downloadImageByURL(repo.avatar_url, repo.login);
  });
});
