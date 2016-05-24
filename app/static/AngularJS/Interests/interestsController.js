registrationModule.controller('interestsController', function($scope, alertFactory, interestsRepository) {
    $scope.getFreeDays = function() {
        //console.log(interestsRepository.getCliente());

        interestsRepository.getFreeDays().then(function(result) {
            if (result.data.length > 0) {
                console.log(result.data);
                $scope.clientes = result.data;
                alertFactory.success("Clientes cargados");
            } else {
                alertFactory.info("No se encontraron clientes");
            }
        }, function(error) {
            alertFactory.error("Error al cargar clientes");
        });
    };
 $scope.getInterest = function() {
        //console.log(interestsRepository.getCliente());

        interestsRepository.getInterest().then(function(result) {
            if (result.data.length > 0) {
                $scope.interes = result.data;
                alertFactory.success("Clientes cargados");
            } else {
                alertFactory.info("No se encontraron clientes");
            }
        }, function(error) {
            alertFactory.error("Error al cargar clientes");
        });
    };
});
