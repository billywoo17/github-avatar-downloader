var request = require('request');
var getToken = require('./secrets');

console.log('Welcome to the GitHub Avatar Downloader!');

getRepoContributors("jquery", "jquery", function(err, result) {
  var repos = JSON.parse(result);
  console.log("Errors:", err);
  repos.forEach(function(repo) {
  downloadImageByURL(repo.avatar_url, repo.login);
  });
});

function getRepoContributors(repoOwner, repoName, cb) {
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