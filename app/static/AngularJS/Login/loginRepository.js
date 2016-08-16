var loginURL = global_settings.urlCORS + 'api/calculo/';


registrationModule.factory('loginRepository', function($http) {

    return {        
        getValidaUsuario: function(usuario,password) {
            return $http({
                url: interestsURL + 'ValidaUsuario/',
                method: "GET",
                 params: {usuario: usuario,
                         password:password},
                headers: {
                'Content-Type': 'application/json'
                }
            });
        },
        getEmpleado: function(idUsuario) {
            return $http({
                url: interestsURL + 'getEmpleado/',
                method: "GET",
                 params: {idUsuario: idUsuario},
                headers: {
                'Content-Type': 'application/json'
                }
            });
        } 
};      
});

