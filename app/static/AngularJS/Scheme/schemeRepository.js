var schemeURL = global_settings.urlCORS + 'api/calculo/';


registrationModule.factory('schemeRepository', function ($http) {

    return {
        getEsquemaFinanciera: function (idFinanciera) {
            return $http({
                url: schemeURL + 'esquemafinanciera/',
                method: "GET",
                params: {
                    idFinanciera: idFinanciera
                },
                headers: {
                    'Content-Type': 'application/json'
                }

            });
        },
        getDetailsScheme: function (idEsquema) {
            return $http.get(schemeURL + 'details/' + idEsquema);
        },
        getFinanciera: function () {
            return $http({
                url: schemeURL + 'financiera/',
                method: "GET"
            });
        },
        getDetalleEsquema: function (idEsquema, esfijo) {
            return $http({
                url: schemeURL + 'detalleEsquema/',
                method: "GET",
                params: {
                    idEsquema: idEsquema,
                    esfijo: esfijo
                },
                headers: {
                    'Content-Type': 'application/json'
                }

            });
        },

        insertEsquema: function (arrEsquema) {
            return $http({
                url: schemeURL + 'insertesquema/',
                method: "POST",
                data: {
                    diasGracia: arrEsquema.diasGracia,
                    plazo: arrEsquema.plazo,
                    idFinanciera: arrEsquema.idFinanciera,
                    nombre: arrEsquema.nombre,
                    descripcion: arrEsquema.descripcion,
                    esFijo: arrEsquema.esFijo,
                    abonoCapital: arrEsquema.porcentajePagoCapital,
                    interesMoratorio : arrEsquema.interesMoratorio
                },
                headers: {
                    'Content-Type': 'application/json'
                }

            });
        },

        newFinancial: function (nombre) {
            return $http({
                url: schemeURL + 'newfinancial/',
                method: "POST",
                data: {
                    nombre: nombre
                },
                headers: {
                    'Content-Type': 'application/json'
                }

            });
        },

        insertEsquemaRango: function (idSquema, arrEsquema) {
            return $http({
                url: schemeURL + 'insertesquemarango/',
                method: "POST",
                data: {
                    idEsquema: idSquema,
                    tasaInteres: arrEsquema.tasaInteres,
                    rango: arrEsquema.rango,
                    precedencia: arrEsquema.precedencia,
                    porcentajePenetracion: arrEsquema.porcentajePenetracion,
                    idTiieTipo: arrEsquema.idTiieTipo,
                    tiie: arrEsquema.tiie
                },
                headers: {
                    'Content-Type': 'application/json'
                }

            });
        },

        insertEsquemaFecha: function (idSquema, arrEsquema) {


            return $http({
                url: schemeURL + 'insertesquemafecha/',
                method: "POST",
                data: {
                    idEsquema: idSquema,
                    tasaInteres: arrEsquema.tasaInteres,
                    fechaInicio: arrEsquema.fechaInicio,
                    fechaFin: arrEsquema.fechaFin,
                    porcentajePenetracion: arrEsquema.porcentajePenetracion,
                    idTiieTipo: arrEsquema.idTiieTipo,
                    tiie: arrEsquema.tiie
                },

                headers: {
                    'Content-Type': 'application/json'
                }

            });
        }
    };
});