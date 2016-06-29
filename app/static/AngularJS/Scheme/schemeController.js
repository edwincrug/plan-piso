registrationModule.controller('schemeController', function ($scope, alertFactory, schemeRepository) {

    $scope.message = 'Buscando...';
    $scope.tasaFecha = '';
    $scope.tasaRango = '';
     $scope.esquema = [];
    // Primer metodo llamado al cargar la pagína
    $scope.init = function () {
            $scope.getFinanciera();
            $scope.getEsquemaFinanciera.show = false;
        }
        // Función para seleccionar las financieras y mostrar la tabla con los esquemas 
    $scope.seleccionarFinanciera = function (idFinanciera, nombreFinanciera) {
            $scope.idFinanciera = idFinanciera;
            $scope.nombreFinanciera = nombreFinanciera;
            $scope.getEsquemaFinanciera();
            $scope.getEsquemaFinanciera.show = true;
        }
        // Función para mostrar las financieras disponibles
    $scope.getFinanciera = function () {
        $scope.promise = schemeRepository.getFinanciera().then(function (result) {
            if (result.data.length > 0) {
                $scope.financieras = result.data;
                //$scope.diasGracia = result.data.diasGracia;
                alertFactory.success("financieras cargados");
            } else {
                alertFactory.info("No se encontraron financieras");
            }
        }, function (error) {
            alertFactory.error("Error al cargar financieras");
        });
    }

    // Funcion para llamar modal con detalles de esquemas
    $scope.seleccionarEsquema = function (idEsquema, esFijo) {
        $('#detallesEsquemas').appendTo("body").modal('show');
        $scope.idEsquema = idEsquema;
        $scope.esFijo = esFijo;
        $scope.getDetalleEsquema();
        $scope.nombreEsquema = '';
        if ($scope.esFijo == 1) {
            console.log($scope.esFijo);
            $scope.nombreEsquema = 'Tasa por Fechas';
            $scope.tasaRango.show = false;
            $scope.tasaFecha.show = true;
        } else {
            $scope.nombreEsquema = 'Tasa por Rango';
            $scope.tasaFecha.show = false;
            $scope.tasaRango.show = true;
            console.log($scope.esFijo);
        }
    }

    $scope.tasaFecha = function () {

    }
    $scope.tasaRango = function () {

    }

    // Metodo para mostrar los esquemas por financiera
    $scope.getEsquemaFinanciera = function () {
        $('#esquemasFinanciera').DataTable().destroy();
        $scope.promise = schemeRepository.getEsquemaFinanciera($scope.idFinanciera).then(function (result) {
            if (result.data.length > 0) {
                $scope.esquemas = result.data;
                setTimeout(function () {
                    $('#esquemasFinanciera').DataTable({
                        dom: '<"html5buttons"B>lTfgitp'
                        , buttons: [{
                                extend: 'copy'
                            }, {
                                extend: 'csv'
                            }, {
                                extend: 'excel'
                                , title: 'ExampleFile'
                            }, {
                                extend: 'pdf'
                                , title: 'ExampleFile'
                            }

                            
                            , {
                                extend: 'print'
                                , customize: function (win) {
                                    $(win.document.body).addClass('white-bg');
                                    $(win.document.body).css('font-size', '10px');
                                    $(win.document.body).find('table')
                                        .addClass('compact')
                                        .css('font-size', 'inherit');
                                }
                            }
                        ]
                    });
                }, 1000);
                alertFactory.success("Esquemas cargados");
            } else {
                alertFactory.info("No se encontraron Esquemas");
            }
        }, function (error) {
            alertFactory.error("Error al cargar Esquemas");
        });
    }

    // Función para mostrar detalles del esquema
    $scope.getDetalleEsquema = function () {
        $scope.promise = schemeRepository.getDetalleEsquema($scope.idEsquema, $scope.esFijo).then(function (result) {
            if (result.data.length > 0) {
                $scope.detalleEsquema = result.data;
                alertFactory.success("destalles cargados");
            } else {
                alertFactory.info("No se encontraron destalles");
            }
        }, function (error) {
            alertFactory.error("Error al cargar destalles");
        });
    }

    // Función para llamar la modal
    $scope.nuevoEsquema = function () {
        $('#agregarNuevoEsquema').appendTo("body").modal('show');
        $scope.calendario();
    };
    // Función para cerrar la modal
    $scope.cerrar = function () {
        $('#inicioModal').modal('toggle');
    };
    // Función para cargar calendario
    $scope.calendario = function () {
            $('#calendar .input-group.date').datepicker({
                todayBtn: "linked"
                , keyboardNavigation: true
                , forceParse: false
                , calendarWeeks: true
                , autoclose: true
                , todayHighlight: true
            });
        }
        // Función para habilitar campos
        /*$scope.tasaFecha = function(){
            $scope.tasaRango.show = false;
            $scope.tasaFecha.show = true;
        }*/

    $scope.insertEsquemas = function () {
        $scope.esquema.push({
            diasGracia: $scope.esquema.diasGracia
            , plazo: $scope.esquema.plazo
            , idFinanciera: $scope.idFinanciera
            , nombre: $scope.esquema.nombre
            , descripcion: $scope.esquema.descripcion
            , esFijo: $scope.esquema.interesFecha
            , tasaInteres: $scope.esquema.tasaInteres
            , rango: $scope.esquema.rango
            , precedencia:$scope.esquema.precedencia
            , porcentajePenetracion: $scope.esquema.porcentajePenetracion
            , idTiieTipo: $scope.esquema.idTiieTipo
            , fechaInicio: $scope.esquema.fechaInicio
            , fechaFin: $scope.esquema.fechaFin
            , tiie: $scope.esquema.tiie
        });
        $scope.esquema.forEach(function (esquema, i) {
            schemeRepository.insertEsquema(esquema.diasGracia, esquema.plazo, esquema.idFinanciera
                , esquema.nombre, esquema.descripcion, esquema.esFijo
                , esquema.tasaInteres, esquema.rango,esquema.precedencia, esquema.porcentajePenetracion
                , esquema.idTiieTipo, esquema.fechaInicio, esquema.fechaFin
                , esquema.tiie).then(function (result) {
                //esquema.idEsquema = result.data[0].idEsquema;
                if (result.data.length > 0) {
                    consola.log('Hola');
                    alertFactory.success("Esquema Agregado");
                } else {
                    alertFactory.info("Esquema No Agregado");
                }
            }, function (error) {
                alertFactory.error("Error al guardar Esquema");
            });
        });
    }
});