registrationModule.controller('freeDaysController', function ($scope, alertFactory, freeDaysRepository, interestsRepository) {

    //store an array of free days getting by getFreeDays function
    $scope.allDays = {};
    $scope.message = 'Buscando...';
    //Primer metodo inicial
    $scope.init = function () {
        //
        $scope.seleccionarSucursal.show = false;
        $scope.getCompany();
    };
    $scope.seleccionarEmpresa = function (empresa, nombre) {
            $scope.Marca = empresa;
            $scope.nombreCorto = empresa;
            $scope.nombre = nombre;
            $scope.seleccionarSucursal.show = true;
            $scope.getSucursal();
            $scope.getFreeDays();

        }
        // Función para mostrar empresas
    $scope.seleccionarSucursal = function (sucursal, empresa, nombre) {
        $scope.nombreCorto = sucursal;
        $scope.sucursal = empresa;
        $scope.nombreSucursal = nombre;
        $scope.getFreedaysSucursal();
    }
    $scope.getCompany = function () {
            $scope.promise = interestsRepository.getCompany().then(function (result) {
                if (result.data.length > 0) {
                    $scope.empresas = result.data;
                    alertFactory.success("Empresas cargados");
                } else {
                    alertFactory.info("No se encontraron Empresas");
                }
            }, function (error) {
                alertFactory.error("Error al cargar Empresas");
            });
        }
        // Función para mostrar sucursales
    $scope.getSucursal = function (nombreCorto) {
        $scope.promise = interestsRepository.getSucursal($scope.nombreCorto).then(function (result) {
            if (result.data.length > 0) {
                $scope.sucursales = result.data;
                alertFactory.success("Sucursales cargados");
            } else {
                alertFactory.info("No se encontraron Sucursales");
            }
        }, function (error) {
            alertFactory.error("Error al cargar Sucursales");
        });
    }

    // Función para pintar los estatus de los días
    $scope.setClass = function (status) {
        switch (status) {
        case 'OK':
            return 'gridFontGreen';
        case 'CHECK':
            return 'gridFontYellow';
        case 'OUTDATE':
            return 'gridFontRed';
        default:
            return 'gridFontGreen';
        }
    };

    //Función para mostrar las unidades en pla piso
    $scope.getFreeDays = function () {
         $('#freeDaysTable').DataTable().destroy();
        $scope.promise = freeDaysRepository.getFreeDays($scope.Marca).then(function (result) {
            if (result.data.length > 0) {
                $scope.allDays = result.data;
                $scope.totalUnidades = result.data.length;
                $scope.unidadesPorVencer = 0;
                setTimeout(function () {
                    $('#freeDaysTable').DataTable({
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
                            },

                            {
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
                for (var i = 0; i < result.data.length; i++) {
                    if(result.data.diasRestantes >= 10){
                        $scope.unidadesPorVencer += 1;
                    }
                }
                alertFactory.success("Datos cargados");
            } else {
               
                alertFactory.info("No se encontraron datos");
                 $scope.totalUnidades = 0;
                $scope.unidadesPorVencer = 0;
            }
        }, function (error) {
            // $('#btnTest').button('buscando');
            alertFactory.error("Error al cargar datos");
        });
    };

    $scope.getFreedaysSucursal = function () {
        $('#freeDaysTable').DataTable().destroy();
        $scope.allDays ={};
        
        $scope.promise = freeDaysRepository.getFreedaysSucursal($scope.sucursal, $scope.nombreCorto).then(function (result) {
            if (result.data.length > 0) {
                $scope.allDays = result.data;
                $scope.totalUnidades = result.data.length;
                $scope.unidadesPorVencer = 0;
                setTimeout(function () {
                    $('#freeDaysTable').DataTable({
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
                            },

                            {
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
for (var i = 0; i < result.data.length; i++) {
                    if(result.data.diasRestantes >= 10){
                        $scope.unidadesPorVencer += 1;
                    }
                }
                alertFactory.success("Datos cargados");
            } else {
                alertFactory.info("No se encontraron datos");
                 $scope.totalUnidades = 0;
                $scope.unidadesPorVencer = 0;
            }
        }, function (error) {
            // $('#btnTest').button('buscando');
            alertFactory.error("Error al cargar datos");
        });
    };

});