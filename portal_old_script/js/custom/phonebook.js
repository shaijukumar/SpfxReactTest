//PhoneBook Start
var users = [];
var userProfileProperties = [];
var profilePropertyNames = [];
function showgeneralcontacts(search){
	if(search)	
		$('#generalcontacts').addClass('ng-hide'); 
	else
	{ 	
		$('#DynamicContacts').addClass('ng-hide');
		$('#txtSearchBox').val('');
	 	$('#generalcontacts').removeClass('ng-hide');
 	}
}

app.controller('phonebooksearch', function ($scope, $q) {
//Set Variation Labels For PhoneBook
	var variationData = updateVariationData("PhoneBook");
	$scope.PhoneBook = variationData;   
	$scope.loadingPop = true;
	$scope.accountObj = [{ "AboutMe": "", "AccountName": "", "CellPhone": "", "Department": "", "EmployeeID": "", "HomePhone": "", "Mobilephone": "", "PictureURL": "", "PreferredName": "", "TechNetProfile": "", "Title": "", "WorkEmail": "", "WorkPhone": "" }];
	users = [];
	userProfileProperties = [];
	
	var listURL = window.location.origin + "/ar-ae" + 
	            "/_vti_bin/client.svc/web/lists/getByTitle('General Contacts')/Items?&$select=*";            
	$scope.GeneralContactsData = getListDataREST(listURL);
	
	SP.SOD.executeFunc('sp.js', 'SP.ClientContext', function () {
		getAllUsers().then(function (PhoneBookEntries) {
	            $scope.phonebookdata = PhoneBookEntries;
	    }); 
	});


//Method to fetch all the users
function getAllUsers() {
    var deferred = $q.defer();
    var searchTerm;
    //Textbox value containing search term
    if ($("#txtSearchBox")) {
        searchTerm = '*';
        if ($("#txtSearchBox").val())
            searchTerm = $("#txtSearchBox").val() + '*';
    }
    if (searchTerm) {
        clientContext = new SP.ClientContext(_spPageContextInfo.webServerRelativeUrl);
        //Building Keyword query for the search
        var keywordQuery = new Microsoft.SharePoint.Client.Search.Query.KeywordQuery(clientContext);
        keywordQuery.set_queryText(searchTerm);
        keywordQuery.set_sourceId("B09A7990-05EA-4AF9-81EF-EDFAB16C4E31");
        keywordQuery.set_rowLimit(1000);
        keywordQuery.set_trimDuplicates(false);
        var searchExecutor = new Microsoft.SharePoint.Client.Search.Query.SearchExecutor(clientContext);
        results = searchExecutor.executeQuery(keywordQuery);
        clientContext.executeQueryAsync(function () {
            $.each(results.m_value.ResultTables[0].ResultRows, function () {
                users.push(this.AccountName);
            });

            var peopleManager = new SP.UserProfiles.PeopleManager(clientContext);
            profilePropertyNames = ['AccountName', 'PreferredName', 'PictureURL', 'AboutMe', 'TechNetProfile', 'Department', 'WorkPhone', 'Mobilephone', 'HomePhone', 'CellPhone', 'EmployeeID', 'Title', 'WorkEmail'];
            for (var i = 0; i < users.length; i++) {
                var userProfilePropertiesForUser = new SP.UserProfiles.UserProfilePropertiesForUser(clientContext, users[i], profilePropertyNames);
                userProfileProperties[i] = peopleManager.getUserProfilePropertiesFor(userProfilePropertiesForUser);
            }

            clientContext.executeQueryAsync(function () {

                var UserProfiles = [];
                for (var i = 0; i < userProfileProperties.length; i++) {
                    var userProfile = userProfileProperties[i];
                    userProfile = GetKeyValuePair(userProfile);                  
                    UserProfiles.push(userProfile);
                }
                UserProfiles = JSON.stringify(UserProfiles);
                UserProfiles = JSON.parse(UserProfiles);
                deferred.resolve(UserProfiles);


            }, function (sender, args) {
                alert(args.get_message());
            });

        }, function (sender, args) {
            alert(args.get_message());
        });
    }

    else {
        var UserProfiles = [];
        deferred.resolve(UserProfiles);

    }
    return deferred.promise;
};



function GetKeyValuePair(userProfile) {
    var returnObj = new Object();
    for (var i = 0; i < userProfile.length; i++) {
        var key = profilePropertyNames[i];
        var value;
        if (key == "PictureURL") {
            value = (userProfile[i] ? userProfile[i] : '/_catalogs/masterpage/GSMOPA/images/user.png');
        }
        else {
            value = userProfile[i];
        }
        returnObj[key] = value;
    }
    return returnObj;
};
$scope.viewuser = function (accountName) {
    IsCurrentUserManager('Managers').then(function (IsManager) {
        $scope.IsManager = IsManager;

        if (!IsManager) {

            accountName.CellPhone = "";
        }
        $scope.accountObj = accountName;
        $("#contactPanel").addClass("active");
    });

};
function IsCurrentUserManager(groupName) {
    var deferred = $q.defer();
    var currentContext = new SP.ClientContext(_spPageContextInfo.siteServerRelativeUrl);
    var currentWeb = currentContext.get_web();
    var currentUser = currentContext.get_web().get_currentUser();
    currentContext.load(currentUser);
    var allGroups = currentWeb.get_siteGroups();
    currentContext.load(allGroups);
    var group = allGroups.getByName(groupName);
    currentContext.load(group);
    var groupUsers = group.get_users();
    currentContext.load(groupUsers);
    currentContext.executeQueryAsync(function (sender, args) {
        var userInGroup = false;
        var groupUserEnumerator = groupUsers.getEnumerator();
        UserName = currentUser.get_loginName();
        var splits = UserName.split('\\');
        if (splits.length > 0) {
            UserName = splits[1];
        }

        while (groupUserEnumerator.moveNext()) {

            var groupUser = groupUserEnumerator.get_current();

            if (groupUser.get_id() == currentUser.get_id()) {
                userInGroup = true;
                break;
            }
        }
        deferred.resolve(userInGroup);
    }, function (sender, args) {

        deferred.resolve(false);

    });
    return deferred.promise;

};

});
//PhoneBook End