function getUserProfileProperties() {
	var UserProfile = {};
	var viewFilter = "select=DisplayName,Title,Email,PictureUrl,AccountName,Mobile,Department,CellPhone,WorkPhone,EmployeeID,FirstName,PreferredName,SPS-ClaimID,SPS-SavedAccountName";
    var  p = $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/SP.UserProfiles.PeopleManager/GetMyProperties?"+viewFilter ,
        method: "GET",
        async: false,
        headers: { "Accept": "application/json; odata=verbose" }
    });
	for (var i = 0; i < p.responseJSON.d.UserProfileProperties.results.length; i++)
    {
    	p.responseJSON.d[p.responseJSON.d.UserProfileProperties.results[i].Key] = p.responseJSON.d.UserProfileProperties.results[i].Value;    	
    }             
    //return p.responseJSON.d;
    
	var result = p.responseJSON.d;
    var arr = result["SPS-DistinguishedName"].split(",");

    var ouArr = []; 
    ouArr[0] = "-";
    ouArr[1] = "-";
    ouArr[2] = "-";
    var ouCount = 0;
    for(i=0;i<arr.length;i++){
        var rowArr = arr[i].split("=");
        if(rowArr.length == 2){
            if(rowArr[0] == "OU" ){
                ouArr[ouCount] = rowArr[1];
                ouCount++;                    
            }
        }
    }
    result.OUList = ouArr;     
              
    return result;
     
}

function GetRootSiteCurrentUserID() {
    var url = window.location.origin + "/_api/web/currentuser";
    var RootSiteCurrentUserID = getListDataREST(url)[0].Id;
    return RootSiteCurrentUserID;
}

