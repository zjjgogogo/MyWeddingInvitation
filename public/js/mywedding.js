var mywedding = angular.module('mywedding', [
	'ngRoute',
	'ngAnimate'
])

mywedding.controller('IndexController', function($scope) {
    $scope.task = "";
    $scope.hello="JamesJaw";
    $scope.tasks = [];
    $scope.add = function() {
        $scope.tasks.push($scope.task);
    }
})

mywedding.config(function($routeProvider) {
    $routeProvider
        .when('/page/:pageId', {
            controller: 'pageController',
            templateUrl: function(params) {
                return 'views/page' + params.pageId + '.html';
            }
        }) 
        .otherwise({
        	redirectTo: '/page/1'
        });
});