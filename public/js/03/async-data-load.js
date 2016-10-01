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

  function render(data) {
    d3.select('body').selectAll('div.h-bar').data(data)
        .enter().append('div').classed('h-bar', true).append('span');

    d3.select('body').selectAll('div.h-bar').data(data)
        .exit().remove();

    d3.select('body')
        .selectAll('div.h-bar').data(data)
        .style('width', (d) => {return `${d.expense * 5}px`;})
        .select('span').text((d) => {return d.category;});
  }

  render(data);

  window.load = () => {
    d3.json('data.json', (error, json) => {
      data = data.concat(json);
      render(data);
    });
  };

}());