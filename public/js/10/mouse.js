/**
 * Created by sam on 16/10/23.
 */

;(function() {

  var r = 400;

  var svg = d3.select('body').append('svg').attr('height', 400).attr('width', 400);

  var positionLabel = svg.append('text').attr('x', 10).attr('y', 30);

  function printPosition() {
    var position = d3.mouse(svg.node());
    positionLabel.text(position);
  }

  svg.on('mousemove', () => printPosition());
  svg.on('click', function() {
    for (let i = 0; i < 5; ++i) {
      let position = d3.mouse(svg.node());
      let circle = svg.append('circle')
          .attr('cx', position[0])
          .attr('cy', position[1])
          .attr('r', 0)
          .style('fill', 'transparent')
          .style('stroke', 'black')
          .style('stroke-width', 5 / (i))
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
  });

}());
