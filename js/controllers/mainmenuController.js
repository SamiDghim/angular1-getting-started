var mainmenuController =angular.module('mainmenuController',[]);
mainmenuController.controller('MainMenuCtrl',['$location','Login','$scope',"$rootScope",'$route',

	function MainMenuCtrl($location,Login,$scope,$rootScope,$route){
		Login.requireAuth();
		$rootScope.pagename="Home";
		
	}
	]);