;(function () {

// var app = angular.module('myApp', ['ngMockE2E', 'restangular', 'ui.router']);
  app.run(($httpBackend) => {
    $httpBackend.whenGET(/\.html$/).passThrough();
    $httpBackend.whenGET('/users').respond(window.mocks.users);
  });

  app.controller('UserController', function(UserService){
    UserService.getAll().then(users => {
      this.users = users;
    });
  });

  app.directive('userList', function(UserService){
    return {
      restrict: 'E',
      scope: true,
      templateUrl: 'user-list.html',
      link: function(scope){
        UserService.getAll().then(users => {
          scope.users = users;
        });
      }
    }
  });

  app.controller('UserController', function(UserService, $state, $stateParams){
    this.isUserEditMode = !!$stateParams.edit || >$state.current.name === 'userAdd';

    if(!!$stateParams.userId){
      UserService.getOne($stateParams.userId).then(user => {
        this.user = user;
      });
    } else{
      this.user = {};
    }
  });



  app.directive('userCard', function($state, UserService){
    return {
      restrict: 'E',
      replace: true,
      scope: {
        user: '=',
        isEdit: '='
      },
      templateUrl: "user-card.html",
      link: function(scope){
        scope.isEdit = true;
      }
    }
  });

  app.directive('avatar', function(){
    return {
      restrict: 'E',
      replace: true,
      scope: {
        user: '='
      },
      templateUrl: "avatar.html"
    }
  });


  app.directive('userValidation', function(){
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function(scope, element, attrs, ngModelController){
        ngModelController.$setViewValue('Hello!');
      }
    }
  });

  app.service('UserService', function(Restangular){
    this.getOne = function(id){
      return  Restangular.one('users', id).get();
    };
    this.getAll = function(){
      return Restangular.all('users').getList();
    };
  });


}());
