/**
 * Created by sam on 16/10/4.
 */

;(function() {

  var body = d3.select('body');
  var duration = 3000;

  var div = body.append('div')
      .classed('box', true)
      .style('background-color', 'steelblue')
      .style('color', 'white')
      .text('waiting')
      .transition().duration(duration)
      .delay(1000)
      .on('start', (...args) => {
        console.log(args);
        d3.select(args[2][0]).text((d, i) => { return 'transitioning'; });
      })
      .on('end', function(...args) {
        console.log(args);
        d3.select(this).text((d, i) => { return 'done'; });
      })
      .style('margin-left', '600px');

}());