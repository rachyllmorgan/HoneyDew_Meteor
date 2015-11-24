Lists = new Mongo.Collection('Lists');

  if (Meteor.isClient) {
  // This code only runs on the client
  Template.home.helpers({
    lists: function () {
      return Lists.find({});
    }
  });
}
// Lists.allow({
//   insert: function(userId, doc) {
//     return doc.userId === userId;
//   }
// });

// Lists.latest = function() {
//   return Lists.find({}, {sort: {date: -1}, limit: 1});
// }

// Meteor.methods({
//   createLists: function(event, loc) {
//     check(Meteor.userId(), String);
//     check(event, {
//       listName: String,
//       userName: String,
//       createdAt: new Date()
//     });
//     check(loc, Match.OneOf(Object, null));
    
//     event.userId = Meteor.userId();
//     event.userName = Meteor.user().profile.name;
//     event.date = new Date;
    
//     var id = Lists.insert(event);
    
//     return id;
//   }
// });

// // Initialize a seed event
// Meteor.startup(function() {
//   if (Meteor.isServer && Lists.find().count() === 0) {
//     Lists.insert({
//       listName: 'Groceries',
//       userAvatar: 'https://avatars3.githubusercontent.com/u/204768?v=2&s=400',
//       userName: 'Rachel Morgan',
//       date: new Date
//     });
//   }
// });

