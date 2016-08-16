var loginURL = global_settings.urlCORS + 'api/calculo/';


registrationModule.factory('loginRepository', function($http) {

    return {        
        getValidaUsuario: function(usuario,password) {
            return $http({
                url: loginURL + 'ValidaUsuario/',
                method: "GET",
                 params: {usuario: usuario,
                         password:password},
                headers: {
                'Content-Type': 'application/json'
                }
            });
        },
        getEmpleado: function(idEmpleado) {
            return $http({
                url: loginURL + 'getEmpleado/',
                method: "GET",
                 params: {idEmpleado: idEmpleado},
                headers: {
                'Content-Type': 'application/json'
                }
            });
        } 
};      
});

