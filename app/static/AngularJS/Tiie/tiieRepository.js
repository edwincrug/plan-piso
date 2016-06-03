var tiieURL = global_settings.urlCORS + 'api/calculo/';


registrationModule.factory('tiieRepository', function($http) {

    return {        
        getTiie: function() {
            return $http({
                url: tiieURL + 'tiie/',
                method: "GET"
            });
        },
        addTiie: function(fecha, plazo, monto){
            return $http({
                url: tiieUrl + 'tiie/',
                method: "POST",
                data: {fecha:fecha,
                      plazo: plazo,
                      monto: monto},
                headers: {
                'Content-Type': 'application/json'
                }
            });
        }

    };
});

