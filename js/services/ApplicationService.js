var applicationService = angular.module("applicationService",[]);
applicationService.factory("Application",["$resource",function($resource){

		this.getAbsences=function(UserId,Date,func)
		{
			
			$resource("DummyJson/AbsenceJson/:user.json").get({user:UserId},function(data){
				var absences=data.data;
				var list=new Array();
				for (var i = absences.length - 1; i >= 0; i--) {
					var year=absences[i].begda.substring(0,4);
					var month=absences[i].begda.substring(4,6);
					var day=absences[i].begda.substring(6,8);
					absences[i].begda=year+"-"+month+"-"+day;
					if(absences[i].begda>Date)
					{
						year=absences[i].endda.substring(0,4);
						month=absences[i].endda.substring(4,6);
						day=absences[i].endda.substring(6,8);
						absences[i].endda=year+"-"+month+"-"+day;
						list.push(absences[i]);
					}
				}
				func(list);
			});
		}
		this.getAbsenceById=function(UserId,reqId,func){
			$resource("DummyJson/AbsenceJson/:user.json").get({user:UserId},function(data){
				var absences=data.data;
				var list=new Array();
				for (var i = absences.length - 1; i >= 0; i--) {
					if(absences[i].request_id==reqId)
					{
						var year=absences[i].begda.substring(0,4);
						var month=absences[i].begda.substring(4,6);
						var day=absences[i].begda.substring(6,8);
						absences[i].begda=year+"-"+month+"-"+day;
					
						year=absences[i].endda.substring(0,4);
						month=absences[i].endda.substring(4,6);
						day=absences[i].endda.substring(6,8);
						absences[i].endda=year+"-"+month+"-"+day;
						list.push(absences[i]);
						func(absences[i]);
						return;
					
					}
					
				}
				func(list);
			});
		}
		this.getTimeAccRecords=function(UserId,func){
			$resource("DummyJson/timeacc/:user.json").query({user:UserId},function(data){
				func(data);
			});
		}
		this.getTimeRecords=function(UserId,Date,func){
			$resource("DummyJson/timeRecords/:user.json").query({user:UserId},function(data){
				records=new Array();
				for (var i = data.length - 1; i >= 0; i--) {
					/*if(data[i].DATUM==Date)
					{
						records.push(data[i]);
					}*/
					records.push(data[i]);
					func(records);
				};
			});
		}
		this.getTimeRecById=function(UserId,reqId,func){
			$resource("DummyJson/timeRecords/:user.json").query({user:UserId},function(data){
				for (var i = data.length - 1; i >= 0; i--) {
					if(data[i].REQUEST_ID==reqId)
					{
						func(data[i]);
						return;
					}
				};
			});
		}
		this.getUserAccount=function(UserId,func)
		{
			$resource("DummyJson/account/:user.json").get({user:UserId},function(data){
				func(data);
			})
		}

		return this;
	}
	])
