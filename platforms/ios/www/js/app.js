// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic','ionic.service.core','starter.controllers','firebase','ngMaterial','uiGmapgoogle-maps','ngAutocomplete','ngCordova','barcode']);


app.run(function($ionicPlatform,$cordovaStatusbar, $ionicPopup) {
  $ionicPlatform.ready(function() {
            if(window.Connection) {
                if(navigator.connection.type == Connection.NONE) {
                    $ionicPopup.confirm({
                        title: "Non Connesso a Internet",
                        content: "Connettiti a Internet per poter usare l'app"
                    })
                    .then(function(result) {
                        if(!result) {
                            ionic.Platform.exitApp();
                        }
                    });
                }
            }
        });

  $ionicPlatform.ready(function() {
    //Settings barra in alto
    setTimeout(function() {
        if(window.StatusBar) {
          StatusBar.styleDefault();
        }
  
    }, 300); 

    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }


    
  });
});

app.config(
    function( $compileProvider ){   
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(geo):/);

    }
);



// SPLASH SCREEN
app.run(function($cordovaSplashscreen) {
  setTimeout(function() {
    $cordovaSplashscreen.hide()
  }, 5000)
});

app.config(function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        //    key: 'your api key',
        v: '3.20', //defaults to latest 3.X anyhow
        libraries: 'weather,geometry,visualization'
    });
});

app.run(function ($state,$rootScope) {
    $rootScope.$state = $state;
});

app.directive('disableTap', function($timeout) {
  return {

    link: function() {

      $timeout(function() {
        console.log("Corretto")
        document.querySelector('.pac-container').setAttribute('data-tap-disabled', 'true')
      },2500);
    }
  };
});




//risolve il problema del doppio submit
app.config(function( $mdGestureProvider ) {
          $mdGestureProvider.skipClickHijack();
      });




app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/home.html',
    controller: 'AppCtrl'
  })


    .state('app.events', {
      url: '/events',
      views: {
        'homeContent': {
          templateUrl: 'templates/events.html',
          controller: 'EventsCtrl'
        }
      }
  })

    .state('app.who', {
        url: '/who',
        views: {
          'homeContent': {
            templateUrl: 'templates/who.html'
          }
        }
    })

    .state('app.contacts', {
        url: '/contacts',
        views: {
          'homeContent': {
            templateUrl: 'templates/contacts.html'
          }
        }
    })

    .state('app.terms', {
        url: '/terms',
        views: {
          'homeContent': {
            templateUrl: 'templates/terms.html'
          }
        }
    })



  .state('app.event', {
    url: '/events/:eventId',
    views: {
      'homeContent': {
        templateUrl: 'templates/event.html',
        controller: 'EventCtrl'
      }
    }
  }) 





  $urlRouterProvider.otherwise('/app/events');

});
