/**
 * Created by sam on 16/10/1.
 */

;(function() {

  var data = [ // <-A
    {expense: 10, category: "Retail"},
    {expense: 15, category: "Gas"},
    {expense: 30, category: "Retail"},
    {expense: 50, category: "Dining"},
    {expense: 80, category: "Gas"},
    {expense: 65, category: "Retail"},
    {expense: 55, category: "Gas"},
    {expense: 30, category: "Dining"},
    {expense: 20, category: "Retail"},
    {expense: 10, category: "Dining"},
    {expense: 8, category: "Gas"}
  ];

  function render(data, category) {
    d3.select('body').selectAll('div.h-bar').data(data)
        .enter().append('div').classed('h-bar', true).append('span');

    d3.select('body').selectAll('div.h-bar').data(data)
        .exit().remove();

    d3.select('body')
        .selectAll('div.h-bar').data(data)
        .classed('selected', false)
        .style('width', (d) => {return `${d.expense * 5}px`;})
        .select('span').text((d) => {return d.category;});

    // 除了下面的方法,还可以从数据源入手filter
    d3.select('body').selectAll('div.h-bar')
        .filter((d, i) => {return d.category == category;}).classed('selected', true);
  }

  render(data);

  window.select = (category) => render(data, category);

}());