/**
 * Created by Administrator on 2016/10/9.
 */

;(function() {

  var width = 400;
  var height = 400;
  var fullAngle = 2 * Math.PI;
  var colors = d3.schemeCategory20;

  var svg = d3.select('body').append('svg')
      .attr('class', 'pie')
      .attr('height', height)
      .attr('width', width);

  window.render = function(innerRadius, endAngle) {
    if (!endAngle) endAngle = fullAngle;

    var data = [
      {startAngle: 0, endAngle: 0.1 * endAngle},
      {startAngle: 0.1 * endAngle, endAngle: 0.2 * endAngle},
      {startAngle: 0.2 * endAngle, endAngle: 0.4 * endAngle},
      {startAngle: 0.4 * endAngle, endAngle: 0.6 * endAngle},
      {startAngle: 0.6 * endAngle, endAngle: 0.7 * endAngle},
      {startAngle: 0.7 * endAngle, endAngle: 0.9 * endAngle},
      {startAngle: 0.9 * endAngle, endAngle: endAngle}
    ];

    var arc = d3.arc().innerRadius(innerRadius).outerRadius(200);

    svg.select('g').remove();
    svg.append('g').attr('transform', 'translate(200, 200)')
        .selectAll('path.arc')
        .data(data)
        .enter()
        .append('path')
        .classed('arc', true)
        .attr('fill', (d, i) => colors[i])
        .transition().duration(1000)
        .attrTween('d', d => {
          var start = {startAngle: 0, endAngle: 0};
          var interpolate = d3.interpolate(start, d);
          return function (t) {
            return arc(interpolate(t));
          };
        });
  };

  render(0);

}());