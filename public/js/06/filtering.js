/**
 * Created by sam on 16/10/4.
 */

/**
 * transition 实例支持filter 方法,筛选出符合条件的数据以及图形化元素
 * */

;(function() {

  var data = ['Cat', 'Dog', 'Cat', 'Dog', 'Cat', 'Dog', 'Cat', 'Dog'];
  var duration = 1500;

  d3.select('body').selectAll('div').data(data)
      .enter()
      .append('div')
      .classed('fixed-cell', true)
      .style('top', (d, i) => { return `${i * 40}px`; })
      .style('background-color', 'steelblue')
      .style('color', 'white')
      .style('left', '500px')
      .text((d) => { return d; })
      .transition().duration(duration).style('left', '10px')
      .filter((d) => { return d === 'Cat'; })
      .transition().duration(duration).style('left', '500px');

}());