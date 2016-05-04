var keystone = require('keystone'),
    Types = keystone.Field.Types;

var Resource = new keystone.List('Resource', {
    autokey: { path: 'slug', from: 'title', unique: true },
    map: { name: 'title' },
    defaultSort: '-createdAt'
});

Resource.add({
    title: { type: String, required: true, initial: true },
    state: { type: Types.Select, options: 'published, archived', default: 'published' },
    owner: { type: Types.Relationship, ref: 'User' },
    author: { type: String },
    subjects: { type: Types.Relationship, ref: 'Subject', many: true },
    contentTypes: { type: Types.Relationship, ref: 'ContentType', many: true },
    license: { type: Types.Relationship, ref: 'License' },
    publicationYear: Number,
    createdAt: { type: Date, default: Date.now },
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

Resource.defaultColumns = 'title, state|15%, subjects, contentTypes, content'
Resource.register();
