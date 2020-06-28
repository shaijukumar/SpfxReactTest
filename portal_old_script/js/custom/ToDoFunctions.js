//To Do Panel 21
var status ;
var ToDoUrl;

	function TaskDateOnChange(){
	
		var $ToDOPanelScope = getAngularControllerScope("ToDOPanel");
		if($ToDOPanelScope){
			$ToDOPanelScope.TaskDueDateOnChange();
		}
	}
	
  app.controller('ToDoListEdit', function ($scope, $http,$q,$timeout) {
		

	$scope.ToDoListEditInit = function(){
		ToDoUrl = window.location.origin + "/ar-ae" ; 
		//console.log('2');
		//variation = "en-us";	
		$scope.ShowValidationMessage = false;
		$scope.ShowValidationMessageDate = false;
		
		var variation = _spPageContextInfo.webServerRelativeUrl.split("/").pop();
		$scope.currentUserId = _spPageContextInfo.userId;
		$scope.ShowAdvancesSearch = false;		
		$scope.SaveCurrentTask = true;
        $scope.AddNewTask = false;
        $scope.ShowDeleteConfirmation = false;
		
		
		$scope.TaskStatusSearch = "";
		$scope.TaskPrioritySearch = "";
		
		//Update Variation data
		$scope.ToDo  = updateVariationData("ToDo");	
		RefreshToDoList($scope);		
		UpdateDropDownValues($scope, $q);	

	}

	$scope.DateCheckCount = 0;
	$scope.TaskDueDateOnChange = function(){
	
		//alert("inside TaskDueDateOnChange 1 ");
		var dueDate = $("#dueDate").val();
		if(dueDate) $scope.ShowValidationMessageDate = false;
		else $scope.ShowValidationMessageDate = true ;
		if($scope.NewItemDatePickerValidation){
		
			timer = $timeout(function () {
			//alert("inside TaskDueDateOnChange 2");
				$scope.ShowValidationMessageDate = false;
				
				if(!moment(dueDate, 'DD/MM/YYYY', true).isValid()){
					$scope.ShowValidationMessageDate = true;
				}				
			}, 200);				
		}				
		else{
			$scope.NewItemDatePickerValidation = true;
		}

	}	
	
	
	
	
	$scope.addNewTasksPanel = function () {	
			
		$scope.ShowValidationMessage = false;
		$scope.ShowValidationMessageDate = false;
		//alert("test1");
        $('label[for="taskItemSuccessMessage"]').html('');
        $scope.taskItemTitle = "";
        $scope.taskItemDescription = "";
        $scope.taskDueDate = "";
       
        $scope.NewItemDatePickerValidation = false;
        $("#dueDate").data('daterangepicker').setStartDate(new Date());
		$("#dueDate").data('daterangepicker').setEndDate(new Date());
		$("#dueDate").val(null);
		 
        
        //$scope.taskDueDate = "";
        $scope.selectedTaskStatus = "";
		$scope.selectedTaskPriority = '';
        $scope.EditTaskItemId = "Add";
        $("#todoEditPanel").addClass("active");
        var today = new Date();
		$scope.taskCreatedDate = moment(today ).format('DD/MM/YYYY');
        $scope.selectedTaskStatus = $scope.ToDo.ToDoSelectedStatusForNew;
      
        $scope.AddNewTask = true;
        $scope.SaveCurrentTask = false;
        $scope.DisableToDo = false;
        $('#taskItemErrorMessage').hide();
        $('#taskItemTitle').focus();                
		
    };
    $scope.ClearAll = function(){
		$scope.TaskStatusSearch = "";
		$scope.TaskPrioritySearch = "";
		$scope.TitleSearch = "";
		$scope.toDateToDo = $scope.fromDateToDo = null;
		$("#fromDateToDo").data('daterangepicker').setStartDate(new Date());
		$("#fromDateToDo").data('daterangepicker').setEndDate(new Date());
		$("#fromDateToDo").val(null);
    }
    $scope.CancelClick = function()
    {
    	$("#todoEditPanel").removeClass("active");
    	
    }

    $scope.addToDoTask = function () {
    	$("#taskItemErrorMessage").hide();

    	$scope.NewItemDatePickerValidation = true;
    	
    	$scope.ShowValidationMessage = false;
    	$scope.ShowValidationMessageDate = false;
    		

        $('label[for="taskItemSuccessMessage"]').html('');        
	    var dueDate = $("#dueDate").val();	
    
		UpdateFormDigest(window.location.origin + "/ar-ae", _spFormDigestRefreshInterval);

        if (typeof $scope.taskItemTitle != 'undefined' && $scope.taskItemTitle != null && $scope.taskItemTitle != "" && moment(dueDate, 'DD/MM/YYYY', true).isValid()) {
        	
        	var dueDateSP = moment(dueDate, 'DD/MM/YYYY').format('MM/DD/YYYY');
        	
            var item = {
                "__metadata": { "type": 'SP.Data.ToDoListItem' },
                "Title": $scope.taskItemTitle,
                "DueDate": dueDateSP, // ((typeof dueDate != 'undefined' && dueDate != "") ? dueDate : null),
                "StartDate": new Date(),
                "Body": $scope.taskItemDescription,
                "Status": $scope.selectedTaskStatus,
                "Priority": ($scope.selectedTaskPriority!=='') ? $scope.selectedTaskPriority: $scope.ToDo.NormalPriority,
                'AssignedToId': { 'results': [_spPageContextInfo.userId] }
            };
            $.ajax({
                url: ToDoUrl  + "/_api/web/lists/getbytitle('ToDo')/items",
                type: "POST",
                contentType: "application/json;odata=verbose",
                data: JSON.stringify(item),
                headers: {
                    "Accept": "application/json;odata=verbose",
                    "X-RequestDigest": GetFormDigestValue(window.location.origin + "/ar-ae")
                },
                success: function (data) {              
                	$("#taskItemErrorMessage").hide();
                	$("#toDoNewItemAddMessage").show(); 						
					$("#toDoNewItemAddMessage").fadeIn('slow').delay(3000).fadeOut('slow');

                	RefreshToDoList($scope);
                	
                	$scope.TaskStatusSearch = '';
                	
                	$("#todoEditPanel").removeClass("active");
                	$scope.$apply();
				 },
                error: function (request, status, error) { 
                    $('label[for="taskItemSuccessMessage"]').html($scope.ToDo.ToDoSaveErrorMessage);

                }
            });
        }
        else{
			$scope.ShowValidationMessage = true;
			if(!moment(dueDate, 'DD/MM/YYYY', true).isValid()){			
				$scope.ShowValidationMessageDate = true;
			}
			$("#taskItemErrorMessage").show();

        }
    };
    
     $scope.editToDoTask = function (taskItem) {
     
     	$scope.ShowValidationMessage = false;
     	$scope.ShowValidationMessageDate = false;
     	$('#taskItemErrorMessage').hide();
        $("#dueDate").val("");
            $('label[for="taskItemSuccessMessage"]').html('');
            var myDate = new Date(taskItem.DueDate);        		
       		myDate = moment(myDate).format('DD/MM/YYYY');
        
            $scope.selectedTaskStatus = taskItem.Status;            
            $scope.selectedTaskPriority = taskItem.Priority;
            $scope.taskItemTitle = taskItem.Title;
            $scope.taskItemDescription = taskItem.Body;
            $scope.taskCreatedDate = moment(taskItem.Created).format('DD/MM/YYYY');	
        if(taskItem.DueDate)
            $("#dueDate").val(myDate);
            $scope.EditTaskItemId = taskItem.Id;
            $scope.SaveCurrentTask = true;
            $scope.AddNewTask = false;
            $("#todoEditPanel").addClass("active");
            
            $scope.DisableToDo = false;
	     	if($scope.selectedTaskStatus == $scope.ToDo.CompletedStatus)
	     	{
	     		$scope.DisableToDo = true;
	     		$scope.SaveCurrentTask = false;

	     	} 
	     	
	     	$('#taskItemTitle').focus();

        }; 
        
    $scope.deleteTaskItem = function (toDoItem) {
    
    	
    	toDoItem.ShowDeleteConfirmation = true;
      	//$scope.deleteTaskItemAfterConfirm();
	}  
      
      $scope.deleteTaskItemAfterConfirm = function (toDoItem) {      

		UpdateFormDigest(window.location.origin + "/ar-ae", _spFormDigestRefreshInterval);
				
		var taskItemId = toDoItem.Id;
        $.ajax({
            url: ToDoUrl + "/_api/web/lists/getbytitle('ToDo')/items('" + taskItemId + "')",
            type: "DELETE",
            headers: {
                "Accept": "application/json;odata=verbose",
                "X-RequestDigest": GetFormDigestValue(window.location.origin + "/ar-ae"),
                "IF-MATCH": "*"
            },
            success: function (data) {
                $("#taskItem" + taskItemId).parent().css({ 'display': 'none' });
				RefreshToDoList($scope);
				toDoItem.ShowDeleteConfirmation = false;
				$scope.$apply();
            },
            error: function (request, status, error) { $('label[for="taskItemSuccessMessage"]').html($scope.ToDo.ToDoSaveErrorMessage); }
        });
    };
    
    
    
    
    $scope.saveToDoTask = function (taskItemId, typeofUpdate) {
		$scope.ShowValidationMessage = false;
    	$scope.ShowValidationMessageDate = false;   		
			
		UpdateFormDigest(window.location.origin + "/ar-ae", _spFormDigestRefreshInterval);
				
		var dueDate = $("#dueDate").val();	
		var dueDateSP = moment(dueDate, 'DD/MM/YYYY').format('MM/DD/YYYY');

        if (typeofUpdate == "Update") {  
	  		if (typeof $scope.taskItemTitle != 'undefined' && $scope.taskItemTitle != null && $scope.taskItemTitle != "" && moment(dueDate, 'DD/MM/YYYY', true).isValid() ) {
	            var Item = {
	                "__metadata": { "type": 'SP.Data.ToDoListItem' },
	                "Title": $scope.taskItemTitle,
	                "DueDate": dueDateSP, //((typeof dueDate != 'undefined' && dueDate != "") ? dueDate : null),
	                "Body": $scope.taskItemDescription,
	                "Status": $scope.selectedTaskStatus,
	                "Priority": ($scope.selectedTaskPriority!=='') ? $scope.selectedTaskPriority: $scope.ToDo.NormalPriority
	            };
	        }
	        else{
				$scope.ShowValidationMessage = true;				
				if(!moment(dueDate, 'DD/MM/YYYY', true).isValid()){			
					$scope.ShowValidationMessageDate = true;
				}
				$("#taskItemErrorMessage").show();
			}
        }
        else
   		   var Item = {
                "__metadata": { "type": 'SP.Data.ToDoListItem' },
                "PercentComplete": 1
            };
       
	    $.ajax({
	            url: ToDoUrl + "/_api/web/lists/getbytitle('ToDo')/items('" + taskItemId + "')",
	            type: "POST",
	            contentType: "application/json;odata=verbose",
	            data: JSON.stringify(Item),
	            async:false,
	            headers: {
	                "Accept": "application/json;odata=verbose",
	                "X-RequestDigest": GetFormDigestValue(window.location.origin + "/ar-ae"),
	                "content-Type": "application/json;odata=verbose",
	                "IF-MATCH": "*",
	                "X-HTTP-Method": "MERGE"
	            },
	            success: function (data) {
	                $("#toDoNewItemAddMessage").show(); 						
					$("#toDoNewItemAddMessage").fadeIn('slow').delay(3000).fadeOut('slow');
	                if (typeofUpdate == "Completed") {
	                    $("#taskItem" + taskItemId).addClass('completed');   
	                }
	                RefreshToDoList($scope);
	                $("#todoEditPanel").removeClass("active");  
	            },
	            error: function (request, status, error) { console.log($scope.ToDo.ToDoSaveErrorMessage); }
	    });		
    } 
});

function getChoiceFieldDD(listTitle, FieldTitle, $q) {
debugger;
   			var deferred = $q.defer();
            //var variationData = getCurrentVariation("Pages");
            var loc = new SP.ClientContext(ToDoUrl);
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

function RefreshToDoList($scope)
{		
    	var RootSiteCurrentUserID = GetRootSiteCurrentUserID();		
		//Get dodo list data		
		var listURL = window.location.origin + "/ar-ae" + 
            "/_vti_bin/client.svc/web/lists/getByTitle('ToDo')/Items?&$select=*" +
			"&$filter=AssignedToId eq " + RootSiteCurrentUserID + "&$orderby=Modified desc";	
		$scope.ToDoList = getListDataREST(listURL);	
			
		$.each( $scope.ToDoList , function(index, todo) 
		{    	
			todo.ShowDeleteConfirmation = false;			
			if(todo.Priority == $scope.ToDo.HighPriority )   { 	todo.cssClass = "HighPriority";  } 
            else if(todo.Priority == $scope.ToDo.NormalPriority )    { 	todo.cssClass = "NormalPriority";  }  
            else if(todo.Priority == $scope.ToDo.LowPriority ) {	todo.cssClass = "LowPriority";   }                                                                                       
		});				
}

function UpdateDropDownValues($scope,$q)
{
	SP.SOD.executeFunc('sp.js', 'SP.ClientContext', function () {
		getChoiceFieldDD("ToDo", "Status", $q).then(function (choices) {
			var status = [];
        	var AllStatus = []; 
        	var statusItem = {};            	
            statusItem.Value = "";	
            statusItem.Name =  $scope.ToDo.ToDoAll ;                
            AllStatus.push(statusItem);
        	$.each(choices, function (index, item) {
        		statusItem = {};
        		statusItem.Value = item ;
        			   
        		if( item === $scope.ToDo.InProgressStatus )  statusItem.Name =	$scope.ToDo.InProgress;
        		else if  ( item === $scope.ToDo.CompletedStatus )  statusItem.Name =	$scope.ToDo.Completed;
        		else if( item === $scope.ToDo.DeferredStatus )  statusItem.Name =	$scope.ToDo.Deffered;
				else if( item === $scope.ToDo.WaitingStatus )  statusItem.Name =	$scope.ToDo.Waiting;
				else if( item === $scope.ToDo.NotStartedStatus )  statusItem.Name =	$scope.ToDo.NotStarted ; 
				else  statusItem.Name  =   item;
				       
              	status.push(statusItem);
              	AllStatus.push(statusItem);
            }); 
            $scope.TaskStatus = status;   
            $scope.TaskListStatusSearch = AllStatus;                
        });
        getChoiceFieldDD("ToDo", "Priority", $q).then(function (choices) {
        	var priorities = [];
        	var AllPriorities = []; 
        	var priority = {};            	
            priority.Value = "";	
            priority.Name =  $scope.ToDo.ToDoAll ;
            priority.Class = "All";
            AllPriorities.push(priority);
            priority = {};
            priority.Value = ""; 
            priority.Name =  $scope.ToDo.Select ;
            priorities.push(priority);      
        	$.each(choices, function (index, item) {
        			priority = {}; 
        			var order = item.split(')')[0].split('(')[1]; 
        			priority.Name =  (  order === "1" ) ? $scope.ToDo.HighPriorityValue : (order === "2"	) ? $scope.ToDo.NormalPriorityValue  : $scope.ToDo.LowPriorityValue ;  	
        			order = (  order === "1" ) ? "High" : (order === "2"	) ? "Normal"  : "Low" ;     			
                  	priority.Class = order ;
                  	priority.Value = item;	                 
                  	priorities.push(priority);
                  	AllPriorities.push(priority);
            });           
            $scope.TaskPriority = priorities ; 
			$scope.TaskPriorityAll = AllPriorities ; 
        });
    });
}

function showMyToDos(){
	var $ToDoscope = getAngularControllerScope('ToDOPanel');
	$ToDoscope.ShowAdvancesSearch =  false;	
	$ToDoscope.TaskStatusSearch = "";
	$ToDoscope.TaskPrioritySearch = "";
	$ToDoscope.TitleSearch = "";
	$ToDoscope.toDateToDo = $ToDoscope.fromDateToDo = null;
	$("#fromDateToDo").data('daterangepicker').setStartDate(new Date());
	$("#fromDateToDo").data('daterangepicker').setEndDate(new Date());
	$("#fromDateToDo").val(null);
	$('#taskItemErrorMessage').hide();
	//$("#toDateToDo").datepicker().val(null);
	$ToDoscope.$apply();
}

$(function () {
		var $ToDoscope = getAngularControllerScope('ToDOPanel');
		/*
        $("#toDateToDo").datepicker({onSelect: function(dateText, inst) { 
	            $ToDoscope.toDateToDo =	$('#'+inst.id).datepicker("getDate"); 
	            $ToDoscope.$apply();             
         } 	});
         $("#fromDateToDo").datepicker({	onSelect: function(dateText, inst) { 
        	$ToDoscope.fromDateToDo = $('#'+inst.id).datepicker("getDate");
            $ToDoscope.$apply();
        }	}); 
         */
        $("#fromDateToDo").on( 'hide.daterangepicker', function(ev, picker) {
        	        			
			setTimeout(function(){
			  
			  	if(picker.element.val()) 
				{
					$ToDoscope.fromDateToDo = picker.startDate._d ;
					$ToDoscope.toDateToDo = picker.endDate._d;
					$ToDoscope.$apply();
				}
				else{
					$ToDoscope.fromDateToDo = null ;
					$ToDoscope.toDateToDo = null ;
					$ToDoscope.$apply();
				}


			}, 200);									
      	});   
    });
  







