/**
 * Created by sam on 16/10/23.
 */

;(function() {

  var initR = 100;
  var r = 400;
  var thickness = 20;

  var svg = d3.select('body').append('svg').attr('height', 500).attr('width', 500);

  d3.select('body').on('touchstart', touch, {passive: false}).on('touchend', touch, {passive: false});

  function touch() {
    d3.event.preventDefault();

    var arc = d3.arc().outerRadius(initR).innerRadius(initR - thickness);

    var data = d3.touches(svg.node());

    var g = svg.selectAll('g.touch').data(d3.touches(svg.node()), d => d.identifier);

    svg.selectAll('g.touch').data(data, d => d.identifier)
        .enter()
        .append('g')
        .classed('touch', true)
        .attr('transform', d => `translate(${d[0]},${d[1]})`)
        .append('path')
        .classed('arc', true)
        .transition()
        .duration(2000)
        .attrTween('d', () => {
          var interpolate = d3.interpolate(
              {startAngle: 0, endAngle: 0},
              {startAngle: 0, endAngle: 2 * Math.PI}
          );

          return t => arc(interpolate(t));
        })
        .on('end', function(d) {
          if (!complete(g)) {
            console.log('djj');
            ripples(d);
          }
          d3.select(this).remove();
        });

    svg.selectAll('g.touch').data(data, d => d.identifier)
        .exit().remove().each(function() {
          this.__stopped__ = true;
        });
  }

  function complete(g) {
    return g.node() && g.node().__stopped__ != true;
  }

  function ripples(position) {
    for (let i = 0; i < 5; ++i) {
      let circle = svg.append('circle')
          .attr('cx', position[0])
          .attr('cy', position[1])
          .attr('r', initR - (thickness / 2))
          .style('fill', 'transparent')
          .style('stroke', 'black')
          .style('stroke-width', thickness / (i))
          .transition()
          .delay(Math.pow(i, 2.5) * 50)
          .duration(2000)
          .ease(d3.easeQuadIn)
          .attr('r', r)
          .style('stroke-opacity', 0)
          .on('end', function() {
            d3.select(this).remove();
          })
    }
  }

}());
