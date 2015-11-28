var mywedding = angular.module('mywedding', [
	'ngRoute',
	'ngAnimate'
])

mywedding.config(function($routeProvider) {
    $routeProvider
        .when('/page/:pageId', {
            controller: 'pageController',
            templateUrl: function(params) {
                return 'view/page' + params.pageId + '.html';
            }
        }) 
        .otherwise({
        	redirectTo: '/page/1'
        });
});