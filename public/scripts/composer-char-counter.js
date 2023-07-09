$(document).ready(function() {
  
  // todo : update to toglle css classes, disable the textarea or prevent submission of the form if character length is exceeded
  $('form').on('input', 'textarea', function(event){

    const max = 140;
    const charCount = $(this).val().length;

    let counting = max - charCount;

    const counter = $(this).parent().find('.counter');

    if(counting < 0) {
      counter.css('color', 'red');
    }

    counter.text(counting);
    
    if (counting > 0) {
      counter.css('color', '#545454');
    }

    event.stopPropagation();

  });
  
});