const request = require("request");

console.log("Welcome to the Github Avatars Downloader");

var GITHUB_USER = "nawartamawi";
var GITHUB_TOKEN = "cdfa261b3f0e65bf413e2c9824340f784708f51f";


function getRepoContributors(repoOwner, repoName, cb) { 
    var requestURL = `https://${GITHUB_USER}:${GITHUB_TOKEN}@api.github.com/repos/${repoOwner}/${repoName}/contributors`;
    var requestOption = {
        headers : {
            "user-agent" : "Nawar",
        },
        url : requestURL
    }
    request.get(requestOption, cb)
        .on('error', (err) => {
            throw err; 
        })
        .on('response', (response) => {

        });

}

getRepoContributors("jquery", "jquery", function(err, result){
    let resultsObject = JSON.parse(result.body);
    resultsObject.forEach((item)=>{
        console.log(item.avatar_url)
    });
});
