'use strict';

/**
 * @ngdoc overview
 * @name tictactoeApp
 * @description
 * # tictactoeApp
 *
 * Main module of the application.
 */
angular
  .module('tictactoeApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/game.html',
        controller: 'GameCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
