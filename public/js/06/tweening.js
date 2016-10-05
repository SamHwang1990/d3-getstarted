/**
 * Created by sam on 16/10/5.
 */

/**
 * transition 实例支持styleTween、attrTween、tween 等方法来实现中间帧(关键帧)动画
 * 中间帧其实是一个interpolate 的封装,参照第四章的练习
 * */

;(function() {

  var body = d3.select('body');
  var duration = 5000;

  body.append('div').append('input')
      .attr('type', 'button')
      .attr('class', 'countdown')
      .attr('value', '0')
      .style('width', '150px')
      .transition().duration(duration).ease(d3.easeLinear)
      .style('width', '400px')
      .attr('value', '9');

  body.append('div').append('input')
      .attr('type', 'button')
      .attr('class', 'countdown')
      .attr('value', '0')
      .transition().duration(duration).ease(d3.easeLinear)
      .styleTween('width', widthTween)
      .attrTween('value', valueTween);

  function widthTween() {
    var interpolate = d3.scaleLinear()
        .domain([0, 1])
        .range([150, 400]);

    return t => interpolate(t);
  }

  function valueTween() {
    var interpolate = d3.scaleQuantize()
        .domain([0, 1])
        .range([1, 2, 3, 4, 5, 6, 7, 8, 9]);

    return t => interpolate(t);
  }

}());