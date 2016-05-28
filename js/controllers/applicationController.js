var applicationController=angular.module('applicationController',[]);
applicationController.controller('applicationCtrl',['Login','$scope','Application',"$location",'$rootScope',
	function(Login,$scope,Application,$location,$rootScope)
	{
		Login.requireAuth();
		$rootScope.pagename="Application";
		var authUser=Login.getLoggedUser();
		var currentdate=new Date();
		$scope.startdate=currentdate.getFullYear()+"-01-"+"01";
		var callbackfunc=function(listAbs){
			$scope.absences=listAbs;
		};
		Application.getAbsences(authUser.id,$scope.startdate,callbackfunc);
		$scope.remove=function(item){
			var index=$scope.absences.indexOf(item);
			$scope.absences.splice(index,1);
		}
		$scope.updateList=function(){
			
			Application.getAbsences(authUser.id,$scope.startdate,callbackfunc);
		}
		$scope.AddAbsence=function(absid)
		{
			if(absid===undefined)
				$location.path("/addabsence/"+"-1");
			else
				$location.path("/addabsence/"+absid);

		}
	}
	]);
applicationController.controller("AddabsenceCtrl",['Login','$scope','$location','$routeParams','Application','$rootScope',
	function(Login,$scope,$location,$routeParams,Application,$rootScope)
	{
		Login.requireAuth();
		var authUser=Login.getLoggedUser();
		var reqId=$routeParams.reqId;
		$rootScope.pagename="Application";
		var setAbsence=function(obj){
			$scope.selectedTo=obj.bearbeiter;
			$scope.type=obj.infotype;
			$scope.begdate=obj.begda;
			$scope.beghour=obj.begin_time;
			$scope.enddate=obj.endda;
			$scope.endhour=obj.end_time;
			$scope.not=obj.notiz
			$scope.approval="No text here";
		};
		if(reqId!=-1){
			absence=Application.getAbsenceById(authUser.id,reqId,setAbsence);
			
		}
		else
			$scope.approval="written Text only shown at response";
	}
	]);
applicationController.controller("TimeAccCtrl",["Login","$scope","$location","Application","$rootScope",
	function(Login,$scope,$location,Application,$rootScope){
		Login.requireAuth();
		$rootScope.pagename="Application";
		var authUser=Login.getLoggedUser();
		var func=function(data){
			$scope.accounts=data;
		}
		Application.getTimeAccRecords(authUser.id,func);
		$scope.AddAbsence=function()
		{
			
			$location.path("/addabsence/"+"-1");
			
		}
	}
	
	]);
applicationController.controller("TimeRecCtrl",["Login","$scope","$location","Application",
	function(Login,$scope,$location,Application){
		Login.requireAuth();
		var authUser=Login.getLoggedUser();
		var d = new Date();
        d.setDate(d.getDate() - (d.getDay()-1));
        var month="";
        var days="";
        if((d.getMonth()+1)<10)
        	month="0"+(d.getMonth()+1);
        else
        	month=d.getMonth()+1;
        if(d.getDate()<10)
        	days="0"+d.getDate();
        else
        	days=d.getDate();
        $scope.startdate=d.getFullYear()+"-"+month+"-"+days;
		var func=function(data){
			$scope.records=data
		}
		Application.getTimeRecords(authUser.id,$scope.startdate,func);
		$scope.remove=function(item){
			var index=$scope.records.indexOf(item);
			$scope.records.splice(index,1);
		}
		$scope.AddTimeRec=function(absid)
		{
			if(absid===undefined)
				$location.path("/addtimerecord/"+"-1");
			else
				$location.path("/addtimerecord/"+absid);

		}

	}

	]);
applicationController.controller("AddTimeRecCtrl",['Login','$scope','$location','$routeParams','Application',
	function(Login,$scope,$location,$routeParams,Application)
	{
		Login.requireAuth();
		var authUser=Login.getLoggedUser();
		var reqId=$routeParams.reqId;
		
		var setTimeRec=function(obj){
			$scope.selectedTo=obj.NAME;
			$scope.type=obj.SUBTYTEXT;
			$scope.begdate=obj.BEGDA;
			$scope.beghour=obj.BEGTI;
			
			$scope.not=obj.CURR_NOTICE
			$scope.approval=obj.PAST_NOTICE;
		};
		if(reqId!=-1){
			absence=Application.getTimeRecById(authUser.id,reqId,setTimeRec);
			
		}
		else
			$scope.approval="written Text only shown at response";
	}
	]);
applicationController.controller("TimeStatusCtrl",['Login','$location','$rootScope','$scope',
	function(Login,$location,$rootScope,$scope)
	{
		Login.requireAuth();
		$rootScope.pagename="Time Records";
		$scope.openTimeStatus=function(date)
		{
			$location.path('/viewer/timestatus/'+date);
		}
		$scope.search=function(){
			$scope.openTimeStatus($scope.searchdate);
		}
	}
	]);
applicationController.controller("PDFViwerCtrl",["Login","$scope","$rootScope","$routeParams",
	function(Login,$scope,$rootScope,$routeParams)
	{
	
		Login.requireAuth();
		$scope.date=$routeParams.date;
		if($routeParams.page=="timestatus")
		{
			$rootScope.pagename="Time Records";
			PDFJS.getDocument('DummyPDF/time-record.pdf').then(function(pdf) {
			  pdf.getPage(1).then(function(page) {
			    var scale = 1.5;
			    var viewport = page.getViewport(scale);
			    var canvas = document.getElementById('the-canvas');
			    var context = canvas.getContext('2d');
			    canvas.height = viewport.height;
			    canvas.width = viewport.width;
			    var renderContext = {
			      canvasContext: context,
			      viewport: viewport
			    };
			    page.render(renderContext);
			  });
			});
		}
		else if($routeParams.page=="payment")
		{
			$rootScope.pagename="Payment";
			PDFJS.getDocument('DummyPDF/payment.pdf').then(function(pdf) {
			  pdf.getPage(1).then(function(page) {
			    var scale = 1.5;
			    var viewport = page.getViewport(scale);
			    var canvas = document.getElementById('the-canvas');
			    var context = canvas.getContext('2d');
			    canvas.height = viewport.height;
			    canvas.width = viewport.width;
			    var renderContext = {
			      canvasContext: context,
			      viewport: viewport
			    };
			    page.render(renderContext);
			  });
			});
		}
		
	}
	]);
applicationController.controller("CertifCtrl",["Login","$rootScope",
	function(Login,$rootScope){
		Login.requireAuth();
		$rootScope.pagename="Certification";
	}
	]);
applicationController.controller("PaymentCtrl",['Login','$location','$rootScope','$scope',
	function(Login,$location,$rootScope,$scope)
	{
		Login.requireAuth();
		$rootScope.pagename="Payment";
		$scope.openTimeStatus=function(date)
		{
			$location.path('/viewer/payment/'+date);
		}
		$scope.search=function(){
			$scope.openTimeStatus($scope.searchdate);
		}
	}
	]);
applicationController.controller("AccountCtrl",['Login',"$location","$rootScope","$scope","Application",
	function(Login,$location,$rootScope,$scope,Application){
		Login.requireAuth();
		$rootScope.pagename="Account";
		var authUser =Login.getLoggedUser();
		func=function(data){
			$scope.account=data;
		}
		Application.getUserAccount(authUser.id,func);
		$scope.editAddress=function(){
			$location.path("addaddress/"+authUser.id);
		}
		$scope.editBank=function(){
			$location.path("addbank/"+authUser.id);
		}
		$scope.editTravel=function(){
			$location.path("addTravel/"+authUser.id);
		}
	}
	]);
applicationController.controller("AddAddressCtrl",['Application','Login','$scope','$routeParams','$rootScope',
	function(Application,Login,$scope,$routeParams,$rootScope){
		Login.requireAuth();
		$rootScope.pagename="Account";
		var id=$routeParams.id;
		if(id!=-1){
			var func=function(data){
				$scope.startdate=data.Address.BEGDA;
				$scope.country=data.Address.PAD_CONAM
				$scope.street=data.Address.PAD_STRAS
				$scope.postcode=data.Address.PSTLZ_HR
				$scope.city=data.Address.PAD_ORT01
				$scope.phone=data.Address.TELNR
				$scope.contry=data.Address.PAD_CONAM
			}
			Application.getUserAccount(id,func);
		}
	}]);
applicationController.controller("AddBankCtrl",['Application','Login','$scope','$routeParams','$rootScope',
	function(Application,Login,$scope,$routeParams,$rootScope){
		Login.requireAuth();
		$rootScope.pagename="Account";
		var id=$routeParams.id;
		if(id!=-1){
			var func=function(data){
				$scope.startdate=data.BankAccount.BEGDA;
				$scope.rec=data.BankAccount.EMFTX
				$scope.iban=data.BankAccount.HRPAD_IBAN00
				$scope.bic=data.BankAccount.BANKK
			}
			Application.getUserAccount(id,func);
		}
	}]);
applicationController.controller("AddTravelCtrl",['Application','Login','$scope','$routeParams','$rootScope',
	function(Application,Login,$scope,$routeParams,$rootScope){
		Login.requireAuth();
		$rootScope.pagename="Account";
		var id=$routeParams.id;
		if(id!=-1){
			var func=function(data){
				$scope.startdate=data.TravelExpress.BEGDA;
				$scope.rec=data.TravelExpress.EMFTX
				$scope.iban=data.TravelExpress.HRPAD_IBAN00
				$scope.bic=data.TravelExpress.BANKK
			}
			Application.getUserAccount(id,func);
		}
	}]);
applicationController.controller('ServiceCtrl',['Login','$rootScope',function(Login,$rootScope){
	Login.requireAuth();
	$rootScope.pagename="Services"
}]);
applicationController.controller('SearchCtrl',['Login','$rootScope',function(Login,$rootScope){
	Login.requireAuth();
	$rootScope.pagename="Search";
}]);
applicationController.controller('MailCtrl',['Login','$rootScope',function(Login,$rootScope){
	Login.requireAuth();
	$rootScope.pagename="MailBox";
}]);