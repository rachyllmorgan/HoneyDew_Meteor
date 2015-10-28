Template.listItem.helpers({
  path: function () {
    return Router.path('list', this.list);
  },
  
  highlightedClass: function () {
    if (this.size === 'large')
      return 'highlighted';
  },
  
  bookmarkCount: function () {
    var count = BookmarkCounts.findOne({listName: this.name});
    return count && count.count;
  }
});