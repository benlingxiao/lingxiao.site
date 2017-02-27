define(function(require,exports,module){
	/*引用其他模块*/
	var $ = require('jquery');
	require('angular');
	var artdialog = require('artDialog-config');
	var win = require('localStorage');
	require('fullpage');
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
   		
   		$('#dowebok').fullpage({
   			verticalCentered : true,
   			css3: true,
   			continuousVertical: true,
   			navigation: true,
   			navigationPosition: "right",
   			navigationTooltips: ["文青红","文青橙","文青黄","文青绿","文青青","文青蓝","文青紫"],
   			navigationColor: "#fff"
   		});
   		
   		return that;
   	});
	
	module.exports = function(){};
});
