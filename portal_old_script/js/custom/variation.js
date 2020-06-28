function updateVariationData(VariationGroup) {
  var variation = _spPageContextInfo.webServerRelativeUrl.split("/").pop();
  var verData = {};
  //variation = "ar-ae";
  //var listURL = _spPageContextInfo.webAbsoluteUrl.replace("ar-ae", "en-us") +
  //    "/_vti_bin/client.svc/web/lists/getByTitle('Variation')/Items?$filter=VariationGroup eq '" + VariationGroup + "' &$top=5000&$select=*";

  var listURL =
    _spPageContextInfo.webAbsoluteUrl +
    "/_vti_bin/client.svc/web/lists/getByTitle('Variation')/Items?$filter=VariationGroup eq '" +
    VariationGroup +
    "' &$top=5000&$select=*";

  var ver = getListDataREST(listURL);
  $.each(ver, function (key, row) {
    if (variation == "ar-ae") {
      verData[row["Title"]] = row["Arabic"];
    } else {
      verData[row["Title"]] = row["English"];
    }
  });
  //console.log(verData);
  return verData;
}
