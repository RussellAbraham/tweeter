/* global $ */
$(document).ready(function() {
  $('form').on('input', 'textarea', function(event) {
    const max = 140;
    const charCount = $(this).val().length;
    const counting = max - charCount;
    const counter = $(this).parent().find('.counter');
    counter.text(counting);
    if (counting < 0) {
      counter.addClass('char-limit');
      $(this).closest('form').submit(function(e) {
        e.preventDefault();
      });
    } else {
      counter.removeClass('char-limit');
      $(this).closest('form').unbind('submit');
    }
  });
});