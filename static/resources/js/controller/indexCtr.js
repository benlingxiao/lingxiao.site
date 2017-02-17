define(function(require,exports,module){
	/*引用其他模块*/
	require('angular');
	require('angular-route');
	
	var webApp = angular.module('webApp', ['ngRoute']);
	
	webApp.controller('userCtr',function($scope){
		var that = $scope;
		
		return that;
	});
	
	/*
	 * 动态加载不同route对应的controller文件
	 * 并将controller，directive，filter，factory，service等方法暴露出来
	 * */
	webApp.config(function($controllerProvider, $compileProvider, $filterProvider, $provide) {
	  	webApp.register = {
		    controller: $controllerProvider.register,
		    directive: $compileProvider.directive,
		    filter: $filterProvider.register,
		    factory: $provide.factory,
	    	service: $provide.service
	  	};
	  	webApp.asyncjs = function (js) {
	        return ["$q", "$route", "$rootScope", function ($q, $route, $rootScope) {
	            var deferred = $q.defer();
	            var dependencies = angular.copy(js);
	            require.async(dependencies, function () {
	                $rootScope.$applyAsync(function () {
	                    deferred.resolve();
	                });
	            });
	            return deferred.promise;
	        }];
	    }
	});
	/*
	 * 设置route
	 * */
	webApp.config(['$routeProvider',function ($routeProvider){
   		$routeProvider.
   		when('/',{
   			templateUrl : pagePath + 'template/index.html',
			resolve : {
				load : webApp.asyncjs('./templateCtr/indexCtr.js')
   			}
   		}).
		/*
		 * 注册登录部分
		 * */
		when('/index',{
			templateUrl : pagePath + 'template/index.html',
			resolve : {
				load : webApp.asyncjs('./templateCtr/indexCtr.js')
   			}
		}).
		when('/charts',{
			templateUrl : pagePath + 'template/charts.html',
			resolve : {
				load : webApp.asyncjs('./templateCtr/chartsCtr.js')
   			}
		}).
   		otherwise({
   			redirectTo : '/'
   		});
   	}]);
	
	angular.element(document).ready(function() {
		angular.bootstrap(document, ['webApp']);
	});
	
	/*your code*/
	module.exports = function(){
		
	};
});