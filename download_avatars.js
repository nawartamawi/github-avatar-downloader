//requiring important packages for the program
const request = require("request");
const fs = require("fs");

var repoOwnerInput = process.argv[2];
var repoNameInput = process.argv[3];

//requiring config from a secure file 
const config = require("./config");
var GITHUB_USER = config.GITHUB_USER;
var GITHUB_TOKEN = config.GITHUB_TOKEN;
console.log(GITHUB_TOKEN);

//user welcoming message
console.log("Welcome to the Github Avatars Downloader");


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
            console.log
        });

}

getRepoContributors(repoOwnerInput, repoNameInput, function(err, result){
    let resultsObject = JSON.parse(result.body);
    resultsObject.forEach((item)=>{
        console.log(item.avatar_url);
        console.log(item.login);
        downloadImageByURL(item.avatar_url, "avatars/"+item.login+".jpg");
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
//downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "avatars/kvirani.jpg");

