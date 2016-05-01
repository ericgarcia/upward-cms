var keystone = require('keystone'),
    Types = keystone.Field.Types;

var Article = new keystone.List('Article', {
    autokey: { path: 'slug', from: 'title', unique: true },
    map: { name: 'title' },
    defaultSort: '-createdAt'
});

Article.add({
    title: { type: String, required: true, initial: true },
    state: { type: Types.Select, options: 'published, archived', default: 'published' },
    owner: { type: Types.Relationship, ref: 'User' },
    author: { type: String },
    // source: { type: Types.Relationship, ref: 'Source' },
    subjects: { type: Types.Relationship, ref: 'Subject', many: true },
    contentTypes: { type: Types.Relationship, ref: 'ContentType', many: true },
    publicationYear: Number,
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

Article.defaultColumns = 'title, state|15%, subjects, contentTypes, content'
Article.register();
