var myApp = angular.module('trasportApp', []);

myApp.controller('orderController', function($scope, $http) {

	$scope.alerts = [
//	{ type: 'danger', msg: 'Order deleted successfully' },
//	{ type: 'warning', msg: 'Order updated successfully' },
//	{ type: 'success', msg: 'You successfully added new order' }
	];

	$scope.base_url = 'http://##############';

    $http.get($scope.base_url + 'orders').then(function(response) {
        $scope.result = response.data;
    });


    $scope.add = function(){
	    $http.post($scope.base_url + 'order', $scope.order).then(function(response) {
	        $http.get($scope.base_url + 'orders').then(function(response) {
		        $scope.result = response.data;
		    });
	    });

	    // Show msg in Alert box  
		$scope.alerts.push({type: 'success', msg: "New order added successfully!", show: true});
	};

	$scope.del = function(id){
		var result = confirm('Are you sure, want to delete this order?');
		if(result===true) {
			$http.delete($scope.base_url + 'order/' + id).then(function(response) {
//				alert('Order deleted');

				// Show msg in Alert box  
				$scope.alerts.push({type: 'danger', msg: "Order deleted successfully!", show: true});
				  

				$http.get($scope.base_url + 'orders').then(function(response) {
			        $scope.result = response.data;
			    });

			});

		}
	};

	$scope.edit = function(order) {
		$scope.order = order;
	};
	
	$scope.update = function(id) {
		$http.put($scope.base_url + 'order/' + id, $scope.order).then(function(response) {
//			alert('Order updated');

			// Show msg in Alert box  
			$scope.alerts.push({type: 'warning', msg: "Order updated successfully!", show: true});
		});
	};

});