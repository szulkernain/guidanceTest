"use strict";

(function(){

var modalInstanceController = function($scope, $uibModalInstance, book, service){
  var onSuccess = function(data){
    $scope.book = data;
  };
  var onError = function(reason){
    $scope.error = "Couldn't fetch data";
  };
  
  service.getBookDetails(book.ISBN)
          .then(onSuccess, onError);
  
  $scope.ok = function () {
    $uibModalInstance.close();
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
};

var app = angular.module("app");
app.controller("modalInstanceController", ["$scope", "$uibModalInstance", "book", "service", modalInstanceController]);
  
}());