var app = angular.module("myApp", ['angularUtils.directives.dirPagination', 'dndLists', 'ngRoute' ]);


app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "/PortalArabic/portal/html/HomePageContent.htm",
        //controller : "homePageCtrl"
    }) 
    .when("/announcements", {
        templateUrl : "/PortalArabic/portal/html/AnnouncementList.html",
        controller : "AnnouncementsCtrl"
    })   
    .when("/AnnouncementsDetails/:annid", {
        templateUrl : "/PortalArabic/portal/html/Announcements.html",
        controller : "AnnouncementsCtrl"
    });
});

app.controller("announcementCtrl", function ($scope) {
    $scope.msg = "announcementCtrl";
});



