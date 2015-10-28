Template.feed.helpers({
  events: function() {
    return Events.find({}, {sort: {date: -1}});
  },
  ready: function() {
    return Router.current().feedSubscription.ready();
  }
})