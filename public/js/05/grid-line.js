/**
 * Created by sam on 16/10/2.
 */

/**
 * 表格线的绘制可以依据刻度值, 即以tick 为标准,包括定位,而不是以svg 原点为准,这个是svg 本身行为
 * */

;(function() {

  var height = 500;
  var width = 500;
  var margin = 30;

  var svg = d3.select('body').append('svg').classed('axis', true).attr('height', height).attr('width', width);

  function renderYAxis() {
    var axisLength = height - 2 * margin;

    var axis = d3.axisLeft(d3.scaleLinear().domain([100, 0]).range([0, axisLength]));

    svg.append('g')
        .classed('y-axis', true)
        .attr('transform', () => {
          return `translate(${margin},${margin})`;
        })
        .call(axis);

    d3.selectAll('g.y-axis g.tick')
        .append('line')
        .classed('grid-line', true)
        .attr('x1', 0)
        .attr('y1', 0)
        .attr('x2', axisLength)
        .attr('y2', 0);
  }

  function renderXAxis() {
    var axisLength = width - 2 * margin;

    var axis = d3.axisBottom(d3.scaleLinear().domain([0, 100]).range([0, axisLength]));

    svg.append('g')
        .classed('x-axis', true)
        .attr('transform', () => {
          return `translate(${margin},${height - margin})`;
        })
        .call(axis);

    d3.selectAll('g.x-axis g.tick')
        .append('line')
        .attr('x1', 0)
        .attr('y1', 0)
        .attr('x2', 0)
        .attr('y2', -(height - 2 * margin))
        .classed('grid-line', true)
  }

  renderYAxis();
  renderXAxis();

}());