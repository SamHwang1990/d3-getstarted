/**
 * Created by sam on 16/10/2.
 */

/**
 * 坐标轴绘制在svg 上,并推荐用g 元素来包裹
 * 1. 创建svg 根元素
 * 2. 创建包裹元素g
 * 3. 创建axis 组件: d3.axisTop, d3.axisBottom, d3.axisLeft, d3.axisRight, 并设置其尺度(scale)
 * 4. 将axis 组件应用到包裹元素g 上
 * */
;(function() {

  var height = 500;
  var width = 500;
  var margin = 25;
  var offset = 50;
  var axisWidth = width - 2 * margin;
  var svg;

  function createSvg() {
    svg = d3.select('body').append('svg')
        .classed('axis', true)
        .attr('width', width)
        .attr('height', height);
  }

  function renderAxis(scale, i, orient) {
    // d3.axisTop, d3.axisBottom, d3.axisLeft, d3.axisRight
    var axis = d3[`axis${orient[0].toUpperCase()}${orient.slice(1)}`](scale).ticks(5);

    svg.append('g').attr('transform', () => {
      if (['top', 'bottom'].indexOf(orient) >= 0) {
        return `translate(${margin},${i*offset})`;
      } else {
        return `translate(${i*offset},${margin})`;
      }
    }).call(axis);
  }

  window.renderAll = function(orient) {
    if (svg) svg.remove();

    createSvg();

    renderAxis(d3.scaleLinear().domain([0, 100]).range([0, axisWidth]), 1, orient);
    renderAxis(d3.scalePow().exponent(2).domain([0, 100]).range([0, axisWidth]), 2, orient);
    renderAxis(d3.scaleTime().domain([new Date(2012, 0, 1), new Date()]).range([0, axisWidth]), 3, orient);
  }

}());