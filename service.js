"use strict";

(function(){

var service = function($http){
  var onSuccess = function(response){
    return response.data;
  };
  
  var getBooks = function(){
    return $http.get("http://sinasapi.azurewebsites.net/api/books/")
                .then(onSuccess);
  };
  
  var getBookDetails = function(id){
    return $http.get("http://sinasapi.azurewebsites.net/api/books/" + id)
                .then(onSuccess);
  };
  
  return{
    getBooks: getBooks,
    getBookDetails: getBookDetails
  };
};

var app = angular.module("app");
app.factory("service", ["$http", service]);
  
}());