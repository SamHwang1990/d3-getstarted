/**
 * Created by sam on 16/10/5.
 */

;(function () {

  var body = d3.select('body');
  var countdown = body.append('div').append('input');

  countdown.attr('type', 'button')
      .attr('class', 'countdown')
      .attr('value', 0);

  window.countup = (target) => {
    d3.timer(() => {
      var value = countdown.attr('value');
      if (value == target) return true;
      countdown.attr('value', ++value);
    }, 500, 3000)
  };

  window.reset = () => countdown.attr('value', 0);

}());