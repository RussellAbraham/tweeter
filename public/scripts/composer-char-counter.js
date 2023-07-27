/* global $ */
$(document).ready(function() {
  // toggle class of the .counter element when character limit is reached
  $('textarea').on('input', function(event) {
    const max = 140;
    const charCount = $(this).val().length;
    const counting = max - charCount;
    const counter = $(this).parent().find('.counter');
    counter.text(counting);
    if (counting < 0) {
      counter.addClass('char-limit');
    } else {
      counter.removeClass('char-limit');
    }
  });

});