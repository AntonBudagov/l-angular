;(function () {

  angular.module('todomvc', []);

  angular.module('todomvc')


    .controller('TodoCtrl', function TodoCtrl(){
      'use strict';

      this.todos = [];
      this.newTodo = '';

      this.addTodo = function(){

        var newTodo = {
          title: this.newTodo.trim()
        };

        if(newTodo.title){

          this.todos.push(newTodo);
          this.newTodo = '';
        }
      }

      this.delTodo = function(todo){
        console.log('delete')
        this.todos.splice(this.todos.indexOf(todo), 1);
      }

    })

    .directive('greeting', function(){
      return {
        scope: true,
        restrict: 'E', //Element E , A - atribute
        templateUrl:' greeting.html',
        link: function(scope){
          scope.name = "Alience";
          scope.show = false;
          scope.sayHi = function(){
            alert(`Hi!! ${scope.name}`);
          }
        }
        //template: '<h1></h1>'

      };
    })

    .directive('greetingNew', function(){
      return {
        scope: true,
        restrict: 'E', //Element E , A - atribute
        templateUrl:' greeting-new.html',
        link: function(scope){
          scope.name = '';

          scope.show = false
        }
        //template: '<h1></h1>'

      };
    })


}());
