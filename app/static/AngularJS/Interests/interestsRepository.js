var interestsURL = global_settings.urlCORS + 'api/calculo/';


registrationModule.factory('interestsRepository', function ($http) {

    return {
        getInterest: function (idEmpresa) {
            return $http({
                url: interestsURL + 'interest/',
                method: "GET",
                params: {
                    idEmpresa: idEmpresa
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        getDetailsUnit: function (vehNumserie) {
            return $http({
                url: interestsURL + 'detailsUnit/',
                method: "GET",
                params: {
                    vehNumserie: vehNumserie
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
            getDetailsUnitScheme: function (vehNumserie) {
            return $http({
                url: interestsURL + 'detailsUnitscheme/',
                method: "GET",
                params: {
                    vehNumserie: vehNumserie
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        getCompany: function () {
            return $http({
                url: interestsURL + 'company/',
                method: "GET"
            });
        },
        getInterestSucursal: function (idEmpresa, idSucursal, idFinanciera) {
            return $http({
                url: interestsURL + 'interestSucursal/',
                method: "GET",
                params: {
                    idEmpresa: idEmpresa,
                    idSucursal: idSucursal,
                    idFinanciera: idFinanciera
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        getSucursal: function (idEmpresa) {
            return $http({
                url: interestsURL + 'sucursal/',
                method: "GET",
                params: {
                    idEmpresa: idEmpresa
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        getFinancieraSelect: function (idEmpresa) {
            return $http({
                url: interestsURL + 'financieraselect/',
                method: "GET",
                params: {
                    idEmpresa: idEmpresa
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        getInterestFinanciera: function (idEmpresa, idFinanciera) {
            return $http({
                url: interestsURL + 'interestfinanciera/',
                method: "GET",
                params: {
                    idEmpresa: idEmpresa,
                    idFinanciera: idFinanciera
                },  
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        updateScheme: function (idEsquema,vehNumserie) {
            return $http({
                url: interestsURL + 'updatescheme/',
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
        getDetalleEsquemaUnidad : function (idEsquema) {
            return $http({
                url: interestsURL + 'detalleEsquemaunidad/',
                method: "GET",
                params: {
                    idEsquema: idEsquema
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        getDetalleUnidadEsquema : function (vehNumserie) {
            return $http({
                url: interestsURL + 'detalleunidadesquema/',
                method: "GET",
                params: {
                    vehNumserie: vehNumserie
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        getInterestCompanySucursal: function (idEmpresa, idSucursal) {
            return $http({
                url: interestsURL + 'interestcompanysucursal/',
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
        getUnitsDetailSpayment : function (idUnidad) {
            return $http({
                url: interestsURL + 'unitsdetailspayment/',
                method: "GET",
                params: {
                    idUnidad: idUnidad
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
    };
});