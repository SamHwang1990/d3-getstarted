/**
 * Created by sam on 16/10/6.
 */

;(function() {

  var width = 500;
  var height = 500;
  var margin = 50;

  var x = d3.scaleLinear().domain([0, 10]).range([margin, width - margin]);
  var y = d3.scaleLinear().domain([0, 10]).range([height - margin, margin]);

  var data = [
      [
        {x: 0, y: 5}, {x: 1, y: 9}, {x: 2, y: 7},
        {x: 3, y: 5}, {x: 4, y: 3}, {x: 6, y: 4},
        {x: 7, y: 2}, {x: 8, y: 3}, {x: 9, y: 2}
      ],
      d3.range(10).map(i => ({x: i, y: Math.sin(i) + 5}))
  ];

  var svg = d3.select('body').append('svg');
  svg.attr('height', height)
      .attr('width', width);

  // draw x axis
  svg.append('g')
      .classed('x-axis', true)
      .attr('transform', () => `translate(${margin}, ${height - margin})`)
      .call(d3.axisBottom(d3.scaleLinear().domain([0, 100]).range([0, width - 2 * margin])));

  // draw y axis
  svg.append('g')
      .classed('y-axis', true)
      .attr('transform', () => `translate(${margin}, ${margin})`)
      .call(d3.axisLeft(d3.scaleLinear().domain([100, 0]).range([0, height - 2 * margin])));

  window.render = function(mode) {
    var line = d3.line()
        .curve(d3[`curve${mode}`])
        .x(d => x(d.x))
        .y(d => y(d.y));

    svg.selectAll('path.line')
        .data(data)
        .enter()
        .append('path')
        .classed('line', true);

    svg.selectAll('path.line')
        .data(data)
        .attr('d', d => line(d));
  };

  function renderDots(svg) {
    data.forEach(dataSet => {
      svg.append('g').selectAll('circle')
          .data(dataSet)
          .enter()
          .append('circle')
          .attr('class', 'dot')
          .attr('cx', d => x(d.x))
          .attr('cy', d => y(d.y))
          .attr('r', 4.5);
    });
  }

  render('Linear');
  renderDots(svg);

}());