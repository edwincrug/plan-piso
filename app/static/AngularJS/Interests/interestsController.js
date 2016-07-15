registrationModule.controller('interestsController', function ($scope, alertFactory, interestsRepository, schemeRepository) {
    //store an array of free days getting by getFreeDays function  
    $scope.message = 'Buscando...';
    //$scope.Marca = {};
    //$scope.vehNumserie = {};
    $scope.detailsUnit = {};
    $scope.fechaHoy = new Date();
    $scope.idEmpresa = {};
    $scope.updateEsquemaUnidad = [];
    $scope.idESquemaNueva = 0;
    $scope.listaUnidadesConValidacion = [];
    $scope.unidadesAcambiarEsquema = [];

    // Primer metodo llamado al cargar la pagína
    $scope.init = function () {
        $scope.updateEsquemaUnidad = [];
        $scope.listaUnidadesConValidacion = [];
        $scope.idESquemaNueva = 0;
        $scope.getCompany();
        $scope.seleccionarSucursal.show = false;
        $scope.seleccionarFinanciera.show = false;
        $scope.getInterest.show = false;
        $scope.checkbox();
        $scope.transpasoFinanciera.show = false;
        $scope.modalTraspasoFinanciera.show = false;
        $scope.getFinanciera();
        $scope.getInterestCompanySucursal.show = false;
        //$scope.getEsquemaFinanciera();
    }

    // Función para filtrar por empresa
    $scope.seleccionarEmpresa = function (idEmpresa, nombreEmpresa) {
        $scope.seleccionarSucursal.show = false;
        $scope.idEmpresa = idEmpresa;
        $scope.getInterest.show = false;
        $scope.nombreEmpresa = nombreEmpresa;
        $scope.getFinancial();
        $scope.getSucursal();
        $scope.getFinancial.show = true;
        $scope.seleccionarFinanciera.show = false;
        $scope.transpasoFinanciera.show = false;
        $scope.modalTraspasoFinanciera.show = false;
        $scope.ocultarSucursal.show = false;
        $scope.getInterestCompanySucursal.show = false;
    }

    // Función para filtrar por sucursal
    $scope.seleccionarSucursal = function (idSucursal, nombreSucursal) {
        $scope.idSucursal = idSucursal;
        $scope.nombreSucursal = nombreSucursal;
        $scope.getInterestSucursal();
    }

    // Muestra los detalles de la financiera
    $scope.seleccionarFinanciera = function (idFinanciera, nombreFinanciera) {
        $scope.idFinanciera = idFinanciera;
        $scope.nombreFinanciera = nombreFinanciera;
        $scope.seleccionarSucursal.show = true;
        $scope.getInterestFinanciera();
        $scope.seleccionarFinanciera.show = true;
        $scope.getFinancial.show = false;
        $scope.transpasoFinanciera.show = true;
        $scope.ocultarSucursal.show = true;
    }

    $scope.seleccionarSucursalDetalle = function (idSucursal, nombreSucursal) {
            $scope.idSucursal = idSucursal;
            $scope.nombreSucursal = nombreSucursal;
            $scope.getInterestCompanySucursal();
        }
        // Función para filtrar compañias
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
        // Función para trar las financieras por empresa
    $scope.getFinancial = function () {
        $scope.totalUnidades = 0;
        $scope.totalInteres = 0;
        $scope.totalAdeudo = 0;
        $scope.financieras = {};
        $scope.promise = interestsRepository.getFinancieraSelect($scope.idEmpresa).then(function (result) {
            if (result.data.length > 0) {
                $scope.financieras = result.data;
                console.log($scope.financieras)
                for (var i = 0; i < result.data.length; i++) {
                    $scope.totalUnidades += (result.data[i].unidades);
                    $scope.totalInteres += (result.data[i].interes);
                    $scope.totalAdeudo += (result.data[i].adeudo);
                    alertFactory.success("Financieras cargadas");
                }
            } else {
                alertFactory.info("No se encontraron Financieras");
            }
        }, function (error) {
            alertFactory.error("Error al cargar Financieras");
        });
    }

    // Función para obtener las sucursales por empresa
    $scope.getSucursal = function (idEmpresa) {
        $scope.promise = interestsRepository.getSucursal($scope.idEmpresa).then(function (result) {
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

    // Función para mostrar intereses por empresa
    $scope.getInterest = function () {
        $('#interestTable').DataTable().destroy();
        $scope.interes = {};
        $scope.promise =
            interestsRepository.getInterest($scope.idEmpresa).then(function (result) {
                if (result.data.length > 0) {
                    $scope.interes = result.data;
                    $scope.unidades = result.data.length;
                    $scope.unidadesVencidas = 0;
                    $scope.interesTotal = 0;
                    $scope.interesActual = 0;
                    $scope.unidadesPorVencer = 0;
                    $scope.interesnopagados = 0;
                    $scope.interespagado = 0;
                    $scope.interesmespasado = 0;
                    $scope.total = 0;
                    setTimeout(function () {
                        $('#interestTable').DataTable({
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
                    for (var i = 0; i < result.data.length; i++) {
                        $scope.unidadesPorVencer += 1;
                        $scope.total += (result.data[i].interesAcumulado);
                        $scope.porcentajeTotalUnidades = 100;
                        $scope.interesmespasado += (result.data[i].interesAcumulado);
                        $scope.interespagado += (result.data[i].interesPagado);
                        $scope.interesActual += (result.data[i].interesAcumuladoActual);
                    }
                    $scope.interesTotal = $scope.interesActual + $scope.interesmespasado;
                    $scope.interesnopagados = $scope.interesTotal;
                    alertFactory.success("Intereses cargados");
                    $scope.seleccionarSucursal.show = true;
                    $scope.seleccionarFinanciera.show = true;
                    $scope.getFinancial.show = false;
                    $scope.transpasoFinanciera.show = true;
                    $scope.getInterest.show = true;
                    $scope.ocultarSucursal.show = false;
                    $scope.getInterestCompanySucursal.show = true;
                } else {
                    alertFactory.info("Intereses no encontrados");
                    $scope.interesmespasado = 0;
                    $scope.unidades = 0;
                    $scope.unidadesVencidas = 0;
                    $scope.interesTotal = 0;
                    $scope.interesActual = 0;
                    $scope.unidadesPorVencer = 0;
                    $scope.interesRestante = 0;
                    $scope.porcentajeRestante = 0;
                    $scope.total = 0;
                }
            }, function (error) {
                alertFactory.error("Error al cargar intereses");
            });
    }

    $scope.ocultarSucursal = function () {}

    // Función para mostrar intereses por financiera
    $scope.getInterestFinanciera = function () {
        $('#interestTable').DataTable().destroy();
        $scope.interes = {};
        $scope.promise =
            interestsRepository.getInterestFinanciera($scope.idEmpresa, $scope.idFinanciera).then(function (result) {
                if (result.data.length > 0) {
                    $scope.interes = result.data;
                    $scope.unidades = result.data.length;
                    $scope.unidadesVencidas = 0;
                    $scope.interesTotal = 0;
                    $scope.interesActual = 0;
                    $scope.unidadesPorVencer = 0;
                    $scope.interesnopagados = 0;
                    $scope.interespagado = 0;
                    $scope.interesmespasado = 0;
                    $scope.total = 0;
                    setTimeout(function () {
                        $('#interestTable').DataTable({
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
                    for (var i = 0; i < result.data.length; i++) {
                        $scope.unidadesPorVencer += 1;
                        $scope.total += (result.data[i].interesAcumulado);
                        $scope.porcentajeTotalUnidades = 100;
                        $scope.interesmespasado += (result.data[i].interesAcumulado);
                        $scope.interespagado += (result.data[i].interesPagado);
                        $scope.interesActual += (result.data[i].interesAcumuladoActual);
                    }
                    $scope.interesTotal = $scope.interesActual + $scope.interesmespasado;
                    $scope.interesnopagados = $scope.interesTotal;
                    alertFactory.success("Intereses cargados");
                } else {
                    alertFactory.info("Intereses no encontrados");
                    $scope.interesmespasado = 0;
                    $scope.unidades = 0;
                    $scope.unidadesVencidas = 0;
                    $scope.interesTotal = 0;
                    $scope.interesActual = 0;
                    $scope.unidadesPorVencer = 0;
                    $scope.interesRestante = 0;
                    $scope.porcentajeRestante = 0;
                    $scope.total = 0;
                }
            }, function (error) {
                alertFactory.error("Error al cargar intereses");
            });
    }

    // Función para mostrar intereses por Sucursal y empresa
    $scope.getInterestCompanySucursal = function () {
        $('#interestTable').DataTable().destroy();
        $scope.interes = {};
        $scope.promise =
            interestsRepository.getInterestCompanySucursal($scope.idEmpresa, $scope.idSucursal).then(function (result) {
                if (result.data.length > 0) {
                    $scope.interes = result.data;
                    $scope.unidades = result.data.length;
                    $scope.unidadesVencidas = 0;
                    $scope.interesTotal = 0;
                    $scope.interesActual = 0;
                    $scope.unidadesPorVencer = 0;
                    $scope.interesnopagados = 0;
                    $scope.interespagado = 0;
                    $scope.interesmespasado = 0;
                    $scope.total = 0;
                    setTimeout(function () {
                        $('#interestTable').DataTable({
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
                    for (var i = 0; i < result.data.length; i++) {
                        $scope.unidadesPorVencer += 1;
                        $scope.total += (result.data[i].interesAcumulado);
                        $scope.porcentajeTotalUnidades = 100;
                        $scope.interesmespasado += (result.data[i].interesAcumulado);
                        $scope.interespagado += (result.data[i].interesPagado);
                        $scope.interesActual += (result.data[i].interesAcumuladoActual);
                    }
                    $scope.interesTotal = $scope.interesActual + $scope.interesmespasado;
                    $scope.interesnopagados = $scope.interesTotal;
                    alertFactory.success("Intereses cargados");
                } else {
                    alertFactory.info("Intereses no encontrados");
                    $scope.interesmespasado = 0;
                    $scope.unidades = 0;
                    $scope.unidadesVencidas = 0;
                    $scope.interesTotal = 0;
                    $scope.interesActual = 0;
                    $scope.unidadesPorVencer = 0;
                    $scope.interesRestante = 0;
                    $scope.porcentajeRestante = 0;
                    $scope.total = 0;
                }
            }, function (error) {
                alertFactory.error("Error al cargar intereses");
            });
    }

    // Funcion para obtener los intereses por sucursal
    $scope.getInterestSucursal = function () {
        $('#interestTable').DataTable().destroy();
        $scope.interes = {};
        $scope.promise =
            interestsRepository.getInterestSucursal($scope.idEmpresa, $scope.idSucursal, $scope.idFinanciera).then(function (result) {
                if (result.data.length > 0) {
                    $scope.interes = result.data;
                    $scope.unidades = result.data.length;
                    $scope.unidadesVencidas = 0;
                    $scope.interesTotal = 0;
                    $scope.interesActual = 0;
                    $scope.unidadesPorVencer = 0;
                    $scope.interesnopagados = 0;
                    $scope.interespagado = 0;
                    $scope.interesmespasado = 0;
                    $scope.total = 0;
                    setTimeout(function () {
                        $('#interestTable').DataTable({
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
                    for (var i = 0; i < result.data.length; i++) {
                        $scope.unidadesPorVencer += 1;
                        $scope.total += (result.data[i].interesAcumulado);
                        $scope.porcentajeTotalUnidades = 100;
                        $scope.interesmespasado += (result.data[i].interesAcumulado);
                        $scope.interespagado += (result.data[i].interesPagado);
                        $scope.interesActual += (result.data[i].interesAcumuladoActual);
                    }
                    $scope.interesTotal = $scope.interesActual + $scope.interesmespasado;
                    $scope.interesnopagados = $scope.interesTotal;
                    alertFactory.success("Intereses cargados");
                } else {
                    alertFactory.info("Intereses no encontrados");
                    $scope.interesmespasado = 0;
                    $scope.unidades = 0;
                    $scope.unidadesVencidas = 0;
                    $scope.interesTotal = 0;
                    $scope.interesActual = 0;
                    $scope.unidadesPorVencer = 0;
                    $scope.interesRestante = 0;
                    $scope.porcentajeRestante = 0;
                    $scope.total = 0;
                }
            }, function (error) {
                alertFactory.error("Error al cargar intereses");
            });
    }

    // Función para pintar 
    $scope.setClass = function (status) {
        switch (status) {
        case 'OK':
            return 'gridFontGreen';
        case 'CHECK':
            return 'gridFontYellow';
        case 'EXCEEDED':
            return 'gridFontRed';
        default:
            return 'gridFontGreen';
        }
    }

    // Función para el ng-class en el campo días
    $scope.setClassDias = function (dias) {
        if (dias >= 180) {
            return 'gridFontRed';
        } else {
            return 'gridFontGreen';
        }
    }

    // Función Principal para los filtros
    $scope.rangeFilter = function () {
        $.fn.dataTable.ext.search.push(
            function (settings, data, dataIndex) {
                var min = parseInt($('#min').val(), 10);
                var max = parseInt($('#max').val(), 10);
                var age = parseFloat(data[3]) || 0;

                if ((isNaN(min) && isNaN(max)) ||
                    (isNaN(min) && age <= max) ||
                    (min <= age && isNaN(max)) ||
                    (min <= age && age <= max)) {
                    return true;
                }
                return false;
            }
        );

    }

    // Filtro para mostras unidades a 30 días de financiamiento
    $scope.set30days = function () {
        $('#min').val(0);
        $('#max').val(30);
        $scope.rangeFilter();
        $('#interestTable').DataTable().draw();
        var contenedor = document.getElementById("set30days");
        contenedor.style.backgroundColor = "#269ABC";
        var contenedor = document.getElementById("set60days");
        contenedor.style.backgroundColor = "#23C6C8";
        var contenedor = document.getElementById("set90days");
        contenedor.style.backgroundColor = "#23C6C8";
        var contenedor = document.getElementById("set90Masdays");
        contenedor.style.backgroundColor = "#23C6C8";


    }

    // Filtro para mostras unidades a 60 días de financiamiento
    $scope.set60days = function () {
        $('#min').val(31);
        $('#max').val(60);
        $scope.rangeFilter();
        $('#interestTable').DataTable().draw();
        var contenedor = document.getElementById("set60days");
        contenedor.style.backgroundColor = "#269ABC";
        var contenedor = document.getElementById("set30days");
        contenedor.style.backgroundColor = "#23C6C8";
        var contenedor = document.getElementById("set90days");
        contenedor.style.backgroundColor = "#23C6C8";
        var contenedor = document.getElementById("set90Masdays");
        contenedor.style.backgroundColor = "#23C6C8";
    }

    // Filtro para mostras unidades a 90 días de financiamiento
    $scope.set90days = function () {
        $('#min').val(61);
        $('#max').val(90);
        $scope.rangeFilter();
        $('#interestTable').DataTable().draw();
        var contenedor = document.getElementById("set90days");
        contenedor.style.backgroundColor = "#269ABC";
        var contenedor = document.getElementById("set60days");
        contenedor.style.backgroundColor = "#23C6C8";
        var contenedor = document.getElementById("set30days");
        contenedor.style.backgroundColor = "#23C6C8";
        var contenedor = document.getElementById("set90Masdays");
        contenedor.style.backgroundColor = "#23C6C8";
    }

    // Filtro para mostras unidades a mas de 90 días de financiamiento
    $scope.set90Masdays = function () {
        $('#min').val(91);
        $('#max').val(999);
        $scope.rangeFilter();
        $('#interestTable').DataTable().draw();
        var contenedor = document.getElementById("set90Masdays");
        contenedor.style.backgroundColor = "#269ABC";
        var contenedor = document.getElementById("set60days");
        contenedor.style.backgroundColor = "#23C6C8";
        var contenedor = document.getElementById("set90days");
        contenedor.style.backgroundColor = "#23C6C8";
        var contenedor = document.getElementById("set30days");
        contenedor.style.backgroundColor = "#23C6C8";
    }

    // Función para llamar modal
    $scope.inicia = function (vehNumserie) {
        $('#DetallesUnidadModal').appendTo("body").modal('show');
        $scope.vehNumserie = vehNumserie;
        $scope.getDetailsUnit();
        //$scope.detailsUnit = $scope.detailsUnit;
    }

    // Función para cerrar la modal
    $scope.cerrar = function () {
        $('#inicioModal').modal('toggle');
    }

    // Función para traer detalles de las unidades    
    $scope.getDetailsUnit = function () {
        $scope.ocultarEquemaFechas.show = false;
        $scope.ocultarEsquemaRango.show = false;
        $('#esquemaDetalleUnidad').DataTable().destroy();
        $scope.detailsUnitScheme = {};
        $scope.promise = interestsRepository.getDetailsUnit($scope.vehNumserie).then(function (result) {
            if (result.data.length > 0) {
                $scope.detailsUnit = result.data;
                $scope.esquemafijo = result.data[0].esFijo;
                interestsRepository.getDetailsUnitScheme($scope.vehNumserie).then(function (detalles) {
                    if (detalles.data.length > 0) {
                        $scope.detailsUnitScheme = detalles.data;
                        setTimeout(function () {
                            $('#esquemaDetalleUnidad').DataTable({
                                dom: '<"html5buttons"B>lTfgitp'
                                , iDisplayLength: 5
                                , buttons: [{
                                        customize: function (win) {
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
                        if ($scope.esquemafijo == false) {
                            $scope.ocultarEquemaFechas.show = false;
                            $scope.ocultarEsquemaRango.show = true
                        } else {
                            $scope.ocultarEquemaFechas.show = true;
                            $scope.ocultarEsquemaRango.show = false;
                        }
                    }
                });
            }
        });
    }

    $scope.ocultarEsquemaRango = function () {}
    $scope.ocultarEquemaFechas = function () {}

    //Estilo de checkbox
    $scope.checkbox = (function () {
        $('.i-checks').iCheck({
            checkboxClass: 'icheckbox_square-green'
            , radioClass: 'iradio_square-green'
        , });
    })

    // Metodo para mostrar los esquemas por financiera
    $scope.getEsquemaFinanciera = function () {
        $scope.esquemas = {};
        //$('#esquemasFinancieraNuevo').DataTable().destroy();
        $scope.promise = schemeRepository.getEsquemaFinanciera($scope.idFinancieraCambio).then(function (result) {
            if (result.data.length > 0) {
                $scope.esquemas = result.data;
                /*setTimeout(function () {
                    $('#esquemasFinancieraNuevo').DataTable({
                        dom: '<"html5buttons"B>lTfgitp'
                        , iDisplayLength: 5
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
                }, 1000);*/
                alertFactory.success("Esquemas cargados");
            } else {
                alertFactory.info("No se encontraron Esquemas");
            }
        }, function (error) {
            alertFactory.error("Error al cargar Esquemas");
        });
    }

    $scope.modalAgregarNuevoEsquemas = function () {
        $('#modalAgregarNuevoEsquema').appendTo("body").modal('show');
    }

    // Función para llamar el datepicker
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

    // Función para mostrar todas las financieras
    $scope.getFinanciera = function () {
        $scope.promise = schemeRepository.getFinanciera().then(function (result) {
            if (result.data.length > 0) {
                $scope.financieraNueva = result.data;
                alertFactory.success("financieras cargados");
            } else {
                alertFactory.info("No se encontraron financieras");
            }
        }, function (error) {
            alertFactory.error("Error al cargar financieras");
        });
    }

    // Función para guardar el valor de un checkbox en un array
    $scope.valorCheckBoxTabla = function (idUnidad) {
        if (idUnidad == false || idUnidad == undefined) {
            console.log('no hay nada');
        } else {
            $scope.updateEsquemaUnidad.push({
                vehNumserie: idUnidad
            });
            console.log($scope.updateEsquemaUnidad);
        }
    }

    // Función para actualizar un esquema en las unidades
    $scope.updateScheme = function () {
        $scope.unidadesAcambiarEsquema.forEach(function (updateEsquemaUnidad) {
            console.log($scope.unidadesAcambiarEsquema);
            interestsRepository.updateScheme($scope.idESquemaNueva, updateEsquemaUnidad.vehNumserie).then(function (result) {
                if (result.data.length > 0) {
                    console.log('pasa por aqui');
                    alertFactory.success("Esquema Cambiado");
                } else {
                    alertFactory.info("Esquema no cambiado");
                }
            }, function (error) {
                alertFactory.error("Error al cambiar Esquema");
            });
        });
    }

    // Función para guardar el idEsquema nuevo 
    $scope.idEsquemaNuevo = function (idEsquema, nombre) {
        $scope.idESquemaNueva = idEsquema;
        $scope.nombreEsquemaNueva = nombre;
        console.log(idEsquema, 'hola', $scope.nombreEsquemaNueva);
    }
    $scope.idNuevaEsquema = function(idEsquemaFinanciera, nombreFinanciera) {
        $scope.idESquemaNueva = idEsquemaFinanciera;
        $scope.nombreEsquemaNueva = nombreFinanciera;
        console.log(idEsquemaFinanciera, 'hola', $scope.nombreEsquemaNueva);
    }

    // Función para mostrar los detalles del cambio de esquema
    $scope.hacerCambioEsquema = function () {
        $scope.validationSchemaChange();
        $scope.idEsquemaNuevo.show = false;
        $scope.hacerCambioEsquema.show = true;
        $('input[type=checkbox]').attr('checked', false);
        $scope.modalTraspasoFinanciera.show = false;
        $scope.valorCheckBoxTabla.show = false;
        $scope.transpasoFinanciera.show = true;
    }

    //Cancelar el cambio de financiera y cerrar la modal
    $scope.cancelarCambioFinanciera = function () {
        //$scope.transpasoFinanciera.show = true;
        $scope.modalCambioFinanciera.show = false;
        $scope.valorCheckBoxTabla.show= false;
        $scope.idEsquemaNuevo.show = false;
        $scope.hacerCambioEsquema.show = true;
        $('input[type=checkbox]').attr('checked', false);
        $scope.modalTraspasoFinanciera.show = false;
        $scope.valorCheckBoxTabla.show = false;
        $scope.transpasoFinanciera.show = true;
        $('#cambioEsquema').DataTable().destroy();
        $('#esquemasFinancieraNuevo').DataTable().destroy();
        $scope.updateEsquemaUnidad = [];
        $scope.listaUnidadesConValidacion = [];
        $scope.idESquemaNueva = 0;
    }

    // Función para mostrar la modal del wizard de transpaso de financiera
    $scope.transpasoFinanciera = function () {
        $scope.modalTraspasoFinanciera.show = true;
        $scope.valorCheckBoxTabla.show = true;
        $scope.transpasoFinanciera.show = false;
        $scope.updateEsquemaUnidad = [];
        $scope.listaUnidadesConValidacion = [];
        $scope.idESquemaNueva = 0;
    }

    // Función para mostrar botones de modal de transpasos
    $scope.modalTraspasoFinanciera = function (modal) {
        $scope.hacerCambioEsquema.show = false;
        $scope.idEsquemaNuevo.show = true;
        $scope.idESquemaNueva = 0;
        $scope.modal = modal;
        $('#transpasoCambioEsquema').appendTo("body").modal('show');
        $scope.esquemas = {};
        $('#esquemasFinancieraNuevo').DataTable().destroy();
    }

    // Función para marcar todos los checkbox
    $scope.marcarTodosCheckbox = function (id) {
        $('input[type=checkbox]').attr('checked', true);
        console.log('estan todos los checkbox marcados', id)
            //$scope.valorCheckBoxTabla();
            //console.log('hola')
    }

    // oculta los botones para transpaso de financiera
    $scope.cancelarTranspasoModal = function () {
        $scope.modalTraspasoFinanciera.show = false;
        $scope.modalCambioFinanciera.show = true;
        $scope.valorCheckBoxTabla.show = false;
        $scope.transpasoFinanciera.show = true;
        $('input[type=checkbox]').attr('checked', false);
    }

   // funcion de prueba para mostrar nombre de las financieras
    $scope.seleccionarFinancieraTranspaso = function (idFinanciera, nombreFinanciera) {
        $scope.idFinancieraCambio = idFinanciera;
        $scope.nombreFinancieraNueva = nombreFinanciera;
        $('#esquemasFinancieroCambio').DataTable().destroy();
        setTimeout(function () {
                    $('#esquemasFinancieroCambio').DataTable({
                        dom: '<"html5buttons"B>lTfgitp'
                        , iDisplayLength: 5
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
        $scope.getEsquemaFinanciera();

        
    }
    // Función para seleccionar nueva financiera
    $scope.seleccionarFinancieraNueva = function (idFinanciera, nombre) {
        $('#esquemasFinancieraNuevo').DataTable().destroy();
        setTimeout(function () {
                    $('#esquemasFinancieraNuevo').DataTable({
                        dom: '<"html5buttons"B>lTfgitp'
                        , iDisplayLength: 5
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
        $scope.idFinancieraCambio = idFinanciera;
        $scope.nombreFinancieraCambio = nombre;
        $scope.getEsquemaFinanciera();
    }

    // Funanción para hacer la actualización del esquema
    $scope.regresarIntereses = function () {
        $scope.getInterest.show = false;
        $scope.modalCambioFinanciera.show = true;
        $scope.updateScheme();
        $scope.getCompany();
        $scope.seleccionarSucursal.show = false;
        $scope.seleccionarFinanciera.show = false;
        $scope.checkbox();
        $scope.transpasoFinanciera.show = false;
        $scope.modalTraspasoFinanciera.show = false;
        $scope.ocultarSucursal.show = false;
        $scope.getFinanciera();
        $scope.getInterestCompanySucursal.show = false;
        $('#cambioEsquema').DataTable().destroy();
        $('#esquemasFinancieraNuevo').DataTable().destroy();
        $scope.updateEsquemaUnidad = [];
        $scope.idESquemaNueva = 0;
    }

    // Función para mostrar modal de cambiar financiera
    $scope.traspasoFinanciero = function () {
        $('#transpasoFinancieroModal').appendTo("body").modal('show');
        $scope.hacerCambioEsquema.show = false;
        $scope.idEsquemaNuevo.show = true;
        $scope.idESquemaNueva = 0;
    }

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

    $scope.getDetalleEsquema = function () {
        $('#detallesEsquema').DataTable().destroy();
        $scope.detalleEsquema = {};
        $scope.promise = schemeRepository.getDetalleEsquema($scope.idEsquema, $scope.esFijo).then(function (result) {
                if (result.data.length > 0) {
                    $scope.detalleEsquema = result.data;
                    setTimeout(function () {
                        $('#detallesEsquema').DataTable({
                            dom: '<"html5buttons"B>lTfgitp'
                            , iDisplayLength: 5
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
                            } //iDisplayLength:10



                                
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

                    alertFactory.success("destalles cargados");
                } else {
                    alertFactory.info("No se encontraron destalles");
                }
            }
            , function (error) {
                alertFactory.error("Error al cargar destalles");
            });
    }

    $scope.tasaFecha = function () {}
    $scope.tasaRango = function () {}

    $scope.validationSchemaChange = function () {
        $scope.listaUnidadesConValidacion = [];
        $('#cambioEsquema').DataTable().destroy();
        $scope.updateEsquemaUnidad.forEach(function (updateEsquemaUnidad) {
            $scope.promise = interestsRepository.getDetalleUnidadEsquema(updateEsquemaUnidad.vehNumserie).then(function (result) {
                if (result.data.length > 0) {
                    interestsRepository.getDetalleEsquemaUnidad($scope.idESquemaNueva).then(function (esquemaNuevo) {
                        if (esquemaNuevo.data.length > 0) {
                            if (esquemaNuevo.data[0].esFijo == 1) {
                                $scope.fechaIngresoInvetario = result.data[0].vehFecremisions;
                                $scope.fechaEsquemaNuevo = esquemaNuevo.data[0].fechaInicio;
                                console.log($scope.fechaIngresoInvetario, $scope.fechaEsquemaNuevo);
                                if ($scope.fechaEsquemaNuevo <= $scope.fechaIngresoInvetario) {
                                    $scope.listaUnidadesConValidacion.push({
                                        vehNumserie: updateEsquemaUnidad.vehNumserie
                                        , observaciones: "Esta Unidad se puede tranferir a esquema de fechas"
                                        , status: "OK"
                                    });
                                    $scope.fechaIngresoInvetario = 0;
                                } else {
                                    $scope.listaUnidadesConValidacion.push({
                                        vehNumserie: updateEsquemaUnidad.vehNumserie
                                        , observaciones: "Esta Unidad no se puede transferir"
                                        , status: "EXCEEDED"
                                    });
                                    $scope.fechaIngresoInvetario = 0;
                                }
                            } else {
                                $scope.fechaEsquemaNuevo = esquemaNuevo.data[0].rango;
                                console.log($scope.fechaIngresoInvetario, $scope.fechaEsquemaNuevo, 'Esta unidad tiene esquema por rangos');
                                $scope.observaciones = 'Esta Unidad no se puede transferir a esquema de rangos';
                                $scope.fechaIngresoInvetario = 0;
                            }

                        }
                        $scope.unidadesAutorizadas();
                    });
                    console.log($scope.fechaEsquemaNuevo);
                    setTimeout(function () {
                        $('#cambioEsquema').DataTable({
                            dom: '<"html5buttons"B>lTfgitp'
                            , iDisplayLength: 5
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
                } else {
                    alertFactory.info("Esquema no cambiado");
                }
            }, function (error) {
                alertFactory.error("Error al cambiar Esquema");
            });
        });
    }

    $scope.unidadesAutorizadas = function () {
        $scope.unidadesAcambiarEsquema = [];
        $scope.listaUnidadesConValidacion.forEach(function (listaUnidadesConValidacion) {
            if (listaUnidadesConValidacion.status == "OK") {
                $scope.unidadesAcambiarEsquema.push({
                    vehNumserie: listaUnidadesConValidacion.vehNumserie
                });
                console.log($scope.unidadesAcambiarEsquema)
            } else {
                console.log('Unidad No validad', listaUnidadesConValidacion.vehNumserie)
            }
        });
    }
    $scope.selectFinancial = function(){
        $scope.transpasoFinanciera.show = false;
        $scope.modalCambioFinanciera.show = true;
        $scope.valorCheckBoxTabla.show = true;
    }
    $scope.cancelFinancial = function(){
        $scope.transpasoFinanciera.show = true;
        $scope.modalCambioFinanciera.show = false;
        $scope.valorCheckBoxTabla.show= false;
    }
    $scope.modalCambioFinanciera = function(modal){
        $scope.hacerCambioEsquema.show = false;
        $('#traspasoFinanciero').appendTo("body").modal('show');  
        $scope.idEsquemaNuevo.show = true;
        $scope.idESquemaNueva = 0;
        $scope.modal = modal;
        $scope.esquemas = {};
        $('#esquemasFinancieraNuevo').DataTable().destroy();
    }

});