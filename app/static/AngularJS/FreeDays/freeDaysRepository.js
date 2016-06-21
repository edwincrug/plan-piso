var freeDaysURL = global_settings.urlCORS + 'api/calculo/';


registrationModule.factory('freeDaysRepository', function($http) {
    return {
        getFreeDays: function(nombreEmpresa) {
            return $http({
                url: freeDaysURL + 'freedays/',
                method: "GET",
                 params: {nombreEmpresa:nombreEmpresa},
                headers: {
                'Content-Type': 'application/json'
                }
            });
        },
        getFreedaysSucursal: function(nombreEmpresa,nombreSucursal) {
            return $http({
                url: freeDaysURL + 'freedaysSucursal/',
                method: "GET",
                 params: {nombreEmpresa:nombreEmpresa,
                         nombreSucursal:nombreSucursal},
                headers: {
                'Content-Type': 'application/json'
                }
            });
        }
    };
});


