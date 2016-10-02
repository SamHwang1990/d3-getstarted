/**
 * Created by sam on 16/10/2.
 */

/**
 * 提供以下几个api 设置坐标轴刻度
 * 1. ticks() 设置刻度数量
 * 2. tickPadding() 设置刻度数字与坐标轴的距离
 * 3. tickSize() 设置刻度线的长度
 * 4. tickFormat() 自定义刻度的显示,支持d3.format,
 *    也支持自定义函数,并以返回的字符串为准,所以,如果返回空字符串,会导致刻度数字为空
 * 5. tickValue() 自定义刻度数字,不使用d3 axis 组件自动生成的
 * 6. tickArguments() 以上api 的集合体
 * */

;(function() {

  var height = 500;
  var width = 500;
  var margin = 25;

  var svg = d3.select('body').append('svg')
      .classed('axis', true)
      .attr('width', width)
      .attr('height', height);

  var axis = d3.axisBottom(d3.scaleLinear().domain([0, 100]).range([0, width - 2 * margin]))
                .ticks(5)
                .tickPadding(10)
                .tickFormat((v) => { return `${v}%`; });

  svg.append('g').attr('transform', () => {
    return `translate(${margin}, ${margin})`;
  }).call(axis);

}());