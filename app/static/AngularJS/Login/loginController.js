registrationModule.controller('loginController', function ($scope, alertFactory, loginRepository, localStorageService, $rootScope) {
    $scope.message = 'Buscando...';
    $scope.empleado = [];
    $rootScope.currentEmployee = 0;
    
    
        
    $scope.init = function () {
        $(".dropdown").remove(".dropdown");
        $(".botonCerrar").remove(".botonCerrar");
	    $(".blanco").remove(".blanco");
        
	localStorageService.clearAll('userData');
        localStorageService.clearAll('lgnUser');
        if (!($('#lgnUser').val().indexOf('[') > -1)) {
//return localStorageService.clearAll('lgnUser');
                localStorageService.set('lgnUser', $('#lgnUser').val());
                $scope.getEmpleado();
                location.href = '/newUnits';
            } else {
                if (($('#lgnUser').val().indexOf('[') > -1) && !localStorageService.get('lgnUser')) {
                    if (getParameterByName('employee') != '') {
                        $rootScope.currentEmployee = getParameterByName('employee');
                        location.href = '/newUnits';
                    } else {
			return localStorageService.clearAll('lgnUser');
			//localStorageService.set('lgnUser', null);
                        alert('Inicie sesión desde panel de aplicaciones o desde el login.');
                    }

                }
            }
        $rootScope.currentEmployee = localStorageService.get('lgnUser');
        }
    
    $scope.inicartodo = function(){
        return localStorageService.clearAll('userData');
        return localStorageService.clearAll('lgnUser');
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
        $scope.login = function(usuario, password){
        $scope.promise = loginRepository.getValidaUsuario(usuario, password).then(function (result) {
            if (result.data.length > 0) {
                alertFactory.success("Bienvenido a Plan Piso"+ result.data[0].usuario);
                $rootScope.login = result.data;
		localStorageService.clearAll('lgnUser');
                //$scope.nombreUsuario = result.data[0].usuario;
                //$('#lgnUser').val(result.data[0].idUsuario)
                localStorageService.set('userData', $rootScope.login);
                location.href = '/newUnits';
            } else {
                alertFactory.info("Datos Incorrectos");
            }
        });
        }
});