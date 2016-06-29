registrationModule.controller('loginController', function ($scope, alertFactory, loginRepository) {
    $scope.message = 'Buscando...';
    $scope.init = function () {
          $("nav").remove(".navbar");
        }
        $scope.getValidaUsuario = function () {
        $scope.promise = loginRepository.getValidaUsuario($scope.usuario, $scope.password).then(function (result) {
            if (result.data.length > 0) {
                alertFactory.success("Bienvenido a Plan Piso"+ result.data[0].usuario);
                $scope.login = result.data;
                location.href = '/interest';
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