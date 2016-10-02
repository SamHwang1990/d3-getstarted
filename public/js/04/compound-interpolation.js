/**
 * Created by sam on 16/10/2.
 */

;(function() {
  
  var max = 21;
  var data = [];
  
  for (let i = 0; i < max; ++i) data.push(i);
  
  var compoundScale = d3.scalePow().exponent(2).domain([0, max]).range([
      { color: '#add8e6', height: '15px' },
      { color: '#4169e1', height: '150px' }
  ]);

  function render(data, scale, selector) {
    d3.select(selector).selectAll('div.v-bar').data(data)
        .enter().append('div').classed('v-bar', true).append('span');

    d3.select(selector).selectAll('div.v-bar').data(data)
        .exit().remove();

    d3.select(selector).selectAll('div.v-bar').data(data)
        .style('height', (d) => { return scale(d).height; })
        .style('background-color', (d) => { return scale(d).color; })
        .select('span')
        .text((d, i) => { return i; });
  }

  render(data, compoundScale, '#compound');

}());