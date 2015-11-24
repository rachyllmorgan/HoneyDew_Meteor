Template.event.onRendered(function() {
  var self = this;

  // If the event is in a list, scroll it into view. Note, we can't just use
  // element.scrollIntoView() because it attempts to scroll in the X direction
  // messing up our animations
  if (Router.current().params.eventId === self.data._id) {
    var $event = $(self.firstNode);
    var top = $event.offset().top;
    var $parent = $(self.firstNode).closest('.content-scrollable');
    var parentTop = $parent.offset().top;
    $parent.scrollTop(top - parentTop);
  }
});

Template.event.helpers({
  firstName: function() {
    return this.userName.split(' ')[0];
  },
  listTitle: function() {
    return ListsData[this.listName].title;
  },
  path: function() {
    return Router.path('lists', { name: this.listName },
      { query: { _id: this._id } })
  }
})
