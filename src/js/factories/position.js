angular
  .module("portfolio")
  .factory("Position", Position);

function Position() {
  return {
    random: function() {
      var x = Math.floor(Math.random() * 10);
      var y = Math.floor(Math.random() * 100);
      return [x,y];
    }
  };
}