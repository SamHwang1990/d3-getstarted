/**
 * Created by sam on 16/10/1.
 */
;(function () {

  var data = [];

  function next(x) {
    return 15 + x * x;
  }

  function newData() {
    data.push(next);
    return data;
  }

  function render() {
    var selection = d3.select('#container').selectAll('div').data(newData);

    selection.enter().append('div').append('span');

    selection.exit().remove();

    selection.classed('v-bar', true).style('height', (d, i) => {return `${d(i)}px`})
        .select('span').text((d, i) => {return d(i);});
  }

  setInterval(() => {
    render();
  }, 1500);

  render();
}());