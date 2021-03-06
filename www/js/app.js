// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic','starter.controllers', 'starter.services', 'ionic-datepicker','ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, ionicDatePickerProvider) {

        var datePickerObj = {
          inputDate: new Date(),
          titleLabel: 'Selecciona una Fecha',
          setLabel: 'Aceptar',
          todayLabel: 'Hoy',
          closeLabel: 'Cerrar',
          mondayFirst: false,
          weeksList: ["L", "M", "M", "J", "V", "S", "D"],
          monthsList: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Sept", "Oct", "Nov", "Dec"],
          templateType: 'popup',
          from: new Date(2012, 8, 1),
          to: new Date(2018, 8, 1),
          showTodayButton: true,
          dateFormat: 'dd MMMM yyyy',
          closeOnSelect: false,
          disableWeekdays: []
        };

        ionicDatePickerProvider.configDatePicker(datePickerObj);

        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: '/templates/home.html',
                controller: 'homeCtrl'
                })
            .state('donate', {
                url: '/donate',
                templateUrl: '/templates/donar.html',
                controller: 'donateCtrl'
                })
            .state('donate-details', {
                url: '/donate-details',
                templateUrl: '/templates/donate-details.html',
                controller: 'donateDetailsCtrl'
                })
             .state('map', {
                url: '/map',
                templateUrl: 'templates/map.html',
                controller: 'mapCtrl'
              });
         $urlRouterProvider.otherwise('/home');
})
