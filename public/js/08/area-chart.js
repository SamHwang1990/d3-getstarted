/**
 * Created by sam on 16/10/14.
 */

;(function () {

  function lineChart() {
    var _chart = {};
    var _width = 600, _height = 300, // <-1B
        _margins = {top: 30, left: 30, right: 30, bottom: 30},
        _x, _y,
        _data = [],
        _colors = d3.schemeCategory10,
        _svg,
        _bodyG,
        _line;

    _chart.render = function () {
      if (!_svg) {
        _svg = d3.select("body").append("svg")
            .attr("height", _height)
            .attr("width", _width);
        renderAxes(_svg);
        defineBodyClip(_svg);
      }
      renderBody(_svg);
    };

    function renderAxes(svg) {
      var axesG = svg.append("g")
          .attr("class", "axes");
      renderXAxis(axesG);
      renderYAxis(axesG);
    }

    function renderXAxis(axesG){
      var xAxis = d3.axisBottom().scale(_x.range([0, quadrantWidth()]))
      axesG.append("g")
          .attr("class", "x axis")
          .attr("transform", function () {
            return "translate(" + xStart() + "," + yStart() + ")";
          })
          .call(xAxis);

      d3.selectAll("g.x g.tick")
          .append("line")
          .classed("grid-line", true)
          .attr("x1", 0)
          .attr("y1", 0)
          .attr("x2", 0)
          .attr("y2", - quadrantHeight());
    }

    function renderYAxis(axesG){
      var yAxis = d3.axisLeft().scale(_y.range([quadrantHeight(), 0]));

      axesG.append("g")
          .attr("class", "y axis")
          .attr("transform", function () {
            return "translate(" + xStart() + "," + yEnd() + ")";
          })
          .call(yAxis);

      d3.selectAll("g.y g.tick")
          .append("line")
          .classed("grid-line", true)
          .attr("x1", 0)
          .attr("y1", 0)
          .attr("x2", quadrantWidth())
          .attr("y2", 0);
    }

    function defineBodyClip(svg) {
      var padding = 5;
      svg.append("defs")
          .append("clipPath")
          .attr("id", "body-clip")
          .append("rect")
          .attr("x", 0 - padding)
          .attr("y", 0)
          .attr("width", quadrantWidth() + 2 * padding)
          .attr("height", quadrantHeight());
    }

    function renderBody(svg) {
      if (!_bodyG)
        _bodyG = svg.append("g")
            .attr("class", "body")
            .attr("transform", "translate("
                + xStart() + ","
                + yEnd() + ")") // <-2E
            .attr("clip-path", "url(#body-clip)");
      renderLines();
      renderAreas();
      renderDots();
    }

    function renderLines() {
      _line = d3.line()
          .x(function (d) { return _x(d.x); })
          .y(function (d) { return _y(d.y); });

      _bodyG.selectAll("path.line")
          .data(_data)
          .enter() //<-4B
          .append("path")
          .style("stroke", function (d, i) {
            return _colors[i];
          })
          .attr("class", "line");
      _bodyG.selectAll("path.line")
          .data(_data)
          .transition()
          .attr("d", function (d) { return _line(d); });
    }

    function renderDots() {
      _data.forEach(function (list, i) {
        _bodyG.selectAll("circle._" + i) //<-4E
            .data(list)
            .enter()
            .append("circle")
            .attr("class", "dot _" + i);
        _bodyG.selectAll("circle._" + i)
            .data(list)
            .style("stroke", function (d) {
              return _colors[i]; //<-4F
            })
            .transition() //<-4G
            .attr("cx", function (d) { return _x(d.x); })
            .attr("cy", function (d) { return _y(d.y); })
            .attr("r", 4.5);
      });
    }

    function renderAreas() {
      var area = d3.area()
          .x(d => _x(d.x))
          .y0(yStart())
          .y1(d => _y(d.y));

      _bodyG.selectAll('path.area')
          .data(_data)
          .enter()
          .append('path')
          .classed('area', true)
          .style('fill', (d, i) => _colors[i]);

      _bodyG.selectAll('path.area')
          .data(_data)
          .transition()
          .attr('d', d => area(d));
    }

    function xStart() {
      return _margins.left;
    }

    function yStart() {
      return _height - _margins.bottom;
    }

    function xEnd() {
      return _width - _margins.right;
    }

    function yEnd() {
      return _margins.top;
    }

    function quadrantWidth() {
      return _width - _margins.left - _margins.right;
    }

    function quadrantHeight() {
      return _height - _margins.top - _margins.bottom;
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

    _chart.x = function (x) {
      if (!arguments.length) return _x;
      _x = x;
      return _chart;
    };

    _chart.y = function (y) {
      if (!arguments.length) return _y;
      _y = y;
      return _chart;
    };

    _chart.addSeries = function (series) {
      _data.push(series);
      return _chart;
    };

    return _chart;
  }

  function randomData() {
    return Math.random() * 9;
  }

  function update() {
    for (var i = 0; i < data.length; ++i) {
      var series = data[i];
      series.length = 0;
      for (var j = 0; j < numberOfDataPoint; ++j)
        series.push({x: j, y: randomData()});
    }
    chart.render();
  }

  window.update = update;

  var numberOfSeries = 2,
      numberOfDataPoint = 11,
      data = [];
  for (var i = 0; i < numberOfSeries; ++i)
    data.push(d3.range(numberOfDataPoint).map(function (i) {
      return {x: i, y: randomData()};
    }));

  var chart = lineChart()
      .x(d3.scaleLinear().domain([0, 10]))
      .y(d3.scaleLinear().domain([0, 10]));

  data.forEach(function (series) {
    chart.addSeries(series);
  });

  chart.render();

}());