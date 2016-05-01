var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * License Model
 * ==========
 */

 var License = new keystone.List('License', {
     autokey: { path: 'slug', from: 'title', unique: true },
     map: { name: 'title' },
     defaultSort: '-createdAt'
 });

License.add({
  title: { type: String, initial: true, required: true, index: true },
  description: { type: Types.Textarea },
  createdAt: { type: Date, default: Date.now }
});

/**
 * Registration
 */

License.defaultColumns = 'title|30%, description';
License.register();
