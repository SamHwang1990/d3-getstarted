/**
 * Created by sam on 16/10/5.
 */

/**
 * transition 实例支持ease 来定义当此动画的缓动效果,可使用预定义的或自定义的函数
 * */

;(function() {

  var data = [
      d3.easeLinear,
      d3.easeCubic,
      d3.easeCubicInOut,
      d3.easeSin,
      d3.easeSinOut,
      d3.easeExp,
      d3.easeCircle,
      d3.easeBack,
      d3.easeBounce,
      function custom(t) {
        return t * t;
      }
  ];

  var colors = d3.schemeCategory10;

  d3.select('body').selectAll('div').data(data)
      .enter()
      .append('div')
      .classed('fixed-cell', true)
      .style('top', (d, i) => `${i * 40}px`)
      .style('background-color', (d, i) => colors[i])
      .style('color', 'white')
      .style('left', '500px')
      .text(d => d.name);

  d3.selectAll('div').each(function(d) {
    d3.select(this).transition().ease(d).duration(2500)
        .style('left', '10px');
  })

}());