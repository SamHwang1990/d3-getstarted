/**
 * Created by sam on 16/10/2.
 */

;(function() {

  var max = 11;
  var data = [];

  var sizeScale = d3.scaleLinear().domain([0, max]).range([
      'italic bold 12px/30px Georgia, serif',
      'italic bold 120px/180px Georgia, serif'
  ]);

  for (let i = 0; i < max; ++i) data.push(i);

  function render(data, scale, selector) {
    d3.select(selector).selectAll('div.cell').data(data)
        .enter().append('div').classed('cell', true).append('span');

    d3.select(selector).selectAll('div.cell').data(data)
        .exit().remove();

    d3.select(selector).selectAll('div.cell').data(data)
        .style('display-block', 'inline-block')
        .select('span')
        .style('font', (d) => { return scale(d); })
        .text((d, i) => { return i; });
  }

  render(data, sizeScale, '#font');

}());