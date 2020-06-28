
app.filter('categoryFilter', function () {

    return function (items, categories) {
        var filtered = []; var AllFalse = true;
        if (items && categories) {
            for (j = 0; j < categories.length; j++) { if (categories[j].Value) { AllFalse = false; } }
            if (AllFalse) { return items; }
            for (var i = 0; i < items.length; i++) {
                var Add = false;
                for (j = 0; j < categories.length; j++) {
                    if (categories[j].Value && categories[j].Name === items[i].Category) {
                        Add = true; break;
                    }
                }
                if (Add) { filtered.push(items[i]); }
            }
        }
        
        return filtered;
    };
});


app.filter('dateSearchFilter', function () {
//debugger;
    return function (items, dt ) {
//debugger;

        var filtered = []; 
        if (items && dt .startDate && dt .startDate) {
        	
        	for (var i = 0; i < items.length; i++) {
        		if(items[i].ArticleStartDate){
	        		var ArticleDate = new moment(items[i].ArticleStartDate);
	        		if ( dt.startDate <= ArticleDate  && dt.endDate >= ArticleDate  ) {
	                       filtered.push(items[i]);
	                }
	             }
			}						            
        }
        else{
        	return items;
        }
        return filtered;
    };
});



//Announcements App controller
app.controller('AnnouncementsCtrl', function ($scope, $q, $routeParams) {

		
	$scope.AnnouncementsDetailsInit = function(){

		let routeParams = $routeParams;
		
		$scope.AnnouncementsPanel = updateVariationData("Announcements");
		
		PageID =  routeParams.annid; // getEncriptedParm('annid');
		
		//debugger;
		var Announcements = [];
		var restURL = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getByTitle('AnnouncementMaster')/items?"
					+ "$Filter=ID eq " + PageID + "&" 
					+ "$Select=ID,Title,PageContent,Department,PageContent,ArticleDate,Category&$Orderby=ArticleDate&$expand=AttachmentFiles";					
		$scope.announcementsMainDetails = GetAnnouncements(restURL);
		
		var restURL = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getByTitle('AnnouncementMaster')/items?"
					+ "$Filter=ID ne " + PageID + "&" 
					+ "$Select=ID,Title,PageContent,Department,PageContent,ArticleDate,Category&$Orderby=ArticleDate&$top=6&$expand=AttachmentFiles";					
		$scope.announcementsData = GetAnnouncements(restURL);


		
	}
	
	$scope.AnnouncementListingInit = function(){

		$scope.DateSearch = {};

		$scope.AnnouncementsPanel = updateVariationData("Announcements");
		$scope.SearchPanel = updateVariationData("Search"); 
		
		setTimeout(function(){ 	
        	$('input[name="dateSearchStartDate"]').daterangepicker({
	            //autoUpdateInput: false,
	            showDropdowns: true,
	           // singleDatePicker: true,
            	opens: "left",
            	//autoUpdateInput: false,
		        "locale": {
		            "format": "DD/MM/YYYY",
		            "separator": " - ",
		            "applyLabel": "تحديد",
		            "cancelLabel": "إلغاء",
		            "fromLabel": "From",
		            "toLabel": "To",
		            "customRangeLabel": "Custom",
		            "daysOfWeek": [ "الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت" ],
		            "monthNames": [ "يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر" ],
		            "firstDay": 0
        		}
	            }, function(start, end, label) {  


	            	//$scope.DateSearch = {};
					$scope.DateSearch.startDate = start;
					$scope.DateSearch.endDate = end;
					$scope.$apply();

	            	//debugger;
	                //alert(3);
                //$scope.$apply();       
            }); 
            
			$('#dateSearchStartDate').val('');  
			         
        }, 500);
		
		 
		 SP.SOD.executeFunc('sp.js', 'SP.ClientContext', function () {
		
		getChoiceFieldDD( "AnnouncementMaster", "Department", $q).then(function (choices) {
			var fromattedJSON = '['; //{"Value":"", "Name":"All"},'
			for (indexer = 0; indexer < choices.length; indexer++) {

				fromattedJSON += '{"Value":' + false + ",";
				fromattedJSON += '"Name":' + '"' + choices[indexer] + '"' + '}';
				if (indexer != choices.length - 1) {
					fromattedJSON += ",";
				}
			}
			fromattedJSON += "]";
			var jsonobj = JSON.parse(fromattedJSON);
			$scope.departments = jsonobj;  
			//$scope.search();      
		});
		
		getChoiceFieldDD( "AnnouncementMaster", "Category", $q).then(function (choices) {
			var fromattedJSON = '['; //{"Value":"", "Name":"All"},'
			for (indexer = 0; indexer < choices.length; indexer++) {

				fromattedJSON += '{"ID":' + '"' + choices[indexer] + '"' + ",";
				fromattedJSON += '"Name":' + '"' + choices[indexer] + '"' + '}';
				if (indexer != choices.length - 1) {
					fromattedJSON += ",";
				}
			}
			fromattedJSON += "]";
			var jsonobj = JSON.parse(fromattedJSON);
			$scope.categories = jsonobj;  
			//$scope.search();      
		});

		});
		



		var restURL = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getByTitle('AnnouncementMaster')/items?"
					+ "$Select=ID,Title,PageContent,Department,PageContent,ArticleDate,Category&$Orderby=ArticleDate&$expand=AttachmentFiles";					
		 $scope.announcements =  GetAnnouncements(restURL);
         $scope.currentPage = 1;

	}
	
	$scope.search = function (){
	return;
	
		objColumns = [];
        var fromDate,todate  ;
            
		if( $("#fromDate").val()){
		
			

			fromDate  =  $('#fromDate').data('daterangepicker').startDate._d;//var fromDate = $("#fromDate").datepicker("getDate");
			todate =	$('#fromDate').data('daterangepicker').endDate._d;//var todate = 	$("#toDate").datepicker("getDate");		
			if (todate) 		{ todate = new Date(todate.format('yyyy-MM-dd')).toISOString(); todate = todate.replace("T00","T23");
								   objColumns.push("ArticleStartDate;DateTime;Leq;" + todate + ";And");  }        
	        if (fromDate) 		{ fromDate = new Date(fromDate.format('yyyy-MM-dd')).toISOString(); 
        					 	  objColumns.push("ArticleStartDate;DateTime;Geq;" + fromDate + ";And");}
    	}
                  		
			
			
        $.each($scope.categories, function(index, cat){   
			if(cat.Value) objColumns.push("Category;Text;Eq;" + cat.Name + ";Or");
		});
        var searchTexValue = $("#searchkeyword").val();
           
	}
	$scope.ClearAll = function () {
	
		$scope.docSearchString="";
        $scope.SelctedDepartmentFilter = "";
        
		$.each($scope.categories, function(index, cat){   
			cat.Value = false;
		});
		
		$('#dateSearchStartDate').val('');
		$scope.DateSearch.startDate = "";
		$scope.DateSearch.endDate = "";
			
        $("#categorieschkboxes input:checked").each(function () {
            $(this).prop("checked",false);	
        });	
        
        $("#searchkeyword").val('');	
       		
		$scope.currentPage = 1;

/*
      	var restURL = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getByTitle('AnnouncementMaster')/items?"
					+ "$Select=ID,Title,PageContent,Department,PageContent,ArticleDate&$Orderby=ArticleDate&$expand=AttachmentFiles";	
       	$scope.announcements =  GetAnnouncements(restURL);
       	*/
       	 
        
        
       	
	};
	
	$scope.FilterDepartment = function(objSelDepartment){
		
		$.each($scope.departments, function(index, department){   
			if (objSelDepartment.Name == department.Name ) {
				if(department.Value){
					department.Value=false;
					objSelDepartment.Value=false;
					$scope.SelctedDepartmentFilter = ""; 													
				}
				else{
					department.Value=true;
					objSelDepartment.Value=true;
					$scope.SelctedDepartmentFilter = objSelDepartment.Name;					       
				}   
			}   
			else{
				objSelDepartment.Value=false;
			}      
		});
	}
	
	 $scope.eventDateFilter = function() {
	 	//$scope.startDateSearch
	    //$scope.endDateSearch
	 }


	
	
});


function GetAnnouncements(restURL){

	var Announcements = [];
	
	$.ajax({
        url: restURL,
        type: "GET",
        async: false,
        headers: { "accept": "application/json;odata=verbose" },
        success: function (data) {
            if (data.d.results){
	            	$.each(data.d.results, function (key, ans) {
						var anns = {};
						anns.ID = ans.ID;
						anns.ArticleByLine = ans.Title;
						anns.ArticleStartDate = ans.ArticleDate;
						if(ans.AttachmentFiles.results.length > 0 ){
							anns.PublishingPageImage = ans.AttachmentFiles.results[0].ServerRelativeUrl;
						}
						else{
							anns.PublishingPageImage = "";
						} 
						anns.Department = ans.Department;
						anns.PublishingPageContent = ans.PageContent;
						anns.Category = ans.Category;
						Announcements.push(anns);
					});  
	            }
        },
        error: function (request, status, error) { 
        	alert("Error while HomePageAnnouncementsInit " + error ); 
        }
    });
    return Announcements;
}
