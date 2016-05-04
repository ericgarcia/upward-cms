var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * ContentType Model
 * ==========
 */

 var ContentType = new keystone.List('ContentType', {
     autokey: { path: 'slug', from: 'title', unique: true },
     map: { name: 'title' },
     defaultSort: '-createdAt'
 });

ContentType.add({
  title: { type: String, initial: true, required: true, index: true },
  description: { type: Types.Textarea },
  createdAt: { type: Date, default: Date.now }
});

/**
 * Registration
 */

ContentType.defaultColumns = 'title|20%, description';
ContentType.register();
