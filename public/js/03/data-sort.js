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

  function render(data, comparator) {
    d3.select('body').selectAll('div.h-bar').data(data)
        .enter().append('div').classed('h-bar', true).append('span');

    d3.select('body').selectAll('div.h-bar').data(data)
        .exit().remove();

    d3.select('body')
        .selectAll('div.h-bar').data(data)
        .style('width', (d) => {return `${d.expense * 5}px`;})
        .select('span').text((d) => {return comparator === compareByExpense ? d.expense : d.category;});

    if (comparator) {
      d3.select('body').selectAll('div.h-bar').sort(comparator);
    }
  }

  var compareByExpense = (a, b) => {
    return a.expense < b.expense ? -1 : 1;
  };

  var compareByCategory = (a, b) => {
    return a.category < b.category ? -1 : 1;
  };

  render(data);

  window.sort = (type) => {
    switch (type) {
      case 'expense':
        render(data, compareByExpense);
        break;
      case 'category':
        render(data, compareByCategory);
        break;
      default:
        render(data);
        break;
    }
  };

}());