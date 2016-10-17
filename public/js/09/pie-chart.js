/**
 * Created by sam on 16/10/14.
 */

;(function () {

  function pieChart() {
    var _chart = {};
    var _width = 500,
        _height = 500,
        _margins = {top: 30, left: 30, right: 30, bottom: 30},
        _data = [],
        _colors = d3.schemeCategory20,
        _svg,
        _bodyG,
        _pieG,
        _radius = 200,
        _innerRadius = 100;

    _chart.render = function () {
      if (!_svg) {
        _svg = d3.select("body").append("svg")
            .attr("height", _height)
            .attr("width", _width);
      }
      renderBody(_svg);
      return _chart;
    };

    function renderBody(svg) {
      if (!_bodyG)
        _bodyG = svg.append("g")
            .attr("class", "body");

      renderPie();
    }

    function renderPie() {
      var pie = d3.pie().sort(d => d.id).value(d => d.value);
      var arc = d3.arc().innerRadius(_innerRadius).outerRadius(_radius);

      if (!_pieG)
        _pieG = _bodyG.append('g')
            .classed('pie', true)
            .attr('transform', `translate(${_radius},${_radius})`);

      renderSlices(pie, arc);
      renderLabels(pie, arc);
    }

    function renderSlices(pie, arc) {
      var pieData = pie(_data);

      _pieG.selectAll('path.arc').data(pieData)
          .enter()
          .append('path')
          .attr('class', 'arc')
          .attr('fill', (d, i) => _colors[i]);

      _pieG.selectAll('path.arc').data(pieData)
          .transition()
          .attrTween('d', function(d) {
            var current = this.__current__;

            if (!current) {
              current = {
                startAngle: 0,
                endAngle: 0
              }
            }

            var interpolate = d3.interpolate(current, d);
            this.__current__ = interpolate(1);

            return function(t) {
              return arc(interpolate(t));
            }
          })
    }

    function renderLabels(pie, arc) {
      var pieData = pie(_data);

      _pieG.selectAll('text.label').data(pieData)
          .enter()
          .append('text')
          .classed('label', true);

      _pieG.selectAll('text.label').data(pieData)
          .transition()
          .attr('transform', d => {
            return `translate(${arc.centroid(d)})`;
          })
          .attr('dy', '.35em')
          .attr('text-anchor', 'middle')
          .text(d => d.data.id);
    }

    _chart.width = function (w) {
      if (!arguments.length) return _width;
      _width = w;
      return _chart;
    };

    _chart.height = function (h) { // <-1C
      if (!arguments.length) return _height;
      _height = h;
      return _chart;
    };

    _chart.margins = function (m) {
      if (!arguments.length) return _margins;
      _margins = m;
      return _chart;
    };

    _chart.colors = function (c) {
      if (!arguments.length) return _colors;
      _colors = c;
      return _chart;
    };

    _chart.data = function(d) {
      if (!arguments.length) return _data;
      _data = d;
      return _chart;
    };

    return _chart;
  }

  function randomData() {
    return Math.random() * 9 + 1;
  }

  function update() {
    for (let item of data) {
      item.value = randomData();
    }
    chart.render();
  }

  window.update = update;

  var chart,
      numberOfDataPoint = 6,
      data = [];

  data = d3.range(numberOfDataPoint).map((i) => ({ id: i, value: randomData() }));

  chart = pieChart().data(data).render();
}());