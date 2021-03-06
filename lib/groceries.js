Groceries = new Mongo.Collection('Groceries');

Groceries.allow({
  insert: function(userId, doc) {
    return doc.userId === userId;
  }
});

Groceries.latest = function() {
  return Groceries.find({}, {sort: {date: -1}, limit: 1});
}

Meteor.methods({
  createGroceries: function(event, loc) {
    check(Meteor.userId(), String);
    check(event, {
      itemName: String,
      amount: String
    });
    check(loc, Match.OneOf(Object, null));
    
    event.userId = Meteor.userId();
    event.userName = Meteor.user().profile.name;
    event.date = new Date;
    
    var id = Groceries.insert(event);
    
    return id;
  }
});

// Initialize a seed event
Meteor.startup(function() {
  if (Meteor.isServer && Groceries.find().count() === 0) {
    Groceries.insert({
      listName: 'Groceries',
      userAvatar: 'https://avatars3.githubusercontent.com/u/204768?v=2&s=400',
      userName: 'Rachel Morgan',
      date: new Date
    });
  }
});