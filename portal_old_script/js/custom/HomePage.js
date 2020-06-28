
//Welcome Menu
app.controller('homePageCtrl', function ($scope, $http) {

	
	$scope.HomePageInit = function(){
	
		if($scope.GeneralSettings){
			return;
		}
		else{
			//alert(2);		
		}
		
		setHomeLabels($scope);
		
		//UserProfile
		UpdateUserProfile($scope);
		
		//welcomeWrapper	
	    UpdateWelcomeWrapper($scope);
	    
	    //Announcement
	    UpdateAnnouncements($scope);	  
	    
	    //CEO Message
		displayCEODetails($scope);
		  	    
	}	    
});

function setHomeLabels($scope) {
    $scope.GeneralSettings = updateVariationData("General");
    $scope.HomePanel = updateVariationData("Home");
    $scope.QuickLinks = updateVariationData("ToolTips");
    $scope.Mandatory = updateVariationData("Policy");
    $scope.SuggestionPanel = updateVariationData("Suggestion")
}


function UpdateUserProfile($scope){
	var UserProfile  = {};
	UserProfile  = getUserProfileProperties();
	UserProfile.MyDashbord = window.location.origin + "/ar-ae/Pages/MyProfile.aspx";
	if(! UserProfile.PictureUrl ) UserProfile.PictureUrl ="/_catalogs/masterpage/GSMOPA/images/default-user.svg";

	getItemsByREST(null,null, _spPageContextInfo.siteAbsoluteUrl + "/en-us/_api/web/lists/getbytitle('Variation')/items?"
							+"$filter=VariationGroup eq 'UserProfile'&$select=Arabic,Title&$OrderBy=Ordering").then(function ( variationdata ) {		
		UserProfile.Variation = 	variationdata ;	
	});
	$scope.UserProfilePanel =  UserProfile ;
}


function UpdateWelcomeWrapper($scope) {
	var today = new Date();
    var variationData = updateVariationData("Welcome");
    $scope.WelcomePanel = variationData;
    $scope.today = today;
    $scope.todayWeek = variationData["WeekDays"].split(',')[today.getDay()];
}


function UpdateAnnouncements($scope) {
	var restURL = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getByTitle('AnnouncementMaster')/items?" 
					+ "$Select=ID,Title,PageContent,Department,PageContent,ArticleDate,Category&$Orderby=ArticleDate&$top=6&$expand=AttachmentFiles"					
	$scope.AnnouncementsData = GetHomeAnnouncements(restURL);	
}
function GetHomeAnnouncements(restURL){

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



app.controller('policyController', function ($scope, $http) {
    $scope.PolicyVariation = updateVariationData("Policy");
    //var filterPolicy = "$select=OData__UIVersionString,ID,UniqueId,PolicyDescription,Policy_x0020_Name1,Department,Modified,EncodedAbsUrl&$orderby=Modified desc&$Top=9&$filter=((Converted eq 'Yes') and (CheckoutUserId eq null))";
    var filterPolicy = "$select=OData__UIVersionString,ID,UniqueId,PolicyDescription,Policy_x0020_Name1,Department,Modified,EncodedAbsUrl&$orderby=Modified desc&$Top=9";
    getItemsByREST('PoliciesDetails', filterPolicy).then(function (restItems) {
        var PolicyList = restItems;
        var PolicyArray = [];
        while (PolicyList.length > 0)
            PolicyArray.push(PolicyList.splice(0, 3));
        $scope.policiesData = PolicyArray;


    });
    $scope.SelectPolicy = function (policy) {
        $scope.PolicyData = policy;
        $scope.PolicyData.IframeUrl = _spPageContextInfo.webAbsoluteUrl + "/_layouts/15/WopiFrame.aspx?sourcedoc={" + policy.UniqueId + "}&action=embedview&copy=false";
        //checkPolicyRead(policy, policy.OData__UIVersionString).then(function (response) { });
        $('.modal').modal();
        $('#policies').modal('open');
        //$('#s4-workspace').addClass('stopscrolling');   
         	
    }
});

function displayCEODetails($scope) {
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('CEO')/items?$top=1",
        type: "GET",
        headers: {
            "accept": "application/json;odata=verbose",
        },
        success: function (data) {
            var results = data.d.results;
            $scope.CEOMesage = results[0].Message.substring(0, 250) + "...";
			$scope.CEOAuthor = " - " + results[0].Title
			
			return;
            var div = document.getElementById('CEOMesage');
            div.innerHTML += results[0].Message.substring(0, 250) + "...";
            //div.innerHTML += results[0].Message ;
            div = document.getElementById('CEOAuthor');
            div.innerHTML += " - " + results[0].Title;
            
            

        },
        error: function (request, status, error) {
            var errDescription = "CEO - Display CEO Details" + "\n" + "Requset response : " + request.responseText + "\n" + "Error : " + error;
            var loginUser = _spPageContextInfo.userLoginName;
            var pageUrl = _spPageContextInfo.serverRequestPath;
            //AddErrorLog(loginUser ,errDescription,pageUrl);

        }
    });
}



