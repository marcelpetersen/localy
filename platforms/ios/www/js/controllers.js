
var app = angular.module('starter.controllers',[]);

app.controller('AppCtrl', function($scope, $ionicModal, $timeout, $ionicSideMenuDelegate,$ionicPopover, $ionicNavBarDelegate, $state, $ionicPopup) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  

$scope.goBack = function() {
  $state.go('app.events');
  };

//       ---------------   POPUP Conferma   ----------------

$scope.showPopup = function() {
  $scope.data = {}

  // An elaborate, custom popup
  var myPopup = $ionicPopup.show({
    template: 'L Evento sarà pubblicato entro le prossime 12 ore se rispetta le normative dell app ',
    title: 'Evento Inviato',
    scope: $scope,
    buttons: [ { text: 'Chiudi' } ]
  })


};



//       ---------------   FORM PER PUBBLICARE EVENTO   ----------------

  $ionicModal.fromTemplateUrl('templates/shoutForm.html', {
    id:1,
    scope: $scope
  }).then(function(modal) {
    $scope.modal1 = modal;
  });

  $scope.closeShoutForm = function() {
    $scope.modal1.hide();

  };

  $scope.shoutForm = function() {
    $scope.modal1.show();
  };




// ---------------parallax menu ---------------------- //

$scope.menu3D = function(){



  if ( $(".transformed").attr('value') == "True" ) {

      $(".transformed").attr("value", "False");

  $(".transformed").css("transform","translateZ(0px) translateX(0%) rotateY(0deg)");

  document.getElementById('menuBG').style.left = '-100%'

  } else {

  $(".transformed").attr("value", "True");
  $(".transformed").css("transform","translateZ(-100px) translateX(65%) rotateY(-45deg)");
  document.getElementById('menuBG').style.left = '0%'

  }
}



$scope.closeMenu3D = function(){



      $(".transformed").attr("value", "False");

  $(".transformed").css("transform","translateZ(0px) translateX(0%) rotateY(0deg)");

  document.getElementById('menuBG').style.left = '-100%'
  

}





//       ---------------   LOGIN   ----------------

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    id:2,
    scope: $scope
  }).then(function(modal) {
    $scope.modal2 = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal2.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal2.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
//       ---------------   MAPPA   ----------------

  $ionicModal.fromTemplateUrl('templates/map.html', {
    id:3,
    scope: $scope
  }).then(function(modal) {
    $scope.modal3 = modal;
  });

  $scope.closeMap = function() {
    $scope.modal3.hide();
  };

  $scope.showMap = function() {
    $scope.modal3.show();
  };


});



app.controller("EventsCtrl", function($scope, $firebaseObject,$firebaseArray,uiGmapGoogleMapApi,$cordovaCamera,$ionicPopup) {
  var ref = new Firebase("https://sizzling-torch-8174.firebaseio.com/events");
  $scope.events = $firebaseArray(ref.orderByChild("date2"));
  var today = new Date();
  $scope.today = today.getFullYear() + "-" + (today.getMonth()+1) + "-" + today.getDate();
  $scope.today2 = { 
      year: today.getFullYear(),
      month: (today.getMonth()+1),
      day: today.getDate()
    };
  console.log($scope.today2);



  $scope.selectedImg = {
    img: 'img/events.jpg'
  }
   

  // PLUGIN IMAGE PICKER
  $scope.getImage = function() {
    var options = {
                    quality: 75,
                    destinationType: Camera.DestinationType.DATA_URL,
                    sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                    allowEdit: false,
                    encodingType: Camera.EncodingType.JPEG,
                    width: 350,
                    height: 200,
                    popoverOptions: CameraPopoverOptions,
                    saveToPhotoAlbum: false
  
    };
    $cordovaCamera.getPicture(options).then(function (imageData) {
                        $scope.imgURI = "data:image/jpeg;base64," + imageData;
                        $scope.selectedImg.img = "data:image/jpeg;base64," + imageData;
                        console.log($scope.selectedImg.img);

                    }, function (err) {
                        // An error occured. Show a message to the user
                    });
    }

    $scope.selectImage = function(){
      $scope.data = {}

      // An elaborate, custom popup
      $scope.imgPopup = $ionicPopup.show({
        templateUrl: 'templates/selectimg.html',
        title: 'Seleziona Immagine',
        scope: $scope,
        buttons: [ { text: 'Chiudi' } ]
      })


    }

    $scope.images = [];
 
    $scope.loadImages = function() {
            $scope.images.push({id: 1, src: "img/bars.jpg"});
            $scope.images.push({id: 2, src: "img/events.jpg"});
            $scope.images.push({id: 3, src: "img/restaurants.jpg"});
            $scope.images.push({id: 4, src: "img/musica.jpg"});
            $scope.images.push({id: 5, src: "img/musica1.jpg"});
            $scope.images.push({id: 6, src: "img/musica2.jpg"});
            $scope.images.push({id: 7, src: "img/musica3.jpg"});
            $scope.images.push({id: 8, src: "img/musica4.jpg"});
            $scope.images.push({id: 9, src: "img/musica5.jpg"});
            $scope.images.push({id: 10, src: "img/altro1.jpg"});
            $scope.images.push({id: 11, src: "img/altro2.jpg"});
            $scope.images.push({id: 12, src: "img/ape1.jpg"});
            $scope.images.push({id: 13, src: "img/bars2.jpg"});
            $scope.images.push({id: 14, src: "img/bars3.jpg"});
            $scope.images.push({id: 15, src: "img/bars4.jpg"});
            $scope.images.push({id: 16, src: "img/disco.jpg"});


        
    }

    $scope.selected = function(id){
      console.log($scope.images[1].src)
      $scope.$parent.selectedImg.img = $scope.images[id].src
      $scope.imgPopup.close();


    }

  

  $scope.createEvent= function(event){
    console.log(event.location);
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({'address':event.location},function(results,status){
    if (status === google.maps.GeocoderStatus.OK) {
      $scope.loc = results[0].geometry.location;
      console.log($scope.loc);
      ref.once('value',function(snapshot){
        if (snapshot.hasChild(event.title)) event.title = event.title + "!";
      });
      ref.child(event.title).set({
          local: event.local,
          category: event.category,
          address: event.location,
          location: {
               latitude: $scope.loc.lat(),
               longitude: $scope.loc.lng()
              },
          date: event.date.toString(),
          date2: { 
              year: event.date.getFullYear(),
              month:(event.date.getMonth()+1),
              day: event.date.getDate()
            },
          desc: event.desc,
          offerta: event.coupon,
          offertatitolo: "",
          offertacosto: "",
          code: $scope.randomString(6, '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'),
          phone: event.phone,
          email: event.mail,
          start_time: event.start_time.toString().substr(16,5),
          end_time: event.end_time.toString().substr(16,5),
         
          image: $scope.selectedImg.img,
          accepted: false
            });



    }

    })



    /*
    $scope.geodata = {};
    $scope.queryResults = {};
    $scope.queryError = {};

    $http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + event.location + '&key=AIzaSyC07R343wd-yg7wepGYCo3IQFBHG50Q7dA')
    .then(function(_results){
      $scope.queryResults = _results.data.results;
      $scope.geodata = $scope.queryResults[0].geometry;
      
    }, 
     function error(_error){
        $scope.queryError = _error;
     })  */
    $scope.closeShoutForm();
  }

  $scope.randomString= function(length, chars) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
  }




  $scope.disableTap = function(){
    //document.querySelector('.pac-container').setAttribute('data-tap-disabled', 'true');    
    }


  });


app.controller("MapCtrl",function($scope,$ionicPlatform,uiGmapGoogleMapApi){
    $scope.myLocation = {
    lng : '',
    lat: ''
  }
  uiGmapGoogleMapApi.then(function(maps){

   
  $scope.drawMap = function(position) {
 
    //$scope.$apply is needed to trigger the digest cycle when the geolocation arrives and to update all the watchers
    $scope.$apply(function() {
      $scope.myLocation.lng = position.coords.longitude;
      $scope.myLocation.lat = position.coords.latitude;
 
      $scope.map = {
        center: {
          latitude: 41.4907889,
          longitude: 13.833377599999949
        },
        zoom: 9,
        pan: 1,
        streetViewControl: false,
      };

      var icon2 = {
          url: 'img/icon2.png', // url
          scaledSize: new google.maps.Size(30, 30), // scaled size
          origin: new google.maps.Point(0,0), // origin
          anchor: new google.maps.Point(0, 0) // anchor
      };
 
      $scope.marker1 = {
        id: 0,
        coords: {
          latitude: $scope.myLocation.lat,
          longitude: $scope.myLocation.lng
          },
        options: {
          draggable: false,
          clickable: false,
          icon: icon2  
          //labelContent: "lat: " + $scope.marker.coords.latitude + '<br/> ' + 'lon: ' + $scope.marker.coords.longitude,
          //labelAnchor: "80 120",
          //labelClass: "marker-labels"
        }
        
       

        
      }

      var icon1 = {
          url: 'img/icon1.png', // url
          scaledSize: new google.maps.Size(30, 50), // scaled size
          origin: new google.maps.Point(0,0), // origin
          anchor: new google.maps.Point(20, 35) // anchor
      };


      $scope.marker2 = {

      }
      $scope.marker2.options = {
        scrollwheel: false,
        icon: icon1
      };
      




      $scope.windowOptions = {
                visible: false
            };

      $scope.closeClick = function() {
                $scope.windowOptions.visible = false;
            };


        });
      }
 
  navigator.geolocation.getCurrentPosition($scope.drawMap);  
  });

 
});


app.controller("EventCtrl", function($scope,$stateParams,$firebaseObject,$ionicModal,$ionicPlatform,$window){
    var ref = new Firebase("https://sizzling-torch-8174.firebaseio.com/events/" + $stateParams.eventId );
    $scope.id = $stateParams.eventId;
    $scope.event = $firebaseObject(ref);
    $scope.locmap = $firebaseObject(ref);


      $ionicModal.fromTemplateUrl('templates/coupon.html', {
          id:4,
          scope: $scope
        }).then(function(modal) {
          $scope.modal4 = modal;
        });

        $scope.closeCoupon = function() {
          $scope.modal4.hide();

        };

        $scope.showCoupon = function() {
          $scope.modal4.show();
        };
    
    $scope.openGeo = function (latitude , longitude) {
      if (ionic.Platform.isIOS()){
        $window.open('maps://?q='+latitude+','+longitude,'_system','location=yes') ;
      } else {
        $window.open('geo:' + latitude + ',' + longitude + '?z=11&q=' + latitude + ',' + longitude, '_system', 'location=yes');
      }
    }
    $scope.dataIta = function (data,opt) {
      var giorno;
      var mese;
      switch (data.substr(0,3)){
        case "Mon":
          giorno = "Lunedì"
          break;
        case "Tue":
          giorno = "Martedì"
          break;
        case "Wed":
          giorno = "Mercoledì"
          break;
        case "Thu":
          giorno = "Giovedì"
          break;
        case "Fri":
          giorno = "Venerdì"
          break;
        case "Sat":
          giorno = "Sabato"
          break;
        case "Sun":
          giorno = "Domenica"
          break;
        default:
          giorno = ""
      }

      switch (data.substr(4,3)){
        case "Jan":
          mese = "Gennaio"
          break;
        case "Feb":
          mese = "Febbraio"
          break;
        case "Mar":
          mese = "Marzo"
          break;
        case "Apr":
          mese = "Aprile"
          break;
        case "May":
          mese = "Maggio"
          break;
        case "Jun":
          mese = "Giugno"
          break;
        case "Jul":
          mese = "Luglio"
          break;
        case "Aug":
          mese = "Agosto"
          break;
        case "Sep":
          mese = "Settembre"
          break;
        case "Oct":
          mese = "Ottobre"
          break;
        case "Nov":
          mese = "Novembre"
          break;
        case "Dec":
          mese = "Dicembre"
          break;
        default:
          mese = ""
      }

      if (opt == 1) return data.substr(8,2) + " " + mese;
      else return giorno + " " + data.substr(8,2) + " " + mese;


    }

    
  
    

 });










