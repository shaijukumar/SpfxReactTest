
///Variables in QuickLinksPanel

var FavLinkTitles = new Array() ;
var favItemId ="";
var QuickLinkDataList ;
app.controller('QuickLinksPanel', function ($scope,$rootScope,$q) {

	$scope.QuickLinks = updateVariationData("ToolTips");
	$scope.QuickLinksFavPanel = updateVariationData("QuickLinks");

	$scope.loadingPop = true;	
	SP.SOD.executeFunc('sp.js', 'SP.ClientContext', function () {

		var variation = _spPageContextInfo.webServerRelativeUrl.split("/").pop();
			if(variation ){
				var variationData = updateVariationData("QuickLinks");
				$scope.QuickLinksFavPanel= variationData;				
				getDefaultLinks($scope);	
				QuickLinkInit($scope);
				if(_spPageContextInfo.serverRequestPath.split('/').pop().toLowerCase().indexOf('default.aspx')!== -1 || $(".quickLinks ul .active ").length === 0 ) 
					$(".quickLinks .icon-home").addClass('active');	
						 
			}
				
    });
    
    function getDefaultLinks($scope) {
    	getQuickLinksData('Corporate','DefaultQuickLinks').then(function (DefaultQuickLinkData) {
    		$scope.DefaultQuickLinkData = DefaultQuickLinkData ;	
    	});

    };
    function QuickLinkInit($scope) {  
		var myQuickLinks = [];
		var itemsToRemove = []; 
		///Get myFavLinks from QuickLinks List - start
		getMyFavourites(GetRootSiteCurrentUserID()).then(function (MyFavLinks) {			 
			if( MyFavLinks && MyFavLinks.FavLinks ) FavLinkTitles = MyFavLinks.FavLinks.split(';') ;
			if( MyFavLinks && MyFavLinks.Id ) favItemId = MyFavLinks.Id;
			///Get QuickLinksData from Custom Tiles List for current department - start        
        	getQuickLinksData('Corporate','Custom Tiles').then(function (QuickLinkData) {
        		if(QuickLinkData.length > 0 ){   		
        			///If Fav Links available
        			if(FavLinkTitles.length > 0)	{       					
						$.each(FavLinkTitles, function(index,item) {													
			        	 	var currentFavLinkIndex = $.map(QuickLinkData , function(obj, index) {
														    if(obj.class == item ) {return index; } 
														    else return  ;
													  });
							if(currentFavLinkIndex.length > 0 ){																				
								QuickLinkData[currentFavLinkIndex].InMyLinks = true;
								var relatedLinks = 	QuickLinkData[currentFavLinkIndex].RelatedLinks;							
								if(	QuickLinkData[currentFavLinkIndex].AppUrl.toLowerCase().indexOf(_spPageContextInfo.serverRequestPath.split('/').pop().toLowerCase())!== -1 )
								{								
									QuickLinkData[currentFavLinkIndex].activeClass = "active";	
									$(".quickLinks .icon-home").removeClass('active');
								}
								if(relatedLinks && relatedLinks.toLowerCase().indexOf(_spPageContextInfo.serverRequestPath.split('/').pop().toLowerCase())!== -1)
								{
									QuickLinkData[currentFavLinkIndex].activeClass = "active";	
									$(".quickLinks .icon-home").removeClass('active');

								}																											
								myQuickLinks.push(QuickLinkData[currentFavLinkIndex]);
							}
							else {
								itemsToRemove.push(index);								
							}				
						});
						$.each(itemsToRemove, function(index,item) {
							FavLinkTitles.splice(item, 1);
						});
        			} 
        			console.log(myQuickLinks);	     	
        			QuickLinkDataList = QuickLinkData;    	
        			$scope.QuickLinkData = QuickLinkData;     			     			
        			$scope.myQuickLinks = myQuickLinks;        			 
        		} 		            	           	  
        	});	///Get QuickLinksData from Custom Tiles List for current department - start  
	    });	///Get myFavLinks from QuickLinks List - end	    
	};
	$scope.openFavPanel = function(){
		$scope.quiclLinkErrorMessage = false;
	}
    $scope.AddToFav = function (favLinkItem ,favLinkItemIndex){    	
    	if(FavLinkTitles.indexOf(favLinkItem.class.trim()) === -1 && FavLinkTitles.length < 3 )
    	{
    		FavLinkTitles.push(favLinkItem.class); 
    		QuickLinkDataList[favLinkItemIndex].InMyLinks = true;     		 	   			
    		$scope.quiclLinkErrorMessage = false;    	
    	}
    	else if( FavLinkTitles.length === 3 )	$scope.quiclLinkErrorMessage = true;	
	};
	$scope.RemoveFromFav = function (favLinkItem,favLinkItemIndex){
		var index = FavLinkTitles.indexOf(favLinkItem.class.trim());
 	    if (index > -1) {      
 	    	FavLinkTitles.splice(index, 1);	 	    
 	    	QuickLinkDataList[favLinkItemIndex].InMyLinks = false; 	    
 	    }
 	    $scope.quiclLinkErrorMessage = false;		  		
	};
    $scope.UpdateFavLinksToList = function (){			
		var item = {
                "__metadata": { "type": 'SP.Data.QuickLinksListItem' },                               
                "Title": "Corporate", 
                "FavLinks": FavLinkTitles.join(';'),           
                'UserIDId': GetRootSiteCurrentUserID()
            };	
		if(favItemId ){
			 AddUpdateListItem('QuickLinks',item,favItemId, window.location.origin + "/ar-ae" ).then(function(data){			
				//var myQuickLinks = [];		                	
            	//myQuickLinks =  $.grep(QuickLinkDataList , function(obj){ return obj.InMyLinks === true;});
            	
				//console.log(myQuickLinks ); 
            	//$scope.myQuickLinks = myQuickLinks ;
            	//$scope.$apply(); 
            	QuickLinkInit($scope)
			});			
		}		
		else {
			 AddUpdateListItem('QuickLinks',item).then(function(data){			
				favItemId =  data.d.Id ;
    			//var myQuickLinks = [];		                	
            	//myQuickLinks =  $.grep(QuickLinkDataList , function(obj){ return obj.InMyLinks === true;}); 
            	//$scope.myQuickLinks = myQuickLinks; 
            	//$scope.$apply();
            	QuickLinkInit($scope)
            	setUserPermissionsForListItem("QuickLinks",data.d.Id,SP.RoleType.contributor).then(  function ( success ) {		                		
            	});  
			});	
		}
	};
	
    function getAllDepartments() {
    	var deferred = $q.defer();
        $.ajax({
            url: window.location.origin + "/_api/web/lists/getByTitle('Custom Tiles')/fields/getbytitle('Department')/choices",
            type: "GET",
            headers: { "accept": "application/json;odata=verbose", },
            success: function (data) { deferred.resolve(data.d.Choices.results); },
            error: function (request, status, error) { deferred.resolve(null); }
        });
        return deferred.promise;    
    };
    
    function getMyFavourites(userId) {
    	var deferred = $q.defer();    	
    	var filter = "$select=UserIDId,Id,FavLinks,Title"+"&$filter=UserIDId eq "+	userId +"&$OrderBy=Created desc&$Top=1";
    	getItemsByREST('QuickLinks',filter, "", window.location.origin + "/ar-ae" ).then(  function ( restItems ) {
    		if(restItems.length > 0 ) deferred.resolve(restItems[0]); 
    		else deferred.resolve(restItems);    		
    	});  
        return deferred.promise;    
    };

	function getQuickLinksData(department,listName) {	
		var deferred = $q.defer();
		var variation = _spPageContextInfo.webServerRelativeUrl.split("/").pop();
		var quickLinks = [];
		var restURL = window.location.origin + "/_api/web/lists/getByTitle('"+listName+"')/items?";
    	var filter = "$select=OData__x0024_Resources_x003a_spscore_x,OData__x0024_Resources_x003a_spscore_x0,OData__x0024_Resources_x003a_spscore_x1,Arabic,English,Department,Title,Id,class,RelatedLinks"+
	        		"&$filter=Department eq '"+ department +"'&$orderby=OData__x0024_Resources_x003a_spscore_x";				
		getItemsByREST(null,filter,restURL, window.location.origin + "/ar-ae"  ).then(  function ( restItems ) {	
			$.each(restItems , function (index, item) {
	    		var quickLinksItem = {};			    			    		
	    		if (variation === "en-us") {
	            	quickLinksItem.Title = item.English ;
		        }
		        else{
		            quickLinksItem.Title =  item.Arabic;
		        }	
	    		if(!quickLinksItem.Title) quickLinksItem.Title = item.Title;
	    		quickLinksItem.InMyLinks = false;	    		
	    		quickLinksItem.Id = item.Id;
	    		if(item.class == 'home') quickLinksItem.Default = true ;
	    		else quickLinksItem.Default = false;
	    		quickLinksItem.class = item.class ;
	    		quickLinksItem.Department = item.Department ;
	    		if(item.OData__x0024_Resources_x003a_spscore_x0){
		    		quickLinksItem.Description = item.OData__x0024_Resources_x003a_spscore_x0.Description ;
		    		quickLinksItem.AppUrl = item.OData__x0024_Resources_x003a_spscore_x0.Url;
	    		}
	    		if(item.OData__x0024_Resources_x003a_spscore_x1)
					quickLinksItem.IconUrl = item.OData__x0024_Resources_x003a_spscore_x1.Url;
	    		quickLinksItem.Order = item.OData__x0024_Resources_x003a_spscore_x;
	    		quickLinksItem.RelatedLinks = item.RelatedLinks ;   		
	   			quickLinks.push(quickLinksItem);
			});					
			//console.log(quickLinks); 
			deferred.resolve(quickLinks);				
		});
      
        return deferred.promise;
	}; 
}); 
