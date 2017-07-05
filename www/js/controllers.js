angular.module('starter.controllers', [])


/*Home Controller*/
.controller('homeCtrl', function($http,$scope,$window, $ionicSideMenuDelegate){
	console.log("hola mundo desde ");

	$scope.goDonate = function(){
		$window.location.assign('#/donate');
	};

	$scope.goRecolect = function(){
		$window.location.assign('#/recolect');
	};

    $scope.toggleLeft = function() {
      console.log("toggleLeft");
    $ionicSideMenuDelegate.toggleLeft();
  };

})


/*Donate Controller*/
.controller('donateCtrl', function($http,$scope, ionicDatePicker,  $cordovaCamera, $ionicPopup, $window){
	
	$scope.expirationDate;
	$scope.food={};
	$scope.foods = [];
	 

 	$scope.takePhoto = function () {
                  var options = {
                    quality: 75,
                    destinationType: Camera.DestinationType.DATA_URL,
                    sourceType: Camera.PictureSourceType.CAMERA,
                    allowEdit: true,
                    encodingType: Camera.EncodingType.JPEG,
                    targetWidth: 300,
                    targetHeight: 300,
                    popoverOptions: CameraPopoverOptions,
                    saveToPhotoAlbum: false
                };
   
                    $cordovaCamera.getPicture(options).then(function (imageData) {
                        $scope.imgURI = "data:image/jpeg;base64," + imageData;
                        console.log($scope.imgURI);
                    }, function (err) {
                        // An error occured. Show a message to the user
                    });
                }
  

	$scope.addFood = function(){
		$scope.foods.push($scope.food);	
		console.log($scope.foods);
		$scope.food={};
	}

	$scope.removeFood = function(index){
     $scope.showConfirm = function() {
	   var confirmPopup = $ionicPopup.confirm({
	     title: 'Borrar alimento',
	     template: '¿Est&aacute;s seguro de querer borrar este alimento?',
	      buttons: [
                {
                  text: '<b>S&iacute;</b>',
                  type: 'button-positive',
                  onTap: function(e) {
				       $scope.foods.splice(index,1);
                  }
                },
                { text: 'Cancelar', onTap: function(e) { return true; } },
              ]
	   });
	 };
	 $scope.showConfirm();

	}

	 var ipObj1 = {
      callback: function (val) { 
      	var date = new Date(val);
      	$scope.food.expirationDate = dateToString(date);
      },
      templateType: 'popup'       //Optional
    };

    var dateToString = function(date){
      	var month = date.getMonth();
    	switch(month){
    		case 0:
    			month = "Enero";
    			break;
    		case 1:
    			month = "Febrero";
    			break;
    		case 2:
    			month = "Marzo";
    			break;
    		case 3:
    			month = "Abril";
    			break;
    		case 4:
    			month = "Mayo";
    			break;
    		case 5:
    			month = "Junio";
    			break;
    		case 6:
    			month = "Julio";
    			break;
    		case 7:
    			month = "Agosto";
    			break;
    		case 8:
    			month = "Septiembre";
    			break;
    		case 9:
    			month = "Octubre";
    			break;
    		case 10:
    			month = "Noviembre";
    			break;
    		case 11:
    			month = "Diciembre";
    			break;
    	}	

		return date.getDate() + " de " + month + " del " + date.getFullYear();
    }



	$scope.openDatePicker = function(){
		console.log("openDatePicker");
      ionicDatePicker.openDatePicker(ipObj1);
    };

    $scope.goDonateDetails = function(){
		$window.location.assign('#/donate-details');
	};




})

/*Donate Details Controller*/
.controller('donateDetailsCtrl', function($http,$scope,$window,$ionicModal, $cordovaGeolocation){
	$scope.adresses = [
		{
			street1: 'Calle Axayacatl Holi',
			street2: 'Cd del Sol',
			city: '45050 Zapopan, Jal',
			phone: '335570092854'
		},
		{
			street1: 'Calle Cuitláhuac 4096',
			street2: 'Cd del Sol',
			city: '45050 Zapopan, Jal',
			phone: '335570092854',
		},
		{
			street1: 'Av. San Luis Gonzaga 5026',
			street2: 'Jardines de Guadalupe',
			city: '45050 Zapopan, Jal',
			phone: '335570092854',
		}
	];

		 $ionicModal.fromTemplateUrl('templates/address-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.openModal = function() {
    $scope.modal.show();
    $scope.generateMap();
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };
  // Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
  // Execute action on hide modal
  $scope.$on('modal.hidden', function() {
    // Execute action
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action
  });


	$scope.showModal = function(){


	 
  	$scope.openModal();

  	};

	$scope.goDonate = function(){
		$window.location.assign('#/donate');
	};

	$scope.goRecolect = function(){
		$window.location.assign('#/recolect');
	};

	var options = {timeout: 10000, enableHighAccuracy: true};
 
  $scope.generateMap = function(){
  	var marker;
  	var geocoder = new google.maps.Geocoder;
  	$cordovaGeolocation.getCurrentPosition(options).then(function(position){
 
    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
 
    var mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
 
    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
 	
 	google.maps.event.addListener($scope.map, 'click', function(event) {
    var lat = event.latLng.lat();
    var lng = event.latLng.lng();
    // populate yor box/field with lat, lng
    console.log("Lat=" + lat + "; Lng=" + lng);
    placeMarker(event.latLng);
    getAdress(event.latLng);
	});



	function placeMarker(location) {
	      if ( marker ) {
		    marker.setPosition(location);
		  } else {
		    marker = new google.maps.Marker({
		      position: location,
		      map: $scope.map
		    });
			}

	}


	function getAdress(location){
		 geocoder.geocode({'location': location}, function(results, status) {
          if (status === 'OK') {
            if (results[0]) {
              console.log(results[0].formatted_address);
			}
		   }
		});
	}

  }, function(error){
    console.log("Could not get location");
  });
  


  }


})



/*Map Controller*/
.controller('mapCtrl', function($http,$scope, ionicDatePicker,  $cordovaCamera, $ionicPopup, $window, $cordovaGeolocation){

})