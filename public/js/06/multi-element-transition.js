/**
 * Created by sam on 16/10/5.
 */

;(function() {

  var id = 0;
  var data = [];
  var duration = 500;
  var chartHeight = 100;
  var chartWidth = 680;

  function push(data) {
    data.push({
      id: ++id,
      value: Math.round(Math.random() * chartHeight)
    })
  }

  for (let i = 0; i < 20; ++i) push(data);

  function barLeft(i) {
    return i * (30 + 2);
  }

  function barHeight(d) {
    return d.value;
  }
  
  function render(data) {
    var selection = d3.select('body').selectAll('div.v-bar').data(data, d => d.id);

    selection.enter()
        .append('div')
        .classed('v-bar', true)
        .style('position', 'fixed')
        .style('top', `${chartHeight}px`)
        .style('left', (d, i) => `${barLeft(i + 1)}px`)
        .style('height', '0px')
        .append('span');

    selection.transition().duration(duration)
        .style('top', d => `${chartHeight - barHeight(d)}px`)
        .style('left', (d, i) => `${barLeft(i)}px`)
        .style('height', d => `${barHeight(d)}px`)
        .select('span')
        .text(d => d.value);

    selection.exit()
        .transition().duration(duration)
        .style('left', (d, i) => `${barLeft(-1)}px`)
        .remove();
  }

  setInterval(() => {
    data.shift();
    push(data);
    render(data);
  }, 2000);

  render(data);

  d3.select('body').append('div')
      .classed('baseline', true)
      .style('position', 'fixed')
      .style('top', `${chartHeight}px`)
      .style('left', '0px')
      .style('width', `${chartWidth}px`);

}());