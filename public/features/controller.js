function databaseCtrl($scope, $http){
	console.log("ctrl speaking");
	
	$scope.message="hello cont";

	$scope.create = function(){
		console.log($scope.seq.name);
		$http.post("/seqs", {"name": $scope.seq.name})
		.success(function (response) {
			$scope.all();
		});
	}
	
	
	$scope.renderSeq = function (response) {
		$scope.seqs = response;
	};
	
	$scope.remove = function(id){
		$http.delete("/seqs/" +id)
		.success(function (response) {
			$scope.all();
		});
	};
	
	$scope.update = function() {
	console.log($scope.seq);
	$http.put("/seqs/"+ $scope.seq._id,$scope.seq)
	.success(function (response) {
			$scope.all();
		});
	};
	
	$scope.select = function (id){
		console.log(id);
		$http.get("/seqs/"+id)
		.success(function(response){
			console.log(response);
			$scope.seq = response;
		});
	};
	
	$scope.all = function(){
	$http.get("/seqs")
	.success($scope.renderSeq);
	}
	$scope.all();
}