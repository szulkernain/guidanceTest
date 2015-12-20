"use strict";

(function(){

var processData = function(books){
  var dict = {};
  
  for (var i = 65; i <= 90; i++)
  {
    dict[String.fromCharCode(i)] = [];
  }
  
  for (var i = 0; i < books.length; i++)
  {
    dict[books[i].Initial].push(books[i]);
  }
  
  return dict;
};

var controller = function($scope, $location, $anchorScroll, $uibModal, service){
  $scope.animationsEnabled = true;
  
  $scope.open = function (id) {

    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'details.html',
      controller: 'modalInstanceController',
      resolve: {
        book: function () {
          return {"ISBN": id};
        }
      }
    });
  };

  $scope.toggleAnimation = function () {
    $scope.animationsEnabled = !$scope.animationsEnabled;
  };
  
  var onSuccess = function(data){
    $scope.dict = processData(data);
  };
  var onError = function(reason){
    $scope.error = "Couldn't fetch data";
  };
  
  $scope.goToAnchor = function(x){
    var newHash = 'anchor' + x;
    
    if ($location.hash() !== newHash)
    {
      $location.hash(newHash);
    }
    else
      $anchorScroll();
  };
  
  service.getBooks()
          .then(onSuccess, onError);
};

var app = angular.module('app');
app.controller("controller", ["$scope", "$location", "$anchorScroll", "$uibModal", "service", controller]);

  
}());