var keystone = require('keystone');

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'home';
  locals.data = {
		articles: []
	};
  locals.protocol = req.protocol;

	// Load the Articles
	view.on('init', function(next) {
    console.log("query articles")

		var Article = keystone.list('Article');

		Article.model.find()
			.limit(3)
			.where('state', 'published')
			// .populate('owner')
			.exec(function(err, results) {
				locals.data.articles = results;
				next(err);
			});

	});

  // Render the view
	view.render('index');

};
