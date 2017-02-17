define(function(require,exports,module){
	/*引用其他模块*/
	require('angular');
	var artdialog = require('artDialog-config');
	var win = require('localStorage');
	/*引用其他模块*/
	var webApp = angular.module('webApp');
	
   	/*
   	 * 测试页面控制器
   	 * */
   	webApp.register.controller('indexCtr',function($scope){
   		var that = $scope;
   		
   		that.donnotClick = function(){
   			artdialog.alert('都叫你不要点了。',function(){
   				window.location.href = '#/charts';
   			});
   		};
   		
   		return that;
   	});
	
	module.exports = function(){};
});
