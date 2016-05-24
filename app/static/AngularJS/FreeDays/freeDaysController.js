registrationModule.controller('freeDaysController', function($scope, alertFactory, freeDaysRepository) {

    $scope.allDays={};

    $scope.getFreeDays = function() {


        freeDaysRepository.getFreeDays().then(function(result) {
            if (result.data.length > 0) {                
                $scope.allDays = result.data;
                console.log($scope.allDays);
                alertFactory.success("Clientes cargados");
            } else {
                alertFactory.info("No se encontraron datos");
            }
        }, function(error) {
            alertFactory.error("Error al cargar datos");
        });

    };
});
