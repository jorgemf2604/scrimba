import {tweetsData} from "./data.js";
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

// load initial data 
let tweets = JSON.parse(localStorage.getItem("tweets")) || tweetsData; 

// DOM bindings 
const tweetsContainer = document.getElementById("feed");

// render intial data 
renderTweets();

// event listeners
document.body.addEventListener("click", (e) => {
    if (e.target.dataset.likes) {
        handleLikeIconClick(e.target.dataset.likes);
    } else if (e.target.dataset.comments) {
        handleCommentsIconClick(e.target.dataset.comments);
    } else if (e.target.dataset.retweets) {
        handleRetweetsIconClick(e.target.dataset.retweets);
    } else if (e.target.id === "tweet-btn") {
        handleTweetBtnClick();
    } else if (e.target.dataset.addcomment) {
        handleCommentBtnClick(e.target.dataset.addcomment);
    }
})

// event handlers 
function handleCommentBtnClick(tweetID) {
    const targetTweet = tweets.filter(tweet => tweet.uuid === tweetID)[0];
    const commentInput = document.getElementById(`comment-input-${tweetID}`);
    if (commentInput.value !== "") {
        targetTweet.replies.unshift({
            handle: `@Battousai 🥷🥷`,
            profilePic: `images/battousai.jpeg`,
            tweetText: `${commentInput.value}`,
        });
        saveTweets();
        renderTweets();
        commentInput.value = "";
    }
}

function handleLikeIconClick(tweetID) {
    const targetTweet = tweets.filter(tweet => tweet.uuid === tweetID)[0];
    if (targetTweet.isLiked) {
        targetTweet.likes--;
    } else {
        targetTweet.likes++;
    }
    targetTweet.isLiked = !targetTweet.isLiked;
    renderTweets();
    saveTweets();
}

function handleRetweetsIconClick(tweetID) {
    const targetTweet = tweets.filter(tweet => tweet.uuid === tweetID)[0];
    if (targetTweet.isRetweeted) {
        targetTweet.retweets--;
    } else {
        targetTweet.retweets++;
    }
    targetTweet.isRetweeted = !targetTweet.isRetweeted;
    renderTweets();
    saveTweets();
}

function handleCommentsIconClick(tweetID) {
    document.getElementById(`comments-${tweetID}`).classList.toggle("hidden");
}

function handleTweetBtnClick() {
    const inputEl = document.getElementById("main-input");
    if (inputEl.value !== "") {
        tweets.unshift({
            handle: `@Battousai 🥷🥷`,
            profilePic: `images/battousai.jpeg`,
            likes: 0,
            retweets: 0,
            tweetText: `${inputEl.value}`,
            replies: [],
            isLiked: false,
            isRetweeted: false,
            uuid: uuidv4(),
        });
        inputEl.value = "";
        saveTweets();
        renderTweets();
    }
}

// helper functions 
function renderTweets() {
    tweetsContainer.innerHTML = generateTweetsHTML();
}

function saveTweets() {
    localStorage.setItem("tweets", JSON.stringify(tweets));
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

        // cosmetic class for icons 
        const likeIconClass = tweet.isLiked ? "likedIcon" : "";
        const retweetIconClass = tweet.isRetweeted ? "retweetIcon" : "";

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
                            <span class="tweet-metric"><i class="fa-solid fa-comments" data-comments="${tweet.uuid}"></i>${tweet.replies.length}</span>
                            <span class="tweet-metric"><i class="fa-solid fa-heart ${likeIconClass}" data-likes="${tweet.uuid}"></i>${tweet.likes}</span>
                            <span class="tweet-metric"><i class="fa-solid fa-retweet ${retweetIconClass}" data-retweets="${tweet.uuid}"></i>${tweet.retweets}</span>
                        </div>
                    </div>
                </div>
                <div class="comments hidden" id="comments-${tweet.uuid}">
                    <div class="add-comment-container">
                        <input class="add-comment-input" id="comment-input-${tweet.uuid}" placeholder="Add your comment here..." />
                        <button class="add-comment-btn" data-addcomment="${tweet.uuid}">Tweet</button>
                    </div>
                    ${templateComments}
                </div>
            </div>
        `;
    })
    return htmlTemplate;
}