var TAB_KEY = 'listShowTab';

Template.list.onCreated(function() {
  if (Router.current().params.eventId)
    Template.list.setTab('feed');
  else
    Template.list.setTab('list');
});

Template.list.onRendered(function () {
  this.$('.list').touchwipe({
    wipeDown: function () {
      if (Session.equals(TAB_KEY, 'list'))
        Template.list.setTab('make')
    },
    preventDefaultEvents: false
  });
  this.$('.attribution-list').touchwipe({
    wipeUp: function () {
      if (! Session.equals(TAB_KEY, 'list'))
        Template.list.setTab('list')
    },
    preventDefaultEvents: false
  });
});

// CSS transitions can't tell the difference between e.g. reaching
//   the "make" tab from the expanded state or the "feed" tab
//   so we need to help the transition out by attaching another
//   class that indicates if the feed tab should slide out of the
//   way smoothly, right away, or after the transition is over
Template.list.setTab = function(tab) {
  var lastTab = Session.get(TAB_KEY);
  Session.set(TAB_KEY, tab);
  
  var fromList = (lastTab === 'list') && (tab !== 'list');
  $('.feed-scrollable').toggleClass('instant', fromList);

  var toList = (lastTab !== 'list') && (tab === 'list');
  $('.feed-scrollable').toggleClass('delayed', toList);
}

Template.list.helpers({
  isActiveTab: function(name) {
    return Session.equals(TAB_KEY, name);
  },
  activeTabClass: function() {
    return Session.get(TAB_KEY);
  },
  bookmarked: function() {
    return Meteor.user() && _.include(Meteor.user().bookmarkedListNames, this.name);
  },
  events: function() {
    return events.find({listName: this.name}, {sort: {date: -1}});
  }
});

Template.list.events({
  'click .js-add-bookmark': function(event) {
    event.preventDefault();

    if (! Meteor.userId())
      return Overlay.open('authOverlay');
    
    Meteor.call('bookmarkList', this.name);
  },

  'click .js-remove-bookmark': function(event) {
    event.preventDefault();

    Meteor.call('unbookmarkList', this.name);
  },
  
  'click .js-show-list': function(event) {
    event.stopPropagation();
    Template.list.setTab('make')
  },
  
  'click .js-show-feed': function(event) {
    event.stopPropagation();
    Template.list.setTab('feed')
  },
  
  'click .js-uncollapse': function() {
    Template.list.setTab('list')
  },

  'click .js-share': function() {
    Overlay.open('shareOverlay', this);
  }
});
