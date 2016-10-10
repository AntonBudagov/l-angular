;(function () {

var app = angular.module('myApp', []);


app.directive('callContainer', function () {
    return {
        scope: {
          user: '=', //двунаправленый
          age: '@',
          call: '&' // изалированый скоуп
        },
        restrict: 'E',
        // templateUrl: 'my-form.html',
        templateUrl: 'call-container.html',
        controllerAs: 'callContainer',
        bindToController: true,
        controller: function(){
          //alert(this.age);
        },
        link: function(scope){
          // alert(scope.user.name)
        }
    }
});

app.directive('fullName', function () {
    return {
        scope: {
          firstName: '=',
          lastName: '='
        },
        restrict: 'E',
        template: '<div>{{fullNameCtrl.firstName | capitalize}} {{fullNameCtrl.lastName | capitalize}}</div>',
        bindToController: true,
        controller: function(){
           //alert(this.age);
        },
        controllerAs: "fullNameCtrl"
    }
});

app.filter('capitalize', function() {
  return function(input, scope) {
    if (input!=null) {
    input = input.toLowerCase();
    return input.substring(0,1).toUpperCase()+input.substring(1);
    }
  }
});

app.service('serviceRate', function ($http) {
  return {
    getRates: function () {
      return $http({
          method: 'GET',
          url: 'http://apilayer.net/api/live?access_key=8629c661ac0a0adcf118a808c6721eac&format=1'
      });

      //$http.get();
    }
  }
});

app.controller('currencyController', function(serviceRate) {
  var vh = this;
  vh.admin = {
    name: 'Anton',
    age: 25
  }

  vh.sayHello = function(name){
    console.log('work')
    alert(name)
  }

  serviceRate.getRates().then(function(response){
    var dataRates = response.data.quotes;



    vh.amount = 1;

    vh.rates = Object.keys(dataRates).map(function(key){
        var obj = {};
        obj.name = key.slice(3,6);
        obj.value = dataRates[key];

        return obj
    });

    vh.selected = vh.rates.find(function(rate){
        return rate.name === 'USD'
    });
  });

});

// ================================================================================

app.directive('formCurrency', function(){
  return {
    restrict: 'E',
    templateUrl: 'form-currency.html',
    scope: true
  }

});

app.service('serviceRate2', function ($http) {
  return {
    getRates: function () {
      return $http({
          method: 'GET',
          //url: 'https://api.fixer.io/latest'
          url: 'http://api.fixer.io/latest?base=USD',

      });
      //$http.get();
    }
  }
});

app.controller('myCurrencyCtrl', function(serviceRate2){

  let vm = this;

  vm.selectedCurrency = 0;
  vm.result = 0;
  vm.usd = 0;
  serviceRate2.getRates().then((response) => {
    let data = response.data.rates;
    let result = [];
    for(let key in data){
      result.push({
        'name': key,
        'value': data[key]
      })
    }
    vm.rates = result;


    // vm.selected = result.find(function(rate){
    //     return rate.name === 'RUB'
    // });
    function updateResult(){
      if (angular.isNumber(Number(vm.usd))){
        vm.result = serviceRate2.getRates(vm.usd, vm.selected)
      }
    }
  })


});

}());
