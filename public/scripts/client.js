/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Helper function to escape user-generated data to prevent XSS
const escapeHTML = function(str) {
  const div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const renderTweets = function(tweets) {
  const fragment = document.createDocumentFragment(); // Create a document fragment
  // Loop through tweets in reverse order
  for (let i = tweets.length - 1; i >= 0; i--) {
    const tweet = tweets[i];
    const $tweet = createTweetElement(tweet); // Create a tweet element
    const article = document.createElement('article');
    article.classList.add('article');
    article.innerHTML = $tweet;
    // Append the tweet element to the document fragment
    fragment.appendChild(article);
  }
  $('.tweets-container').prepend(fragment); // Prepend the fragment to the tweets container
};


// tweet template
const createTweetElement = function(tweetData) {
  const userTweets = `
    <header class="article-tweet-header">
      <div class="article-tweet-header-profile">
        <div class="tweet-header-icon">
          <img src="${escapeHTML(tweetData.user.avatars)}">
        </div>  
        <p>${escapeHTML(tweetData.user.name)}</p>
      </div>
      <div class="tweet-handle">${escapeHTML(tweetData.user.handle)}</div>
    </header>
    <p class="tweet-text">${escapeHTML(tweetData.content.text)}</p>
    <footer class="article-tweet-footer">
      <div class="tweet-post-date">${escapeHTML(timeago.format(tweetData.created_at))}</div>
      <div class="tweet-footer-icons">
        <i class="fa-solid fa-flag"></i>
        <i class="fa-sharp fa-solid fa-retweet"></i>
        <i class="fa-solid fa-heart"></i>
      </div>
    </footer>
  `;

  return userTweets;
};

$(document).ready(function () {
  $('form').submit(function (event) {
    event.preventDefault();

    const tweetContent = $("#tweet-text").val();
    const tweetError = $("#new-tweet-error-message");

    // Check for empty tweet content
    if (!tweetContent.trim()) {
      tweetError.text('Your have no content to submit').slideDown(500);
      return;
    }

    const maxTweetLength = 140;
    if (tweetContent.length > maxTweetLength) {
      tweetError.text("You've exceeded the character limit!").slideDown(500);
      return; // Do not proceed with form submission
    }

    // Clear error message when content is valid
    tweetError.hide().text();

    // Proceed with form submission using AJAX
    $.ajax({
      type: "POST",
      url: "/tweets",
      data: $(this).serialize(),
      success: function (data) {
        loadTweets(); // Load tweets again after successful submission
        $("#tweet-text").val("");
        $(".counter").text(140);
      },
      error: function (error) {
        console.log("Error posting tweet:", error);
      }
    });
  });

  const loadTweets = function() {
    // Use $.get for simplicity when just fetching JSON
    $.get("/tweets")
      .done(function (data) {
        $(".tweets-container").empty();
        renderTweets(data);
      })
      .fail(function (error) {
        console.log("Error loading tweets:", error);
      });
  };

  loadTweets();
});
