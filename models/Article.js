var keystone = require('keystone'),
    Types = keystone.Field.Types;

var Article = new keystone.List('Article', {
    autokey: { path: 'slug', from: 'title', unique: true },
    map: { name: 'title' },
    defaultSort: '-createdAt'
});

Article.add({
    title: { type: String, required: true },
    state: { type: Types.Select, options: 'published, archived', default: 'published' },
    owner: { type: Types.Relationship, ref: 'User' },
    author: { type: String, required: true },
    // source: { type: Types.Relationship, ref: 'Source' },
    // categories: { type: Types.Relationship, ref: 'Category', many: true },
    contentType: { type: Types.Relationship, ref: 'ContentType'},
    publicationDate: Date,
    // createdAt: { type: Date, default: Date.now },
    // image: { type: Types.CloudinaryImage },
    content: {
    	type: Types.S3File,
    	filename: function(item, filename){
    		// prefix file name with object id
    		return item._id + '-' + filename;
    	},
      format: function(item, file){
    		return '<a href="http:'+file.url+'"> '+file.originalname +' </a>'
    	}
    }
});

Article.defaultColumns = 'title, state|20%, contentType, content%'
Article.register();
