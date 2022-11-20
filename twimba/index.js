import {tweetsData} from "./data.js";

// load initial data 
let tweets = tweetsData; 

// DOM bindings 
const tweetsContainer = document.getElementById("feed");

// render intial data 
renderTweets()

// event listeners
document.body.addEventListener("click", (e) => {
    if(e.target.dataset.likes) {
        console.log(e.target.dataset.likes)
    }
})

// helper functions 
function renderTweets() {
    tweetsContainer.innerHTML = generateTweetsHTML();
}

function generateTweetsHTML() {
    let htmlTemplate = "";
    tweets.forEach(tweet => {
        // generate template of comments
        let templateComments = "";
        tweet.replies.forEach(reply => {
            templateComments += `
                <div class="comment">
                    <div class="comment-main">
                        <img src="${reply.profilePic}" class="reply-profilePic" />
                        <div class="reply-body">
                            <span class="reply-handle">${reply.handle}</span>
                            <p class="reply-text">${reply.tweetText}</p>
                        </div>
                    </div>
                </div>
            `;
        })

        // generate complete HTML template
        htmlTemplate += `
            <div class="tweet">
                <hr />
                <div class="tweet-inner">
                    <img src="${tweet.profilePic}" class="tweet-profilePic" /> 
                    <div class="tweet-body">
                        <span class="tweet-handle">${tweet.handle}</span>
                        <p class="tweet-text">${tweet.tweetText}</p>
                        <div class="tweet-metrics">
                            <span class="tweet-metric"><i class="fa-solid fa-comments"></i>${tweet.replies.length}</span>
                            <span class="tweet-metric"><i class="fa-solid fa-heart" data-likes="${tweet.uuid}"></i>${tweet.likes}</span>
                            <span class="tweet-metric"><i class="fa-solid fa-retweet"></i>${tweet.retweets}</span>
                        </div>
                    </div>
                </div>
                <div class="comments hidden">
                    <div class="add-comment-container">
                        <input class="add-comment-input" placeholder="Add your comment here..." />
                        <button class="add-comment-btn">Tweet</button>
                    </div>
                    ${templateComments}
                </div>
            </div>
        `;
    })
    return htmlTemplate;
}