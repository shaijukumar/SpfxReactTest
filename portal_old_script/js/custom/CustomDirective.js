//Carousel Rendering
app.directive('onFinishRenderMopadir', ['$timeout', '$parse', function ($timeout, $parse) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function () {
                    scope.$emit('ngRepeatFinished');
                    switch (attr["onFinishRenderMopadir"]) {
                    
                        case 'AnnouncementsRendered'	: renderSlider('AnnouncementsCarousel', 6000, scope.$index); 	break;
                        case 'NewsRendered'				: renderSlider('NewsCarousel', 9000, scope.$index); 			break;
                        case 'EventsRendered'			: renderEvens(); 												break;
                        case 'QuestionnaireRendered'	: renderQuestionnaire(); 										break;
                        case 'ToolTipsRendered'			: renderToolTips(); 											break;
                        case 'TabsRendered'				: renderTabs(); 												break;
                        case 'RenderCollapse'			: renderCollapse(); 											break;
                        case 'photos'					: renderMedia('photos', 3, scope.$index); 						break;
                        case 'videos'					: renderMedia('videos', 3, scope.$index); 						break;
                        case 'myProfileTasks'			: renderMedia('myProfileTasks', 3, scope.$index); 				break;
                        case 'DocumentsRendered'		: renderMedia('DocumentCenterCarousel', 6, scope.$index); 		break;
                        case 'PolicyRendered'			: renderMedia('PoliciesCarousel'); 								break;
                        case 'SurveysRendered'			: renderMedia('SurveysCarousel'); 								break;
                        case 'ToDoRendered'				: renderDropdown(); 											break;
                        case 'dropdownRendered'			: renderDropdown(); 											break;
                        case 'myMeetingsCarousel'		: if (scope.$index > 0) {
                        									SlickCallback( attr["onFinishRenderMopadir"] ) ; 
                        								  	defaultSlickSlider(attr["onFinishRenderMopadir"]); 
                        								  }
                        								  else {	removeLoader(attr["onFinishRenderMopadir"]); }
                        								  renderDropdown(); 											break;
                        case 'MediaFolderRendered'		: $('.MediaFolderRendered').slider({ interval: 200000 }); 		break;                       
                        default							: if (scope.$index > 0) {	
                        										SlickCallback( attr["onFinishRenderMopadir"] ) ;	
                        										defaultSlickSlider(attr["onFinishRenderMopadir"]); 
                        									} else{		removeLoader(attr["onFinishRenderMopadir"]);	}							break;
                    }
                    if (!!attr.onFinishRender) {
                        $parse(attr.onFinishRender)(scope);
                    }
                });
            }
        }
    }
}]);
function renderSlider(carouselId, timeout, count) {
    $('#' + carouselId).slider({ interval: timeout });

    $('#' + carouselId).hover(function (e) {
        $(this).slider('pause');
    }, function (e) {
        $(this).slider('start');
    });

    $('.slider .indicators').hover(function (e) {
        $(this).slider('pause');
    }, function (e) {
        $(this).slider('start');
    });
    if (count == 0) {
        $('#' + carouselId + ' .indicators').hide();
    }

}

function removeLoader(id){
	$("#" + id).prev('.preloader').removeClass('active'); 
}


