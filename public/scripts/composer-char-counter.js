/* global $ */
$(document).ready(function() {

  $('textarea').on('input', function(event) {
    const max = 140;
    const charCount = $(this).val().length;
    const counting = max - charCount;
    const counter = $(this).parent().find('.counter');
    counter.text(counting);
    if (counting < 0) {
      counter.addClass('char-limit');
      // todo : prevent submission if caharacter limit is reached
      //$(this).closest('form').submit(function(e) {
      //  e.preventDefault();
      //});
    } else {
      counter.removeClass('char-limit');
      // unbind form submission event causing default behavior of a form submission event
      //$(this).closest('form').unbind('submit');
    }
  });

});