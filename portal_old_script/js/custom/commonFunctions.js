function getChoiceFieldDD(listTitle, FieldTitle, $q) {
		var deferred = $q.defer();
	    //var variationData = getCurrentVariation("Pages");
	    var loc = new SP.ClientContext();
	    var web = loc.get_web();
	    var locList = web.get_lists().getByTitle(listTitle);
	    // Get Priority field (choice field)
	    var CategoryField = loc.castTo(locList.get_fields().getByInternalNameOrTitle( FieldTitle), SP.FieldChoice);
	    // Load the field
	    loc.load(CategoryField);
	    // Send our query to the server for processing.
	    loc.executeQueryAsync(function () {
	        var choices = CategoryField.get_choices();
	        deferred.resolve(choices);
	    }, function (sender, args) {
	       // alert('Loading failed. ' + args.get_message() + '\n' + args.get_stackTrace());
	    });
	   return deferred.promise;	
};
