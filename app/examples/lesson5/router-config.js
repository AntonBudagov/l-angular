  app.config(function($stateProvider, $locationProvider, $urlRouterProvider){
  //$locationProvider.html5Mode(true); // think about rewrite rules for server
    $stateProvider
      .state('users', {
        url: '/users',
        template: '<user-list></user-list>'
        // templateUrl: 'avatar.html'm
        // controller: function(){},
        // controllerAs: 'userController'
      })
      .state('userAdd', {
        url: '/user/add',
        template: '<userCard></userCard>'
      })
      .state('user', {
        url: '/user/:userId/edit',
        template: '<userCard></userCard>'
      })
    //defult
    $urlRouterProvider.otherwise('users');
  });