// Events = new Mongo.Collection('Events');

// Events.allow({
//   insert: function(userId, doc) {
//     return doc.userId === userId;
//   }
// });

// Events.latest = function() {
//   return Events.find({}, {sort: {date: -1}, limit: 1});
// }

// Meteor.methods({
//   createEvents: function(event, loc) {
//     check(Meteor.userId(), String);
//     check(event, {
//       recipeName: String,
//       text: String,
//       image: String
//     });
//     check(loc, Match.OneOf(Object, null));
    
//     event.userId = Meteor.userId();
//     event.userName = Meteor.user().profile.name;
//     event.date = new Date;
    
//     var id = Events.insert(event);
    
//     return id;
//   }
// });

// // Initialize a seed event
// Meteor.startup(function() {
//   if (Meteor.isServer && Events.find().count() === 0) {
//     Events.insert({
//       eventName: 'Dill & Liz\'s Wedding',
//       text: 'It starts @ 1pm',
//       image: 'https://ci5.googleusercontent.com/proxy/8Bzby15qTWijWKez2xSWUNNYdJIGKKuszPP1LM45_ebH53N4ZR8fR9n2iNcm5Es_7fCoColCV2QzfRMeymzbwTFJ4kRZL4nHUx3U1kuwI96tSyrsZuEGDl_MzJgFfYRPec4eeagVh8BK4FgaXw=s0-d-e1-ft#https://www.evite.com/plus/images/02AECEA5SSHCIM6C4EPE3IZDNNS4UE/combo.png?t=1428885547',
//       userAvatar: 'https://avatars3.githubusercontent.com/u/204768?v=2&s=400',
//       userName: 'Matt Debergalis',
//       place: 'Mt. Juliet, TN',
//       date: new Date
//     });
//   }
// });

