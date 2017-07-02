angular.module('starter.controllers', [])


/*Home Controller*/
.controller('homeCtrl', function($http,$scope,$window){
	console.log("hola mundo desde ");

	$scope.goDonate = function(){
		$window.location.assign('#/donate');
	};

	$scope.goRecolect = function(){
		$window.location.assign('#/recolect');
	};


})


/*Donate Controller*/
.controller('donateCtrl', function($http,$scope, ionicDatePicker){
	
	$scope.expirationDate;
	$scope.food={};
	$scope.foods = [];

	$scope.addFood = function(){
		$scope.foods.push($scope.food);	
		console.log($scope.foods);
		$scope.food={};
	}

	$scope.removeFood = function(index){
		$scope.foods.splice(index,1);
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

})