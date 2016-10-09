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

  window.render = function(innerRadius) {
    var data = [
      {startAngle: 0, endAngle: 0.1 * fullAngle, value: "A"},
      {startAngle: 0.1 * fullAngle, endAngle: 0.2 * fullAngle, value: "B"},
      {startAngle: 0.2 * fullAngle, endAngle: 0.4 * fullAngle, value: "C"},
      {startAngle: 0.4 * fullAngle, endAngle: 0.6 * fullAngle, value: "D"},
      {startAngle: 0.6 * fullAngle, endAngle: 0.7 * fullAngle, value: "E"},
      {startAngle: 0.7 * fullAngle, endAngle: 0.9 * fullAngle, value: "F"},
      {startAngle: 0.9 * fullAngle, endAngle: fullAngle, value: "G"}
    ];

    var arc = d3.arc().innerRadius(innerRadius).outerRadius(200);

    svg.select('g').remove();
    var arcs = svg.append('g').attr('transform', 'translate(200, 200)')
        .selectAll('path.arc')
        .data(data)
        .enter();

    arcs.append('path')
        .classed('arc', true)
        .attr('fill', (d, i) => colors[i])
        .attr('d', d => arc(d));

    arcs.append('text')
        .attr('transform', d => `translate(${arc.centroid(d)})`)
        .attr('dy', '.35em')
        .attr('text-anchor', 'middle')
        .text(d => d.value);


  };

  render(0);

}());