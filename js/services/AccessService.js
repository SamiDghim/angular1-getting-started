
var accessService = angular.module('AccessServices',['ngResource','ngCookies']);
accessService.factory("Login",["$resource",'$location','$cookieStore',"$route",
	function($resource,$location,$cookieStore,$route){
		
		this.dologin=function(login,password,func){
			
			var cred =$resource('DummyJson/Login.json',{}).query(function(){
				
				for(i=0;i<cred.length;i++)
				{
					if(cred[i].login==login && cred[i].password==password)
						{
							
							$cookieStore.put('isLoggedin',true);
							var user=$resource('DummyJson/Users/:userid.json').get({userid:cred[i].id},function(){
								$cookieStore.put('loggeduser',user);
								func(true);
							});
							
							
							return;
						}
				}
				func(false);
				return;
			});

			
		}
		this.isLogin=function(){
			return $cookieStore.get('isLoggedin')
		}
		this.requireAuth=function(){
			if(!$cookieStore.get('isLoggedin'))
				$location.path('/login');
		}
		this.getLoggedUser=function(){
			return $cookieStore.get('loggeduser');
		}
		this.logout=function(){
			$cookieStore.put('isLoggedin',false);
			$cookieStore.remove('loggeduser');
			$location.path("/login");
			
		}
		return this;
		
	}]);

