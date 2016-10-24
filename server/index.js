/**
 * Created by sam on 16/9/23.
 */


var path = require('path');
var koa = require('koa');
var logger = require('koa-logger');
var views = require('koa-views');
var router = require('koa-router')();
var fs = require('co-fs');
// var debug = require('debug')('d3.js started server');

var app = new koa();

app.use(logger());
app.use(require('koa-static')(path.resolve(__dirname, '../')));

app.use(views(path.resolve(__dirname, '../views'), {
  extension: 'pug'
}));

router.get('/', function* (next) {
  yield this.render('index');
});

router.get('/chapters/03/data.json', function* (next) {
  this.body = [
    {
      expense: 15,
      category: 'Retail'
    },
    {
      expense: 18,
      category: 'Gas'
    },
    {
      expense: 15,
      category: 'Gas'
    }
  ]
});

router.get('/data/flare.json', function* (next) {
  var data = yield fs.readFile(path.resolve(__dirname, 'flare.json'), 'utf8');
  this.body = data;
});

router.get('/chapters/:chapter/:page', function* (next) {
  yield this.render(`${this.params.chapter}/${this.params.page}`, {
    chapter: this.params.chapter,
    page: this.params.page
  })
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000, () => {
  console.log('Listening on 3000');
  // debug('Listening on 3000');
});