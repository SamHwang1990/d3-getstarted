/**
 * Created by sam on 16/10/2.
 */

;(function() {

  var max = 11,
      data = [];

  for (let i = 1; i < max; ++i) data.push(i);

  var linear = d3.scaleLinear().domain([1, 10]).range([1, 10]);
  var linearCapped = d3.scaleLinear().domain([1, 10]).range([1, 20]);

  var pow = d3.scalePow().exponent(2);
  var powCapped = d3.scalePow().exponent(2).domain([1, 10]).rangeRound([1, 10]);

  var log = d3.scaleLog();
  var logCapped = d3.scaleLog().domain([1, 10]).rangeRound([1, 10]);

  function render(data, scale, selector) {
    d3.select(selector).selectAll('div.cell').data(data)
        .enter().append('div').classed('cell', true);

    d3.select(selector).selectAll('div.cell').data(data)
        .exit().remove();

    d3.select(selector).selectAll('div.cell').data(data)
        .style('display', 'inline-block')
        .text((d) => {
          // 下面的对scale 的返回值输出小数点后两位数值
          // 参考stackoverflow 上的方式:
          // http://stackoverflow.com/questions/11832914/round-to-at-most-2-decimal-places-in-javascript

          // Math.round(scale(d) * 100) / 100
          // parseFloat(scale(d).toFixed(2));
          // 可能在精确度上不一致
          return Math.round(scale(d) * 100) / 100;
        })
  }

  render(data, linear, '#linear');
  render(data, linearCapped, '#linear-capped');
  render(data, pow, '#pow');
  render(data, powCapped, '#pow-capped');
  render(data, log, '#log');
  render(data, logCapped, '#log-capped');
}());