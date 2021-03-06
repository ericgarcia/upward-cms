var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * ResourceType Model
 * ==========
 */

 var ResourceType = new keystone.List('ResourceType', {
     autokey: { path: 'slug', from: 'title', unique: true },
     map: { name: 'title' },
     defaultSort: '-createdAt'
 });

ResourceType.add({
  title: { type: String, initial: true, required: true, index: true },
  description: { type: Types.Textarea },
  createdAt: { type: Date, default: Date.now }
});

/**
 * Registration
 */

ResourceType.defaultColumns = 'title|20%, description';
ResourceType.register();
