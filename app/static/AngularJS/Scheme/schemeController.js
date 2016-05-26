registrationModule.controller('schemeController', function($scope, alertFactory, schemeRepository){
    
  // Primer metodo llamado al cargar la pagína
    $scope.init = function () {
        $scope.getScheme();
    }
    // Metodo para obtiener todos los intereses
    $scope.getScheme = function () {
        $scope.promise  =  schemeRepository.getScheme().then(function (result) {
            if (result.data.length > 0) {
                $scope.esquemas = result.data;
                alertFactory.success("Esquemas cargados");
            } else {
                alertFactory.info("No se encontraron Esquemas");
            }
        }, function (error) {
            alertFactory.error("Error al cargar Esquemas");
        });
    };
});