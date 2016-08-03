var newUnitstsURL = global_settings.urlCORS + 'api/calculo/';


registrationModule.factory('newUnitsRepository', function ($http) {
     return {
         getNewUnits: function() {
            return $http({
                url: newUnitstsURL + 'newUnits/',
                method: "GET"
            });
        },
        getNewUnitsCompany: function (idEmpresa) {
            return $http({
                url: newUnitstsURL + 'newUnitsCompany/',
                method: "GET",
                params: {
                    idEmpresa: idEmpresa
                },  
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        getNewUnitsSucursal: function (idEmpresa, idSucursal) {
            return $http({
                url: newUnitstsURL + 'newUnitsSucursal/',
                method: "GET",
                params: {
                    idEmpresa: idEmpresa,
                    idSucursal: idSucursal
                },  
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
         updateSchemeNews: function (idEsquema,vehNumserie) {
            return $http({
                url: newUnitstsURL + 'updateschemenews/',
                method: "POST",
                data: {
                    idEsquema: idEsquema,
                    vehNumserie: vehNumserie
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
          insertMovementScheme: function (idUnidad,idFinanciera,fecha,cargo,abono) {
            return $http({
                url: newUnitstsURL + 'insertmovementscheme/',
                method: "POST",
                data: {
                        idUnidad : idUnidad,
                        idFinanciera : idFinanciera,
                        fecha : fecha,
                        cargo : cargo,
                        abono : abono
                },
                headers: {
                    'Content-Type': 'application/json'
                }

            });
        }
         
         
         
     }
});

