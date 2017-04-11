const request = require("request");

console.log("Welcome to the Github Avatars Downloader");

function getRepoContributors(repoOwner, repoName, cb) { 
    var requestUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contributors`;
    request.get(requestUrl, cb)
        .on('error', (err) => {
            throw err; 
        })
        .on('response', (response) => {
        
        });

} 

getRepoContributors("jquery", "jquery", function(err, result){
    console.log(result.body);
});
