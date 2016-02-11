  // will execute when device is ready, or immediately if the device is already ready.
    angular.module('starter')
    .directive('googleplace', function($timeout) {
        return {
            require: 'ngModel',
            link: function(scope, element, attrs, model) {
                var options = {
                    types: [],
                    componentRestrictions: {}
                };
                scope.gPlace = new google.maps.places.Autocomplete(element[0], options);
     
                google.maps.event.addListener(scope.gPlace, 'place_changed', function() {
                    console.log('place changed');
                    scope.$apply(function() {
                        model.$setViewValue(element.val());                
                    });
                });

                
                $timeout(function(){
                    var predictionContainer = angular.element(document.getElementsByClassName('pac-container'));
                    predictionContainer.attr('data-tap-disabled', true);
                    predictionContainer.css('pointer-events', 'auto');
                    predictionContainer.bind('click', function(arg){                    
                        element[0].blur();
                    });  
                    console.log('timout', predictionContainer)              
                }, 2500); 

            }
        };
});
