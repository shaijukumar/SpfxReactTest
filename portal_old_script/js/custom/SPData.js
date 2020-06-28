function getListDataREST(URL) {
    var DataList = [];
    $.ajax({
        url: URL,
        type: "GET",
        async: false,
        headers: {
            "accept": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val(),
            "content-Type": "application/json;odata=verbose"
        },
        success: function (data) {
            if (data.d.results) {
                var results = data.d.results;
                $.each(results, function (index, dataRec) {
                    DataList.push(dataRec);
                });
            }
            else {
                DataList.push(data.d);
            }
        },
        error: function (error) {

        }
    });
    return DataList;
}


function getItemsByREST(listName, filters, restURL, siteURL, paging) {
    var deferred = $.Deferred();
    if (!restURL)
        restURL = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getByTitle('" + listName + "')/items?";
    if (filters)
        restURL = restURL + filters;
    $.ajax({
        url: restURL,
        type: "GET",
        async: false,
        headers: { "accept": "application/json;odata=verbose" },
        success: function (data) {
            if (data.d.results && !paging) deferred.resolve(data.d.results);
            else deferred.resolve(data.d);
        },
        error: function (request, status, error) { deferred.resolve(null) }
    });
    return deferred.promise();
}

