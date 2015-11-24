var FEATURED_COUNT = 4;

Template.home.helpers({
  // // selects FEATURED_COUNT number of lists at random
  // featuredLists: function() {
  //   var lists = _.values(ListsData);
  //   var selection = [];
    
  //   for (var i = 0;i < FEATURED_COUNT;i++)
  //     selection.push(lists.splice(_.random(lists.length - 1), 1)[0]);

  //   return selection;
  // },
  
  // activities: function() {
  //   return Activities.latest();
  // },
  
  // latestNews: function() {
  //   return News.latest();
  // }
    lists: function() {
      return Lists.find({});
    }
});