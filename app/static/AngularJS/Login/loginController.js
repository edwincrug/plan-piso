registrationModule.controller('loginController', function ($scope, alertFactory, loginRepository, localStorageService, $rootScope) {
    $scope.message = 'Buscando...';
    $scope.empleado = [];
    
    
    $scope.init = function () {
        $(".dropdown").remove(".dropdown");
        $("#botonCerrar").remove(".a");
        
        if (!($('#lgnUser').val().indexOf('[') > -1)) {
                localStorageService.set('lgnUser', $('#lgnUser').val());
                location.href = '/newUnits';
            } else {
                if (($('#lgnUser').val().indexOf('[') > -1) && !localStorageService.get('lgnUser')) {
                    if (getParameterByName('employee') != '') {
                        $rootScope.currentEmployee = getParameterByName('employee');
                        location.href = '/newUnits';
                    } else {
                        alert('Inicie sesión desde panel de aplicaciones.');
                        //window.close(); 
                    }

                }
            }
        $rootScope.currentEmployee = localStorageService.get('lgnUser');
        console.log($rootScope.currentEmployee)
        }

        
        $scope.getEmpleado = function(){
            loginRepository.getEmpleado($rootScope.currentEmployee).then(function (result) {
            if (result.data.length > 0) {
                $rootScope.empleado = result.data;
              } else {
                alertFactory.info("Datos Incorrectos");
            }
        }, function (error) {
            alertFactory.error("Datos no correctos");
        });
    }
    
    
        $scope.getValidaUsuario = function () {
        $scope.promise = loginRepository.getValidaUsuario($scope.usuario, $scope.password).then(function (result) {
            if (result.data.length > 0) {
                alertFactory.success("Bienvenido a Plan Piso"+ result.data[0].usuario);
                $rootScope.login = result.data;
                $scope.nombreUsuario = result.data[0].usuario;
                location.href = '/newUnits';
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