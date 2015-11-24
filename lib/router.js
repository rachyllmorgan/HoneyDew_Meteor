var feedSubscription;

// Handle for launch screen possibly dismissed from app-body.js
dataReadyHold = null;

// Global subscriptions
if (Meteor.isClient) {
  Meteor.subscribe('news');
  feedSubscription = Meteor.subscribe('whats_to_dew');
}

Router.configure({
  layoutTemplate: 'appBody',
  notFoundTemplate: 'notFound'
});

if (Meteor.isClient) {
  // Keep showing the launch screen on mobile devices until we have loaded
  // the app's data
  dataReadyHold = LaunchScreen.hold();
}

// HomeController = RouteController.extend({
//   onBeforeAction: function () {
//     Meteor.subscribe('latestEvent', function () {
//       dataReadyHold.release();
//     });
//   }
// });

FeedController = RouteController.extend({
  onBeforeAction: function () {
    this.feedSubscription = feedSubscription;
  }
});

ListsController = RouteController.extend({
  data: function () {
    return _.values(RecipesData);
  }
});

ListsController = RouteController.extend({
  onBeforeAction: function () {
    Meteor.subscribe('whats_to_dew', this.params.name);
  },
});

AdminController = RouteController.extend({
  onBeforeAction: function () {
    Meteor.subscribe('news');
  }
});

Router.route('home', {
  path: '/'
});

Router.route('about');

Router.route('whats_to_dew', {
  path: '/whats_to_dew'
});

Router.route('admin', {
  layoutTemplate: null
});

Router.onBeforeAction('dataNotFound', {
  only: 'whats_to_dew'
});
