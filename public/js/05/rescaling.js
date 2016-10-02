/**
 * Created by sam on 16/10/2.
 */

/**
 * 动态调节坐标轴的尺度,只需要修改原有的axis 组件的scale,并重新应用到包裹元素g 上
 * */

;(function() {

  var height = 500;
  var width = 500;
  var margin = 30;
  var xAxisLength = width - 2 * margin;
  var yAxisLength = height - 2 * margin;
  var xAxis;
  var yAxis;

  var svg = d3.select('body').append('svg').classed('axis', true).attr('height', height).attr('width', width);

  function renderYAxis() {
    yAxis = d3.axisLeft(d3.scaleLinear().domain([100, 0]).range([0, yAxisLength]));

    svg.append('g')
        .classed('y-axis', true)
        .attr('transform', () => {
          return `translate(${margin},${margin})`;
        })
        .call(yAxis);
  }

  function renderYGridLines() {
    d3.selectAll('g.y-axis g.tick').select('line.grid-line').remove();

    d3.selectAll('g.y-axis g.tick')
        .append('line')
        .classed('grid-line', true)
        .attr('x1', 0)
        .attr('y1', 0)
        .attr('x2', xAxisLength)
        .attr('y2', 0);
  }

  function renderXAxis() {
    xAxis = d3.axisBottom(d3.scaleLinear().domain([0, 100]).range([0, xAxisLength]));

    svg.append('g')
        .classed('x-axis', true)
        .attr('transform', () => {
          return `translate(${margin},${height - margin})`;
        })
        .call(xAxis);
  }

  function renderXGridLines() {
    d3.selectAll('g.x-axis g.tick').select('line.grid-line').remove();

    d3.selectAll('g.x-axis g.tick')
        .append('line')
        .attr('x1', 0)
        .attr('y1', 0)
        .attr('x2', 0)
        .attr('y2', -(height - 2 * margin))
        .classed('grid-line', true);
  }

  renderYAxis();
  renderYGridLines();
  renderXAxis();
  renderXGridLines();

  // 通过改变原axis.scale 的domain 来改变定义域范围
  window.rescale = function() {
    var max = Math.round(Math.random() * 100);

    xAxis.scale().domain([0, max]);
    svg.select('g.x-axis').transition().call(xAxis);
    renderXGridLines();

    yAxis.scale().domain([max, 0]);
    svg.select('g.y-axis').transition().call(yAxis);
    renderYGridLines();
  }

}());