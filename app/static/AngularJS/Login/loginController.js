registrationModule.controller('loginController', function ($scope, alertFactory, loginRepository) {
    $scope.init = function () {
          
        }
    
    
        $scope.getValidaUsuario = function () {
        $scope.promise = loginRepository.getValidaUsuario($scope.usuario, $scope.password).then(function (result) {
            if (result.data.length > 0) {
                $scope.login = result.data;
                location.href = '/';
                //$scope.diasGracia = result.data.diasGracia;
                alertFactory.success("Datos Correctos");
            } else {
                alertFactory.info("Datos Incorrectos");
            }
        }, function (error) {
            alertFactory.error("Datos no correctos");
        });
    }
        
        $scope.login = function(usuario, password){
            $scope.usuario = usuario;
            $scope.password = password;
             $scope.getValidaUsuario();
        }
    
});