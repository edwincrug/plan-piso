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
        updateScheme: function (idEsquema,idUnidad) {
            return $http({
                url: interestsURL + 'updatescheme/',
                method: "POST",
                data: {
                    idEsquema: idEsquema,
                    idUnidad: idUnidad
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
        },
        insertMovementFinancial : function (idUnidad,idFinanciera,fecha,cargo,abono) {
            return $http({
                url: interestsURL + 'insertmovementfinancial/',
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
        },
        insertMovementFinancialCargo: function (idUnidad,idFinanciera,fecha,cargo,abono) {
            return $http({
                url: interestsURL + 'insertmovementfinancialdebit/',
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
        },
        updateDate: function (idUnidad,fechaCalculo) {
            return $http({
                url: interestsURL + 'updateDate/',
                method: "POST",
                data: {
                        idUnidad : idUnidad,
                        fechaCalculo : fechaCalculo
                },
                headers: {
                    'Content-Type': 'application/json'
                }

            });
        },
        getFinanciera: function () {
            return $http({
                url: schemeURL + 'financialBank/',
                method: "GET"
            });
        } ,
            getMovimientoMensual: function (idUnidad) {
            return $http({
                url: interestsURL + 'movimientomensual/',
                method: "GET",
                params: {
                    idUnidad: idUnidad
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        InsertarLotePago: function (tipo) {
            return $http({
                url: interestsURL + 'insertarLotePago/',
                method: "POST",
                data: {
                        tipo : tipo
                },
                headers: {
                    'Content-Type': 'application/json'
                }

            });
        },
        InsertarLotePagoDetalle: function (idLotePago,idUnidad,idFinanciera,InteresActual) {
            return $http({
                url: interestsURL + 'insertarLotePagoDetalle/',
                method: "POST",
                data: {
                       idLotePago : idLotePago,
                       idUnidad :  idUnidad,
                        idFinanciera : idFinanciera,
                       InteresActual :  InteresActual
                },
                headers: {
                    'Content-Type': 'application/json'
                }

            });
        },
         Insertartraspasocxp: function (idLotePago,idAccion,leyenda,idFinancieraOrigen,idFinancieraDestino) {
            return $http({
                url: interestsURL + 'insertartraspasocxp/',
                method: "POST",
                data: {
                       idLotePago : idLotePago,
                       idAccion :  idAccion,
                        leyenda : leyenda,
                       idFinancieraOrigen :  idFinancieraOrigen,
                       idFinancieraDestino: idFinancieraDestino
                },
                headers: {
                    'Content-Type': 'application/json'
                }

            });
        }
    };
});