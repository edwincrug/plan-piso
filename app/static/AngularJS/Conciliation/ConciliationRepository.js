var ConciliationURL = global_settings.urlCORS + 'api/conciliacion/';


registrationModule.factory('ConciliationRepository', function($http) {
    return {
    	  getFinancieraEmpresa: function (idEmpresa) {
            return $http({
                url: ConciliationURL + 'financieraEmpresa/',
                method: "GET",
                params: {
                    idEmpresa: idEmpresa
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }

    };
});
