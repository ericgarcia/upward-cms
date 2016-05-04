var keystone = require('keystone');

exports = module.exports = function(req, res) {

  var view = new keystone.View(req, res);
  var locals = res.locals;

  // locals.section is used to set the currently selected
  // item in the header navigation.
  locals.section = 'home';
  locals.data = {
    resources: []
  };
  locals.protocol = req.protocol;

  // Load the Resources
  view.on('init', function(next) {
    console.log("query resources")

    var Resource = keystone.list('Resource');

    Resource.model.find()
      // .limit(3)
      .where('state', 'published')
      .populate('subjects')
      .populate('resourceTypes')
      .exec(function(err, results) {
        console.log(results);
        locals.data.resources = results;
        next(err);
      });

  });

  // Render the view
  view.render('index');

};
