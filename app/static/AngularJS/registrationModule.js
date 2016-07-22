// -- =============================================
// -- Author:      Vladimir Juárez
// -- Create date: 18/03/2016
// -- Description: Is the container of the application
// -- Modificó: 
// -- Fecha: 
// -- =============================================
var registrationModule = angular.module("registrationModule", ["ngRoute","cgBusy","ui.bootstrap"])
    .config(function($routeProvider, $locationProvider) {

        /*cheange the routes*/
        $routeProvider.when('/in', {
            templateUrl: 'AngularJS/Templates/example.html', //example 1
            controller: 'exampleController'
        }).when('/interest', {
            templateUrl: 'AngularJS/Templates/interest.html',
            controller: 'interestsController'
        }).when('/freedays', {
            templateUrl: 'AngularJS/Templates/freedays.html',
            controller: 'freeDaysController'
        }).when('/scheme',{
            templateUrl: 'AngularJS/Templates/scheme.html',
            controller: 'schemeController'
        }).when('/agencia',{
            templateUrl: 'AngularJS/Templates/agencia.html',
            controller: 'agenciaController'
        }).when('/tiie',{
            templateUrl: 'AngularJS/Templates/tiie.html',
            controller: 'tiieController'
        }).when('/detailsUnit',{
            templateUrl: 'AngularJS/Templates/detailsUnit.html',
            controller: 'interestsController'
        }).when('/interestDetails',{
            templateUrl: 'AngularJS/Templates/interestDetails.html',
            controller: 'interestsController'
        }).when('/payment',{
            templateUrl: 'AngularJS/Templates/payment.html',
            controller: 'paymentController'
        })
        .when('/',{
            templateUrl: 'AngularJS/Templates/login.html',
            controller: 'loginController'
        });

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    });

registrationModule.directive('resize', function($window) {
    return function(scope, element) {
        var w = angular.element($window);
        var changeHeight = function() { element.css('height', (w.height() - 20) + 'px'); };
        w.bind('resize', function() {
            changeHeight(); // when window size gets changed             
        });
        changeHeight(); // when page loads          
    };
});
