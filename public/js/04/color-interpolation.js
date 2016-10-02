/**
 * Created by sam on 16/10/2.
 */

;(function() {

  var max = 21;
  var data = [];

  for (let i = 0; i < max; ++i) data.push(i);

  var colorScale = d3.scaleLinear().domain([0, max]).range(['white', '#4169e1']);

  function divergingScale(pivot) {
    var divergingColorScale = d3.scaleLinear().domain([0, pivot, max]).range(['white', '#4169e1', '#white']);
    return divergingColorScale;
  }

  function render(data, scale, selector) {
    d3.select(selector).selectAll('div.cell').data(data)
        .enter().append('div').classed('cell', true).append('span');

    d3.select(selector).selectAll('div.cell').data(data)
        .exit().remove();

    d3.select(selector).selectAll('div.cell').data(data)
        .style('display-block', 'inline-block')
        .style('background-color', (d) => { return scale(d); })
        .select('span')
        .text((d, i) => { return i; });
  }

  render(data, colorScale, '#color');
  render(data, divergingScale(10), '#color-diverge');

}());