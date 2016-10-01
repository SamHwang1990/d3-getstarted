/**
 * Created by sam on 16/9/29.
 */
;(function() {
  function SimpleWidget(spec) {
    var headline, description;

    var instance = {};

    instance.render = () => {
      var div = d3.select('body').append('div');
      div.append('h3').text(headline);

      div.attr('class', 'box').attr('style', `color: ${spec.color}`).append('p').text(description);

      return instance;
    }

    instance.headline = (h) => {
      if (!h) return headline;
      headline = h;
      return instance;
    };

    instance.description = (d) => {
      if (!d) return description;
      description = d;
      return instance;
    };

    return instance;
  }

  var widget = SimpleWidget({color: '#6495ed'})
      .headline('Simple Widget')
      .description('This is a simple widget demonstrating functional javascript.');
  widget.render();
}());