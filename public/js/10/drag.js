/**
 * Created by sam on 16/10/23.
 */

;(function() {

  var width = 960;
  var height = 500;
  var r = 50;

  var data = [
    [width / 2 - r, height / 2 - r],
    [width / 2 - r, height / 2 + r],
    [width / 2 + r, height / 2 - r],
    [width / 2 + r, height / 2 + r]
  ];

  var svg = d3.select('body').append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g');

  svg.selectAll('circle').data(data)
      .enter()
      .append('circle')
      .attr('r', r)
      .attr('transform', d => `translate(${d})`)
      .call(d3.drag().on('drag', move));

  function move(d) {
    var x = d3.event.x;
    var y = d3.event.y;

    if (inBoundaries(x, y)) {
      d3.select(this).attr('transform', d => `translate(${x},${y})`);
    }
  }

  function inBoundaries(x, y) {
    return (x >= r && x <= (width - r)) && (y >= r && y <= (height - r));
  }


}());