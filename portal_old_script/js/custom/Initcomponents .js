/****Materialise intiation****/
var $ = jQuery.noConflict();

jQuery(document).ready(function ($) {
//debugger;
	setTimeout(function(){ 	
	
		var navHtml = 	'<div class="menuLauncher">'+'<ul >'+'<li><a href="/ar-ae" ><span class="icon icon-home"></span>الصفحة الرئيسية</a></li>'+'<li><a href="/ar-ae/Pages/announcementsListing.aspx" ><span class="icon icon-latestAnnouncements"></span>إعلان</a></li>' + '<li><a href="/ar-ae/Pages/newsListing.aspx" ><span class="icon icon-news"></span>خبر</a></li>'+'<li><a href="/ar-ae/Pages/eventslisting.aspx" ><span class="icon icon-eventCalendar"></span>فعالية</a></li>' +'<li><a href="/ar-ae/Pages/MediaGallery.aspx" ><span class="icon icon-mediaGallery"></span>المركز الإعلامي</a></li>' + '<li><a href="/ar-ae/Pages/Documents.aspx" ><span class="icon icon-documents"></span>مركز الملفات</a></li>' + '<li><a href="/ar-ae/Pages/About.aspx" ><span class="icon icon-ceoMessage"></span>رسالة</a></li>' + '<li><a href="/ar-ae/Pages/Policies.aspx" ><span class="icon icon-policies"></span>سياسة</a></li>' + '<li><a href="/ar-ae/Pages/SurveyListing.aspx" ><span class="icon icon-surveylist"></span>استبيان</a></li>'+'</ul>'+'</div>'; 
 

		
		$( ".o365cs-nav-navMenu" ).append(navHtml);		
		$('#masterPageMainSection').bind('contextmenu', function(e) {
			return false;
		}); 
	}, 1500);


	// Initialize collapse button
    $(".sidebar-collapse").sideNav();
    $(".search-link").on("click", function () {
        $("#SearchBox").toggleClass("active");
    });
  //close side bar
  $('.close-sidebar').on("click", function(){
    $('.sidebar-collapse').sideNav('hide');    
  });
  
      /*$(".sidebar-collapse-right").sideNav({
      	edge: "right"
      });*/
  $('.icon-phonebook').on("click", function(){
   	//var $scope = getAngularControllerScope("phonebooksearch");
    //$('#phoneBookPanel #txtSearchBox').val('');
    //$scope.searchText = '';
   
  });
  
  //My tasks advanced filter
  $('.openFilter').on('click', function(){ 
  		$(this).toggleClass('active');
		$('.advancedFilters').slideToggle('slow');
	});
	
	
	//Tabs for task activity...
	$('.taskActivity a').on('click', function(){
		$('.taskActivity a').removeClass('active');
		$(this).addClass('active');
	});
  
  
  //date range picker...
  
      $('.dateRangePicker').daterangepicker({
        showDropdowns: true,
        singleDatePicker: false,
        autoUpdateInput: false,
        opens: "left",
        "locale": {
        "format": "DD/MM/YYYY",
        "separator": " - ",
        "applyLabel": "تحديد",
        "cancelLabel": "إلغاء",
        "fromLabel": "From",
        "toLabel": "To",
        "customRangeLabel": "Custom",
        "daysOfWeek": [ "الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت" ],
        "monthNames": [ "يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو",
    "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر" ],
        "firstDay": 0
    }
    });	    
    
    $('.todayDateTime').daterangepicker({
		  singleDatePicker: true,
		  startDate: moment().startOf('hour'),
	   	  endDate: moment().startOf('hour').add(32, 'hour'),
		  showDropdowns: true,
		  timePicker: true,
		  timePicker24Hour: false,
		  timePickerIncrement: 5,
		  autoUpdateInput: true,
		  locale: {
		    format: 'YYYY/MM/DD hh:mm a',
		    "separator": " - ",
	        "applyLabel": "تحديد",
	        "cancelLabel": "إلغاء",
	        "fromLabel": "From",
	        "toLabel": "To",
	        "customRangeLabel": "Custom",
	        "daysOfWeek": [ "الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت" ],
	        "monthNames": [ "يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو",
	    "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر" ],
	        "firstDay": 0

		  }
	});
    
    $('.dateRangePicker.OpensRight').daterangepicker({
         showDropdowns: true,
        singleDatePicker: false,
        autoUpdateInput: false,
        parentEl: '.date-field',
        opens: "right",
        "locale": {
        "format": "DD/MM/YYYY",
        "separator": " - ",
        "applyLabel": "تحديد",
        "cancelLabel": "إلغاء",
        "fromLabel": "From",
        "toLabel": "To",
        "customRangeLabel": "Custom",
        "daysOfWeek": [ "الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت" ],
        "monthNames": [ "يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو",
    "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر" ],
        "firstDay": 0
    }
    });	    

    
     $('.dateRangePickerInline').daterangepicker({
        showDropdowns: true,
        singleDatePicker: false,
        autoUpdateInput: false,
        parentEl: '.date-field',
        opens: "left",
        "locale": {
        "format": "DD/MM/YYYY",
        "separator": " - ",
        "applyLabel": "تحديد",
        "cancelLabel": "إلغاء",
        "fromLabel": "From",
        "toLabel": "To",
        "customRangeLabel": "Custom",
        "daysOfWeek": [ "الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت" ],
        "monthNames": [ "يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو",
    "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر" ],
        "firstDay": 0
    }
    });	
    
    
    
         $('.singleDatePicker').daterangepicker({
	        showDropdowns: true,
	        singleDatePicker: true,
	        opens: "left",
	        "locale": {
	        "format": "DD/MM/YYYY",
	        "separator": " - ",
	        "applyLabel": "تحديد",
	        "cancelLabel": "إلغاء",
	        "fromLabel": "From",
	        "toLabel": "To",
	        "customRangeLabel": "Custom",
	        "daysOfWeek": [ "الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت" ],
	        "monthNames": [ "يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو",
	    "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر" ],
	        "firstDay": 0
	    	}
   		 });
     $('.dateRangePicker,.dateRangePickerInline').on('cancel.daterangepicker', function(ev, picker) {
     	 	//picker.setStartDate(new Date());
			//picker.setEndDate(new Date());	
          	//$(this).val('');
      });
      $('.dateRangePicker,.dateRangePickerInline').on('apply.daterangepicker', function(ev, picker) {
              $(this).val(picker.startDate.format('DD/MM/YYYY') + ' - ' + picker.endDate.format('DD/MM/YYYY'));
          });
 // $('.singleDatePicker, .dateRangePicker').val('');
// $('.singleDatePicker, .dateRangePicker').attr('placeholder','DD/MM/YYYY');

  $('.newsuggestionbx a.outercontainer').on('click', function() {
  		//alert(1);
  		$('.newsuggestionbx .bulb').css('opacity', '0');
  		myStopFunction();  	
  		$(this).parents('.card').addClass('active');  		
		$("#suggestionBoxMessageError").text('');
		$("#suggestionBoxMessageError").removeClass( "active" );
		$("#SuggestionDescription" ).removeClass( "mandatoryField" );

	});

	$('.newsuggestionbx .close').on('click', function() {
		  triggerClearInput('All');
		  $(this).parents('.card').removeClass('active');
		  $('.newsuggestionbx .bulb').css('opacity', '0');
		  showBulb();
	});
	
	
  var bulbInterval = setInterval(showBulb, 3000);

	function showBulb() {
	    $('.newsuggestionbx .bulb').css('opacity', '1');
	 }
	
	function myStopFunction() {
	    clearInterval(bulbInterval);
	}
  	/*function showBulb() {
	    setInterval(function(){  $('.newsuggestionbx .bulb').show(); }, 3000);
	}*/
	
  	var currentUrl = window.location.href;
	var libraryName="Media%20Gallery%20Videos";
	if(currentUrl.indexOf("EditVideoSet.aspx")!==-1 && currentUrl.indexOf(libraryName)!==-1){
		$('input[id*=Title]').attr('maxlength',150);
		$('textarea[id*=Description],input[id*=VideoSetDescription]').attr('maxlength',250);
		//add some jQuery code to customize this page.	
	}
  	//General For All Lists
	//$("table[Id='onetIDListForm']").parents("#s4-bodyContainer").addClass("generalStyle");	
	
	//$(".generalStyle #DeltaPlaceHolderMain").css({"background-color": "white"});
	//Survey Lists Customizations*/
	//$("a[Title='Respond to this Survey']").parents("#s4-workspace").addClass("surveyDetailsStyle");
	//$("a[Title='الاستجابة لهذا الاستطلاع']").parents("#s4-workspace").addClass("surveyDetailsStyle");
	//$("a:contains('Edit Response'),a:contains('تحرير الاستجابة'),a[Title='Respond to this Survey'], a[Title='الاستجابة لهذا الاستطلاع'], input[value='Next'], input[value='التالي'],input[value='Finish'], input[value='إنهاء']").parents("#s4-workspace").addClass("surveyHeader");
	//$("a[Title='Respond to this Survey']").parents("#s4-bodyContainer").addClass("surveyDetailsStyle");
	//$("a[Title='الاستجابة لهذا الاستطلاع']").parents("#s4-bodyContainer").addClass("surveyDetailsStyle");	
	
	//$(".ms-wpContentDivSpace > table").addClass("generalStyle display");
	//$("span[Title*='Document Center'], span[Title*='المستندات']").parents("#s4-workspace").addClass("documentHeader");
	//$(".ms-srch-siteSearchResults").parents("#s4-workspace").addClass("MOPASearchResults");
	$(".ms-srch-siteSearchResults").parents("body").addClass("MOPASearchResults");
	$(".MOPASearchResults #contentRow").prepend('<div class="breadcrumbWrapper"><a href="/ar-ae/" class="breadcrumb">الرئيسية</a><span class="breadcrumb">Search</span>  </div>  <h1>Search Results</h1><div class="divider"></div>');	
	//$(".surveyHeader .ms-wpContentDivSpace > table").addClass("display");


	
	//$('.surveyDetailsStyle table').addClass("display");
   	//$(".surveyDetailsStyle a[Title='Respond to this Survey']").addClass("waves-effect waves-light btn ");
   
   	  //$("input[type=button][value='Cancel'], input[type=button][value='إلغاء الأمر']").addClass("waves-effect waves-light btn btn-flat");
    
	//$(".surveyDetailsStyle  #DeltaPlaceHolderMain").css({"background-color": "white"});
	//$(".generalStyle #DeltaPlaceHolderMain table[Id='onetIDListForm'] table.ms-formtoolbar:first-child").css({"display": "none"});
	/*
$('.indicators li').on('click', function(){
     
      var thisIndex = $(this).index();
    //  alert('this'+thisIndex);
      var activeIndex = $(this).parents('.indicators').find('li.active').index();
     // alert('active'+activeIndex);
      if($(this).hasClass('active')){
          return false;
      }
      
     $(this).closest('.indicators').find('li').removeClass("active");    
  	 var diff = activeIndex - thisIndex; 
     var modVal = Math.abs(activeIndex - thisIndex) ; 
     
     if(diff < 0 ){
     	if(modVal > 1 )
     		$(this).parents('.carousel').carousel('prev',modVal - 1 );
     	else 
     		$(this).parents('.carousel').carousel('prev',modVal + 1 );
     }
     else{
     	if(modVal > 1 )
     		$(this).parents('.carousel').carousel('prev', modVal  );
     	else 
     		$(this).parents('.carousel').carousel('prev');
     }
     $(this).addClass("active");    
   });
 
 */


//Phone book and Todo Panels scripts


  //$(".openContactPanel").on("click", function(){
   // $("#contactPanel").addClass("active");

 // });
 
 
  $(".opentDoPanel").on("click", function(){
    $("#todoEditPanel").addClass("active");

  });
  
 /* $("#s4-workspace").mCustomScrollbar({
		
		theme:"minimal-dark"
	});
*/

$('.todoPanelRight').sideNav({
	edge: "right",
	onOpen: function(el) { 
		 //$("#todoEditPanel").addClass("active");

		//Materialize.showStaggeredList('#notificationsPanel')
	 },	
	onClose: function(el) {
	  $("#todoEditPanel").removeClass("active");
 
	} // A function to be called when sideNav is closed
});

$('.sidebar-collapse-right').sideNav({
	edge: "right",
	onOpen: function(el) { 
		 //$("#todoEditPanel").addClass("active");

		//Materialize.showStaggeredList('#notificationsPanel')
	 },	
	onClose: function(el) {
	
		//alert(1);
	 // $("#contactPanel").removeClass("active");
	 $("#phoneBookPanels .secondaryPanel").removeClass("active");
 
	} // A function to be called when sideNav is closed
});



/*
  $(".opentDoPanel").on("click", function(){
    $("#todoSecondaryPanel").addClass("active");

  });

  $(".editToDoPanel").on("click", function(){
    $("#todoEditPanel").addClass("active");

  });
*/
  $('.closeSecondaryPanel').on("click", function(){
      //alert(1);
     $(this).parents(".secondaryPanel").removeClass("active");
   });
  

//remove tooltip from menu Launcher

$(".o365cs-nav-appItem > a").attr('title', "");


//minimize and maximize modal
$('.toggleSize').on("click", function(){
	$(this).parent().parent('.modal').toggleClass("maximized");
	
});

var launcherMenu = updateVariationData("MenuLauncher");
$('#O365_MainLink_NavMenu').attr(
{
	'data-position':"bottom",
	'data-delay':"100",
	'data-tooltip': launcherMenu["Menu"]
});
$('#O365_MainLink_NavMenu').addClass('tooltipped');

var launcherMenu = updateVariationData("MenuLauncher");
$('#O365_MainLink_Settings').attr(
{
	'data-position':"bottom",
	'data-delay':"100",
	'data-tooltip': launcherMenu["Menu"]
});
$('#O365_MainLink_Settings').addClass('tooltipped');

//$('.topDiv').css({'height': $(this).next().height()});
//alert($('.topDiv').height());
  
  
  
  
  // Initialize collapsible (uncomment the line below if you use the dropdown variation)
  $('.collapsible').collapsible();
  // $('.tabs').tabs(); 
   $('.modal').modal();      

     //$('.chips').material_chip();
     
$('.dropdown-button').dropdown();


  $('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 15, // Creates a dropdown of 15 years to control year,
    today: 'Today',
    clear: 'Clear',
    close: 'Ok',
    closeOnSelect: true // Close upon selecting a date,
  });

  $('.timepicker').pickatime({
    default: 'now', // Set default time: 'now', '1:30AM', '16:30'
    fromnow: 0,       // set default time to * milliseconds from now (using with default = 'now')
    twelvehour: false, // Use AM/PM or 24-hour format
    donetext: 'OK', // text for done-button
    cleartext: 'Clear', // text for clear-button
    canceltext: 'Cancel', // Text for cancel-button
    autoclose: true, // automatic close timepicker
    ampmclickable: true, // make AM PM clickable
    aftershow: function(){} //Function for after opening timepicker
  });


  //$('select').material_select();

  /*$('table.display').DataTable({
      //"searching": false,
       //"bInfo": false,
       "bPaginate": true,
      //"bLengthChange": false,
      "bFilter": true,
      "bInfo": true,
      "bAutoWidth": false,
      "responsive": true,
      select: {
          selector:'td:not(:first-child)',
          style:    'os'
      }
    });*/

  $(".filter").on("click", function(){ 
    $(this).parent().find(".dataTables_filter").toggle();
  });



    $('input.autocomplete').autocomplete({
      data: {
        "70123456": null,
        "70234567": null,
        "70986712": null
      },
      limit: 20, // The max amount of results that can be shown at once. Default: Infinity.
      onAutocomplete: function(val) {
        window.location.url("/search-result.html");
      },
      minLength: 1, // The minimum length of the input for the autocomplete to start. Default: 1.
    });

	
	

/**** Custom scripts ****/


$(".globalSearch").on("click", function(){
  $("#searchPanel").addClass("active");
  $("#searchPanel input").focus();
});


$('.notification-link').sideNav({
	onOpen: function(el) { 
		$(this).addClass('selected');
		//Materialize.showStaggeredList('#notificationsPanel')
	 },	
	onClose: function(el) {
	 $('.notification-link').removeClass('selected'); 
	} // A function to be called when sideNav is closed
});

/*
$('.notification-link').on('click', function(e){
	$(this).toggleClass('selected');			
});
*/
$(".closeSearch").on("click", function(){
  $("#searchPanel").removeClass("active");
});

//$('.scrollspy').scrollSpy();

var $contents = $('.radioContent');
$('.trigger').change(function () {
    $contents.hide();
    $("#"+$(this).attr('data-target')).show();
});


//checkbox  toggle a target DIV


$('input[type="checkbox"]').click(function(){
    var inputValue = $(this).attr("data-target");
    $("#" + inputValue).toggle();
});

});
function showgeneralcontacts(search){	
	if(search)	
		$('#generalcontacts').addClass('ng-hide'); 
	else
	{ 	
		var $scope = getAngularControllerScope("phonebooksearch"); 
		if(! $scope.phonebookdata ) $scope.getAllContacts(); 
		$('#DynamicContacts').addClass('ng-hide');
		$('#txtSearchBox').val('');
	 	$('#generalcontacts').removeClass('ng-hide');
 	}
}

function sideNavClose(){
	 $('.sidebar-collapse').sideNav('hide');
}
function sideNavCloseChild(){ 
     $("#phoneBookPanels .secondaryPanel").removeClass("active");
}

function scrollToTop(){
	/*$(".dots a").removeClass("active");
	$(".dots li:first-child a").addClass("active");*/
    $('html, body').animate({
        scrollTop: $("#banner").offset().top-80
    }, 600);
    //setTimeout()
}

//$('#s4-workspace').addClass('stopscrolling');

//$(".modal.modal-fixed-footer .modal-content.mediaGalleryContent .tabs li:first-child a").addClass("active");

var NewItem2 = (function () {
    var NewItem2Orig = NewItem2;

    return function() {
        var evt = arguments[0];
        var url = arguments[1];
		
       //Read survey for current user to find out if he have already voted   
        readSurveyVotes(function(response,surveyUrl){
            //if voted then display custom message 
            if(response == 1) {
                alert('You have already voted to this survey.');
                window.location.href = surveyUrl;
                            
            }
            //if saved and not finished survey redirect to custom page 
            else if(response == 255){
            	alert('Please continue and finish your survey.');
            	window.location.href = surveyUrl;
            }
            //if not, call original function for opening response form
            else {
                NewItem2Orig(evt, url);
            } 
        });
    };

})();

function readSurveyVotes(cbSurveyResult)
{
	
		var completed = 0;
		var surveyDetails;
		var surveyId = _spPageContextInfo.pageListId.replace(/[{}]/g, "");
		var surveyUrl = _spPageContextInfo.webAbsoluteUrl+"/Pages/SurveyListing.aspx?survId="+surveyId ;
        $.ajax({
	        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists(guid'"+surveyId+"')/items?$select=AuthorId,Completed,ID",
	        type: "GET",
	        headers: {
	            "accept": "application/json;odata=verbose",
	        },
        	success: function (data) {
	        	var results = data.d.results;
	        	if(results.length > 1)
	        	{
	        		var userResponseIndex = $.map(results, function(obj, index) {
					    if(obj.AuthorId == _spPageContextInfo.userId ) { return index; }
					});
	        		surveyDetails = results[userResponseIndex];
	        		completed = surveyDetails["Completed"];
	        		console.log(completed);
	        		
	        	}
	        	 cbSurveyResult(completed,surveyUrl);			        		           
	          	                
		   },
           error: function (request, status, error) {					
				 cbSurveyResult(null);
			}
		});
}


