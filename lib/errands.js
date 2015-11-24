Errands = new Mongo.Collection('Errands');

Errands.allow({
  insert: function(userId, doc) {
    return doc.userId === userId;
  }
});

Errands.latest = function() {
  return Errands.find({}, {sort: {date: -1}, limit: 1});
}

Meteor.methods({
  createErrands: function(event, loc) {
    check(Meteor.userId(), String);
    check(event, {
      taskName: String,
      dueDate: Date,
      notes: String
    });
    check(loc, Match.OneOf(Object, null));
    
    event.userId = Meteor.userId();
    event.userName = Meteor.user().profile.name;
    event.date = new Date;
    
    var id = Errands.insert(event);
    
    return id;
  }
});

// Initialize a seed event
Meteor.startup(function() {
  if (Meteor.isServer && Errands.find().count() === 0) {
    Errands.insert({
      taskName: 'Change filters',
      userAvatar: 'https://avatars3.githubusercontent.com/u/204768?v=2&s=400',
      userName: 'Rachel Morgan',
      date: new Date,
      notes: 'Need from Home Depot'
    });
  }
});