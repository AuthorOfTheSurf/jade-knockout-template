// Script for the homepage, this is mostly knockout code.
// I use the .ko.js convention to signal that the script is
// mostly knockout code, i.e. a ViewModel

// In this example, data is expected to be the same JSON blob that was given
// to the Jade template.
var HomepageViewModel = function (data) {
  var self = this;

  self.title = ko.observable(data.title);
  self.subtitle = ko.observable(data.subtitle);
  // data.subtitle is empty! Lets put an actual subtitle there!
  self.subtitle("I am a subtitle written purely from the Knockout-side!");
};