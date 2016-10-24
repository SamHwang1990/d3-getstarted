/**
 * Created by sam on 16/10/23.
 */

/**
 * Created by sam on 16/10/14.
 */

;(function () {

  function treemapChart() {
    var _chart = {};
    var _width = 1600,
        _height = 800,
        _colors = d3.schemeCategory20,
        _x = d3.scaleLinear().range([0, _width]),
        _y = d3.scaleLinear().range([0, _height]),
        _valueAccessor = d => 1,
        _nodes,
        _treemap,
        _svg,
        _bodyG;

    _chart.render = function () {
      if (!_svg) {
        _svg = d3.select("body").append("svg")
            .attr("height", _height)
            .attr("width", _width);
      }
      renderBody(_svg);
    };

    function renderBody(svg) {
      if (!_bodyG) {
        _bodyG = svg.append("g")
            .attr("class", "body");

        _treemap = d3.treemap().size([_width, _height]).round(false);
      }

      var hierarchyNode = d3.hierarchy(_nodes)
          .sum(_valueAccessor)
          .sort(function(a, b) { return b.height - a.height || b.value - a.value; });
      var nodes = _treemap(hierarchyNode).descendants();
      renderCells(nodes);
    }

    function renderCells(nodes) {
      var enterCells = _bodyG.selectAll('g.cell').data(nodes)
          .enter()
          .append('g')
          .classed('cell', true);

      enterCells.append('rect');
      enterCells.append('text');

      var cells = _bodyG.selectAll('g.cell').data(nodes);

      cells.transition()
          .attr('transform', d => `translate(${d.x0},${d.y0})`);
      cells.select('rect')
          .attr('width', d => d.x1 - d.x0 - 1)
          .attr('height', d => d.y1 - d.y0 - 1)
          .style('fill', (d, i) => _colors[i % 20]);
      cells.select('text')
          .attr('x', d => (d.x1 - d.x0) / 2)
          .attr('y', d => (d.y1 - d.y0) /2 )
          .attr('dy', '.35em')
          .attr('text-anchor', 'middle')
          .text(d => d.data.name)
          .style('opacity', function(d) {
            var width = this.getComputedTextLength();
            return d.x1 - d.x0 - width > 0 ? 1 : 0;
          });

      _bodyG.selectAll('g.cell').data(nodes).exit().remove();
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

    _chart.colors = function (c) {
      if (!arguments.length) return _colors;
      _colors = c;
      return _chart;
    };

    _chart.nodes = function(n) {
      if (!arguments.length) return _nodes;
      _nodes = n;
      return _chart;
    };

    _chart.valueAccessor = function(v) {
      if (!arguments.length) return _valueAccessor;
      _valueAccessor = v;
      return _chart;
    };

    return _chart;
  }

  function size(d) {
    return d.size;
  }

  function count() {
    return 1;
  }

  window.largeFlare = function() {
    d3.json("/data/flare.json", function (nodes) {
      chart.nodes(nodes).render();
    });
  };

  window.flip = function() {
    chart.valueAccessor(chart.valueAccessor() == size ? count : size).render();
  };

  window.chart = treemapChart();


}());
