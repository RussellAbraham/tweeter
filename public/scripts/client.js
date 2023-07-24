/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const renderTweets = function (tweets) {
  const fragment = document.createDocumentFragment(); // Create a document fragment
  // Loop through tweets
  for (const tweet of tweets) {
    const $tweet = createTweetElement(tweet); // Create a tweet element
    const article = document.createElement('article');
    article.classList.add('article');
    article.innerHTML = $tweet;
    // Append the tweet element to the document fragment
    fragment.appendChild(article); // Access the DOM element using $tweet[0]
  }
  $('.tweets-container').append(fragment); // Append the fragment to the tweets container
};

const createTweetElement = function (tweetData) {
  const userTweets = `<header class="article-tweet-header">
        <div class="article-tweet-header-profile">
          <div class="tweet-header-icon">
            <img src= ${tweetData.user.avatars}">
          </div>  
          <p>${tweetData.user.name}</p>
        </div>
        <div class="tweet-handle">${tweetData.user.handle}</div>
        </header>
        <p class="tweet-text">${tweetData.content.text}</p>
      <footer class="article-tweet-footer">
        <div class="tweet-post-date">${timeago.format(tweetData.created_at)}</div>
        <div class="tweet-footer-icons">
          <i class="fa-solid fa-flag"></i>
          <i class="fa-sharp fa-solid fa-retweet"></i>
          <i class="fa-solid fa-heart"></i>
        </div>
      </footer>`

  return userTweets;
};

$(document).ready(function () {

  $('form').submit(function (event) {

    event.preventDefault();

    const tweetContent = $(this).find("textarea[name='text']").val();
    // Validate tweet content
    if (!tweetContent) {
      alert("Tweet content is required");
      // Do not proceed with form submission
      return;
    }

    const maxTweetLength = 140;
    if (tweetContent.length > maxTweetLength) {
      alert("Tweet content is too long. Maximum " + maxTweetLength + " characters allowed.");
      return; // Do not proceed with form submission
    }

    $.ajax({
      type: "POST",
      url: "/tweets",
      data: $(this).serialize(),
      success: function (data) {
        loadTweets();
      }
    })

  });


  const loadTweets = function () {
    $.getJSON({
      url: "/tweets",
      success: function (data) {
        $("#tweets-container").empty();
        renderTweets(data);
      }
    })
  };

  loadTweets();

})