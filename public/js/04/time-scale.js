/**
 * Created by sam on 16/10/2.
 */

;(function() {

  var start = new Date(2013, 0, 1);
  var end = new Date(2013, 11, 31);
  var range = [0, 1200];
  var time = d3.scaleTime().domain([start, end]).rangeRound(range);
  var max = 12;
  var data = [];

  for (let i = 0; i < max; ++i) {
    let date = new Date(start.getTime());
    date.setMonth(start.getMonth() + i);
    data.push(date);
  }

  function render(data, scale, selector) {
    d3.select(selector).selectAll('div.fixed-cell').data(data)
        .enter().append('div').classed('fixed-cell', true);

    d3.select(selector).selectAll('div.fixed-cell').data(data)
        .exit().remove();

    d3.select(selector).selectAll('div.fixed-cell').data(data)
        .style('margin-left', (d) => { return `${scale(d)}px`;})
        .html((d) => {
          return `${d3.timeFormat('%x')(d)}<br>${scale(d)}px`;
        });
  }

  render(data, time, '#time')
}());