var icoValidator = {
  validIco: function(value) {
    var $newValue,
        $remainingDigits,
        i,
        j;

    if (value.length === 8) {
      return value.match(/^\d+$/) && icoValidator.lastNumberValid(value);
    } else {
      $remainingDigits = 8 - value.length;
      $newValue = value;
      i = 0;
      j = $remainingDigits;
      while (i < j) {
        $newValue = '0' + $newValue;
        i++;
      }

      return $newValue.length === 8 && $newValue.match(/^\d+$/) && icoValidator.lastNumberValid($newValue);
    }
  },
  lastNumberValid: function(value) {
    return parseInt(value[value.length - 1], 10) === icoValidator.calculateValidLastNumber(value);
  },
  calculateValidLastNumber: function(value) {
    var sum = 0;
    for( var i = 0; i <= 6; i++ ) {
      sum += value[i] * (8 - i);
    }
    var mod = sum % 11;
    if( mod === 0 || mod === 10 ) {
      return 1;
    }
    if( mod === 1 ) {
      return 0;
    }
    return 11 - mod;
  }
};

jQuery( function($) {
  var icoFields = '.ico-validate';

  function validate(el) {
    var value = $(el).val();
    if( value.length <= 0 || icoValidator.validIco(value) ) {
      $(el).parent().removeClass('field_with_errors').removeClass('error');
    } else {
      $(el).parent().addClass('field_with_errors').addClass('error');
    }
  }

  $(document).on('change', icoFields, function() {
    validate(this);
  });

  $(document).on('keyup', icoFields, function() {
    validate(this);
  });

  $(document).on('paste', icoFields, function() {
    var el = this;
    setTimeout( function() {
      validate(el);
      $(el).trigger('change');
    }, 10);
  });

  $(document).on('submit', 'form', function(e) {
    var wrong = $(this).find('.field_with_errors .ico-validate');
    if( wrong.length <= 0 ) {
      return;
    }
    wrong.focus();
    e.stopPropagation();
    e.preventDefault();
    e.stopImmediatePropagation();
    return false;
  });
});
