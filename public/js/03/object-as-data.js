/**
 * Created by sam on 16/10/1.
 */

;(function() {
  var data = [
    {width: 10, color: 23},{width: 15, color: 33},
    {width: 30, color: 40},{width: 50, color: 60},
    {width: 80, color: 22},{width: 65, color: 10},
    {width: 55, color: 5},{width: 30, color: 30},
    {width: 20, color: 60},{width: 10, color: 90},
    {width: 8, color: 10}
  ];

  var colorScale = d3.scaleLinear().domain([0,100]).range(['#add8e6', 'blue']);

  function render(data) {
    d3.select('body').selectAll('div.h-bar').data(data)
        .enter().append('div').classed('h-bar', true).append('span');

    d3.select('body').selectAll('div.h-bar').data(data).exit().remove();

    d3.select('body').selectAll('div.h-bar').data(data)
        .style('width', function(d) {
          return `${d.width * 5}px`;
        })
        .style('background-color', function(d) {
          return colorScale(d.color);
        })
        .select('span').text((d) => {
          return d.width;
        });
  }

  function randomValue() {
    return Math.round(Math.random() * 100);
  }

  setInterval(() => {
    data.shift();
    data.push({
      width: randomValue(),
      color: randomValue()
    });

    render(data);
  }, 1500);

  render(data);
}());