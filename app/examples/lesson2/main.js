;(function () {

'use strict';

var app = angular.module('myApp', []);

app.controller("UserController", function(UserService){
  this.users = UserService.getAll();
});

app.directive('userCard', function(){
  return {
    restrict: 'E',
    replace: true,
    scope: {
      user: '='
    },
    templateUrl: 'user-card.html'
  }
 });

app.directive('avatar', function() {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      user: '='
    },
    templateUrl: 'avatar.html'
  }
});




app.service('UserService', function(){

  // this.setToSync = function(){

  // }
  // this.getToSync = function(){

  // }

  // this.toSync = 2;

    var users = [
        {
          fullName: 'Иванов Иван',
          avatarUrl: 'https://randomuser.me/api/portraits/men/57.jpg',
          birthdate: '1976-10-10',
          gender: 'мужской',
          address: 'ул. Звенигороская, 47б',
          email: 'ivanov@mail.ru'
        },
        {
          fullName: 'Петров Петр',
          avatarUrl: 'https://randomuser.me/api/portraits/men/7.jpg',
          birthdate: '1957-01-14',
          gender: 'мужской',
          address: 'ул.Пушкиская, 13',
          email: 'ivanov@mail.ru'
        },
        {
          fullName: 'Натальина Наталья',
          // avatarUrl: 'https://randomuser.me/api/portraits/women/7.jpg',
          birthdate: '1990-07-03',
          gender: 'женский',
          address: 'ул. Лермонтова, 59',
          email: 'ivanov@mail.ru'
        }
      ];

    this.getUser = function(){
      return users[id];
    }

    this.getAll = function(){
      return users;
    }

  });

}());
