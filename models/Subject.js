var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Subject Model
 * ==========
 */

 var Subject = new keystone.List('Subject', {
     autokey: { path: 'slug', from: 'title', unique: true },
     map: { name: 'title' },
     defaultSort: 'slug'
 });

Subject.add({
  title: { type: String, initial: true, required: true, index: true },
  description: { type: Types.Textarea },
  createdAt: { type: Date, default: Date.now }
});

/**
 * Registration
 */

Subject.defaultColumns = 'title|20%, description';
Subject.register();
