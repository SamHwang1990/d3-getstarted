/**
 * Created by sam on 16/10/23.
 */

;(function() {

  var width = 960;
  var height = 960;
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
      .call(d3.zoom().scaleExtent([1, 10]).on('zoom', zoom))
      .append('g');

  svg.selectAll('circle').data(data)
      .enter()
      .append('circle')
      .attr('r', r)
      .attr('transform', d => `translate(${d})`);

  function zoom() {
    svg.attr('transform', `translate(${d3.event.transform.x},${d3.event.transform.y})scale(${d3.event.transform.k})`);
  }


}());