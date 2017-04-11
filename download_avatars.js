const request = require("request");
const fs = require("fs")
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

function downloadImageByURL(url, filepath) {
request.get(url)
    .on('error', (err) => {
        throw err; 
    })
    .on('response', (response) =>{
        console.log("Response Status Code is :", response.statusCode);
        console.log("Repsonse Message is :", response.statusMessage);
        console.log("Response content Type is :", response.headers['content-type'])
    })
    .on('end', () => {
        console.log("Download is completed");
    })
    .pipe(fs.createWriteStream(filepath))
    .on('close', () => console.log('Closed the file'))
    ;
        
}
downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "avatars/kvirani.jpg");

