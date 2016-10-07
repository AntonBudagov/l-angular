;(function () {
   var app = angular.module('myApp', []);

   app.directive('userCard', function(){
    return {
      restrict: 'E',
      controller: function(){
      this.user = {
      fullName: 'Anton',
      avatarUrl: 'https://randomuser.me/portraits/men/17.jpg',
      birthdate: '1001-10-1',
      gender: 'male',
      address: 'New Yourk',
      email: 'text@mail.com'

      };
    },
      templateUrl: 'user-card.html',
      controllerAs: 'UserController'
    }
  });


  // app.controller("UserController", function(){
  //   this.user = {
  //     fullName: 'Anton',
  //     avatarUrl: 'https://randomuser.me/portraits/men/17.jpg',
  //     birthdate: '1001-10-1',
  //     gender: 'male',
  //     address: 'New Yourk',
  //     email: 'text@mail.com'

  //   };

  // });


  app.directive('mailCard', function(){
    return {
      restrict: 'E',
      templateUrl: 'mail-card.html'
    }
   });

  app.controller("MailBoxController", function(){
    this.user = [
    {
      id: 1,
      fullName: 'Jesika',
      avatarUrl: 'https://randomuser.me/portraits/men/17.jpg',
      email: 'text@mail.com',
      description: `Lorem ipsum dolor
      sit amet, consectetur adipisicing elit.
      Dicta voluptatibus dolores, provident aliquid ipsam inventore
      doloribus numquam delectus quibusdam, voluptates animi praesentium officia quae,
       unde sapiente aspernatur minima perferendis. Dolore ipsam aspernatur iure eum,
       expedita rerum itaque, aliquam reprehenderit cum iusto odio at eos. Optio,
       suscipit, aspernatur. Laboriosam, culpa. Pariatur.
       `
    },
    {
      id: 111,
      fullName: 'lamberg',
      avatarUrl: 'https://randomuser.me/portraits/men/17.jpg',
      email: 'text@mail.com',
      description: `Lorem ipsum dolor
      sit amet, consectetur adipisicing elit.
      Dicta voluptatibus dolores, provident aliquid ipsam inventore
      doloribus numquam delectus quibusdam, voluptates animi praesentium officia quae,
       unde sapiente aspernatur minima perferendis. Dolore ipsam aspernatur iure eum,
       expedita rerum itaque, aliquam reprehenderit cum iusto odio at eos. Optio,
       suscipit, aspernatur. Laboriosam, culpa. Pariatur.
       `
    },
    {
      id: 11,
      fullName: 'Donald',
      avatarUrl: 'https://randomuser.me/portraits/men/17.jpg',
      email: 'text@mail.com',
      description: `Lorem ipsum dolor
      sit amet, consectetur adipisicing elit.
      Dicta voluptatibus dolores, provident aliquid ipsam inventore
      doloribus numquam delectus quibusdam, voluptates animi praesentium officia quae,
       unde sapiente aspernatur minima perferendis. Dolore ipsam aspernatur iure eum,
       expedita rerum itaque, aliquam reprehenderit cum iusto odio at eos. Optio,
       suscipit, aspernatur. Laboriosam, culpa. Pariatur.
       `
    },
    {
      id: 111,
      fullName: 'Dolore',
      avatarUrl: 'https://randomuser.me/portraits/men/17.jpg',
      email: 'text@mail.com',
      description: `Lorem ipsum dolor
      sit amet, consectetur adipisicing elit.
      Dicta voluptatibus dolores, provident aliquid ipsam inventore
      doloribus numquam delectus quibusdam, voluptates animi praesentium officia quae,
       unde sapiente aspernatur minima perferendis. Dolore ipsam aspernatur iure eum,
       expedita rerum itaque, aliquam reprehenderit cum iusto odio at eos. Optio,
       suscipit, aspernatur. Laboriosam, culpa. Pariatur.
       `
    },
    {
      id: 2,
      fullName: 'herman',
      avatarUrl: 'https://randomuser.me/portraits/men/17.jpg',
      email: 'text@mail.com',
      description: "few email"
    }];

  });

}());
