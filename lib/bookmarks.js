BookmarkCounts = new Mongo.Collection('bookmarkCounts');

Meteor.methods({
  'bookmarkList': function(listName) {
    check(this.userId, String);
    check(listName, String);

    var affected = Meteor.users.update({
      _id: this.userId,
      bookmarkedListNames: {$ne: listName}
    }, {
      $addToSet: {bookmarkedListNames: listName}
    });

    if (affected)
      BookmarkCounts.update({listName: listName}, {$inc: {count: 1}});
  },

  'unbookmarkList': function(listName) {
    check(this.userId, String);
    check(listName, String);

    var affected = Meteor.users.update({
      _id: this.userId,
      bookmarkedListNames: listName
    }, {
      $pull: {bookmarkedListNames: listName}
    });

    if (affected)
      BookmarkCounts.update({listName: listName}, {$inc: {count: -1}});
  }
});

// Initialize bookmark counts. We could use upsert instead.
if (Meteor.isServer && BookmarkCounts.find().count() === 0) {
  Meteor.startup(function() {
    _.each(ListsData, function(list, listName) {
      BookmarkCounts.insert({listName: listName, count: 0});
    });
  });
}