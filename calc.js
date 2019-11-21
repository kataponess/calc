$(function () {

  let lapFlag = false;

  $(document).on('click', '.btn-clear', function () {
    $('.display').text('0');
    whereIsOperator = '';
    beforeText = '';
    behindText = '';
    lapFlag = false;
  });

  $(document).on('click', '.btn-number', function () {

    if ($('.display').text() == '0' || lapFlag) $('.display').text('');

    $('.display').text($('.display').text() + $(this).text());
    lapFlag = false;
  });

  $(document).on('click', '.btn-operator', function () {

    if (/[\*\/\+\-]/.test($('.display').text().slice(- 1)))
      $('.display').text($('.display').text().slice(0, -1) + $(this).text());

    if (/[0-9]/.test($('.display').text().slice(-1)))
      $('.display').text($('.display').text() + $(this).text());

    lapFlag = false;
  });

  $(document).on('click', '.btn-decimal-point', function () {

    if (lapFlag) $('.display').text(`0${$(this).text()}`);

    if (/[0-9]/.test($('.display').text().slice(-1)))
      $('.display').text($('.display').text() + $(this).text());

    lapFlag = false;
  });

  $(document).on('click', '.btn-equal', function () {
    let displayText = $('.display').text();
    let whereIsOperator = '';
    lapFlag = true;
    while (/\*/.test(displayText.slice(1))) {
      whereIsOperator = displayText.search(/\*/);
      displayText = calc(displayText, '*', whereIsOperator);
    }
    while (/\//.test(displayText.slice(1))) {
      whereIsOperator = displayText.search(/\//);
      displayText = calc(displayText, '/', whereIsOperator);
    }
    while (/[\+\-]/.test(displayText.slice(1))) {
      whereIsOperator = displayText.search(/[\+\-]/);

      if (displayText[whereIsOperator] == '+') {
        displayText = calc(displayText, '+', whereIsOperator);
      }
      if (displayText[whereIsOperator] == '-') {
        displayText = calc(displayText, '-', whereIsOperator);
      }
    }
    displayText = (Math.round(displayText * 1000000000) / 1000000000).toString();

    ((displayText.split(/[0-9]/)).length >= 14) ?
      $('.display').text(parseFloat(displayText).toExponential(10)) :
      $('.display').text(displayText);
  });

  function calc(calculation, operator, position) {
    let beforeText = '';
    let behindText = '';

    //演算子前の数字を取得
    for (let i = position - 1; /[0-9\.]/.test(calculation[i]) || i == 0; i--) {
      beforeText = calculation[i] + beforeText;
    }
    //演算子後の数字を取得
    for (let i = position + 1; /[0-9\.]/.test(calculation[i]) || i == calculation.length - 1; i++) {
      behindText += calculation[i];
    }
    if (operator == '*')
      calculation = calculation.replace(beforeText + operator + behindText, parseFloat(beforeText) * parseFloat(behindText));
    if (operator == '/')
      calculation = calculation.replace(beforeText + operator + behindText, parseFloat(beforeText) / parseFloat(behindText));

    if (operator == '+')
      calculation = calculation.replace(beforeText + operator + behindText, parseFloat(beforeText) + parseFloat(behindText));

    if (operator == '-')
      calculation = calculation.replace(beforeText + operator + behindText, parseFloat(beforeText) - parseFloat(behindText));

    beforeText = '';
    behindText = '';
    return calculation;
  }

});
