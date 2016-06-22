registrationModule.controller('interestsController', function ($scope, alertFactory, interestsRepository) {
            //store an array of free days getting by getFreeDays function  
            $scope.message = 'Buscando...';
            $scope.Marca = {};
            $scope.vehNumserie = {};
            $scope.detailsUnit = {};
            $scope.nombreCorto = {};
            $scope.fechaHoy = new Date();

            // Primer metodo llamado al cargar la pagína
            $scope.init = function () {
                    $scope.getCompany();
                    $scope.seleccionarSucursal.show = false;
                    $scope.mostrarDetalles.show = false;
                $scope.checkbox();
                }
                // Función para filtrar por empresa
            $scope.seleccionarEmpresa = function (empresa, nombre) {
                //$scope.reloadPage();
                $scope.seleccionarSucursal.show = false;
                $scope.Marca = empresa;
                $scope.nombreCorto = empresa;
                $scope.nombre = nombre;
                $scope.getInterest();
                $scope.getSucursal();
                $scope.getFinancial();

                $scope.getFinancial.show = true;
                $scope.mostrarDetalles.show = false;
            }
            $scope.reloadPage = function () {
                    window.location.reload();
                }
                // Función para filtrar por sucursal
            $scope.seleccionarSucursal = function (sucursal, empresa, nombre) {
                    $scope.nombreCorto = sucursal;
                    $scope.sucursal = empresa;
                    $scope.nombreSucursal = nombre;
                    $scope.getInterestSucursal();
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
                // Función para obtener las sucursales por empresa
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
                // Metodo para obtiener todos los intereses y los datos para llenar los dashboards
            $scope.getInterest = function () {
                    $('#interestTable').DataTable().destroy();
                    $scope.interes = {};
                    $scope.promise =
                        interestsRepository.getInterest($scope.Marca).then(function (result) {
                            if (result.data.length > 0) {
                                $scope.interes = result.data;
                                $scope.unidades = result.data.length;
                                $scope.unidadesVencidas = 0;
                                $scope.interesTotal = 0;
                                $scope.interesActual = 0;
                                $scope.unidadesPorVencer = 0;
                                $scope.porcentajeTotalUnidades = 0;
                                /*$scope.porcentajePorVencer = 0;
                                $scope.porcentajeVencido = 0;
                                $scope.unidadesRestantes = 0;
                                $scope.interesRestante = 0;
                                $scope.porcentajeRestante = 0;*/
                                $scope.interesmespasado = 0;
                                $scope.interespagado = 0;
                                $scope.total = 0;
                                setTimeout(function () {
                                    $('#interestTable').DataTable({
                                        dom: '<"html5buttons"B>lTfgitp',
                                        buttons: [{
                                                extend: 'copy'
                            }, {
                                                extend: 'csv'
                            }, {
                                                extend: 'excel',
                                                title: 'ExampleFile'
                            }, {
                                                extend: 'pdf',
                                                title: 'ExampleFile'
                            },

                                            {
                                                extend: 'print',
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
                                    $('#interestTable tfoot th').each(function () {
                                        var title = $(this).text();
                                        $(this).html('<input type="text" placeholder="Buscar ' + title + '" />');
                                    });

                                    // DataTable
                                    var table = $('#interestTable').DataTable();

                                    // Apply the search
                                    table.columns().every(function () {
                                        var that = this;

                                        $('input', this.footer()).on('keyup change', function () {
                                            if (that.search() !== this.value) {
                                                that
                                                    .search(this.value)
                                                    .draw();
                                            }
                                        });
                                    });
                                }, 1000);
                                for (var i = 0; i < result.data.length; i++) {

                                    if (result.data[i].diasPlanPiso >= 180) {
                                        //$scope.unidadesVencidas += 1
                                    } else
                                    if (result.data[i].interesAcumulado == result.data[i].interesPagado) {

                                        $scope.unidadesPorVencer += 1
                                    }
                                    $scope.unidadesPorVencer += 1
                                    $scope.total += (result.data[i].interesAcumulado)
                                    $scope.porcentajeTotalUnidades = 100
                                        /*$scope.porcentajeVencido = ($scope.unidadesVencidas * 100) / $scope.unidades
                                        $scope.porcentajePorVencer = ($scope.unidadesPorVencer * 100) / $scope.unidades
                                        $scope.porcentajeRestante = ($scope.porcentajeTotalUnidades - $scope.porcentajeVencido) - $scope.porcentajePorVencer */
                                    $scope.interesmespasado += (result.data[i].interesAcumulado);
                                    $scope.unidadesRestantes = $scope.unidades - $scope.unidadesPorVencer - $scope.unidadesVencidas
                                    $scope.interespagado += (result.data[i].interesPagado);
                                    $scope.interesActual += (result.data[i].interesAcumuladoActual)
                                    $scope.interesTotal = $scope.interesActual + $scope.interesmespasado

                                }
                                $scope.interesnopagados = $scope.interesTotal //- $scope.interespagado
                                alertFactory.success("Intereses cargados");
                            } else {
                                $scope.unidades = 0;
                                $scope.unidadesVencidas = 0;
                                $scope.interesTotal = 0;
                                $scope.interesActual = 0;
                                $scope.unidadesPorVencer = 0;
                                /*$scope.porcentajeTotalUnidades = 0;
                                $scope.porcentajePorVencer = 0;
                                $scope.porcentajeVencido = 0;*/
                                $scope.unidadesRestantes = 0;
                                $scope.interesRestante = 0;
                                $scope.porcentajeRestante = 0;
                                $scope.total = 0;
                                alertFactory.info("No se encontraron intereses");
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
                        interestsRepository.getInterestSucursal($scope.Marca, $scope.nombreCorto, $scope.financieraselected).then(function (result) {
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
                                        dom: '<"html5buttons"B>lTfgitp',
                                        buttons: [{
                                                extend: 'copy'
                            }, {
                                                extend: 'csv'
                            }, {
                                                extend: 'excel',
                                                title: 'ExampleFile'
                            }, {
                                                extend: 'pdf',
                                                title: 'ExampleFile'
                            }
                                , {
                                                extend: 'print',
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
                                for (var i = 0; i < result.data.length; i++) {
                                    $scope.unidadesPorVencer += 1
                                    $scope.total += (result.data[i].interesAcumulado)
                                    $scope.porcentajeTotalUnidades = 100
                                    $scope.interesmespasado += (result.data[i].interesAcumulado);
                                    $scope.interespagado += (result.data[i].interesPagado);
                                    $scope.interesActual += (result.data[i].interesAcumuladoActual)
                                }
                                $scope.interesTotal = $scope.interesActual + $scope.interesmespasado
                                $scope.interesnopagados = $scope.interesTotal //- $scope.interespagado
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
                // Función para mostrar intereses por financiera
            $scope.getInterestFinanciera = function () {
                $('#interestTable').DataTable().destroy();
                $scope.interes = {};
                $scope.promise =
                    interestsRepository.getInterestFinanciera($scope.Marca, $scope.financieraselected).then(function (result) {
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
                                    dom: '<"html5buttons"B>lTfgitp',
                                    buttons: [{
                                            extend: 'copy'
                            }, {
                                            extend: 'csv'
                            }, {
                                            extend: 'excel',
                                            title: 'ExampleFile'
                            }, {
                                            extend: 'pdf',
                                            title: 'ExampleFile'
                            }
                                , {
                                            extend: 'print',
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
                            for (var i = 0; i < result.data.length; i++) {
                                $scope.unidadesPorVencer += 1
                                $scope.total += (result.data[i].interesAcumulado)
                                $scope.porcentajeTotalUnidades = 100
                                $scope.interesmespasado += (result.data[i].interesAcumulado);
                                $scope.interespagado += (result.data[i].interesPagado);
                                $scope.interesActual += (result.data[i].interesAcumuladoActual)
                            }
                            $scope.interesTotal = $scope.interesActual + $scope.interesmespasado
                            $scope.interesnopagados = $scope.interesTotal //- $scope.interespagado
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

            // Función para trar las financieras por empresa
            $scope.getFinancial = function () {
                    var itemFinanciera = {};
                $scope.financierasNombre = [];
                    $scope.unidadesFinanciera1 = 0;
                    $scope.totalInteresFinanciera1 = 0;
                    $scope.adeudoTotal1 = 0;
                    $scope.info = [];
                    $scope.promise = interestsRepository.getFinancial($scope.nombreCorto).then(function (result) {
                        if (result.data.length > 0) {
                            $scope.financieras = result.data;
                            $scope.empresa = $scope.nombreCorto;
                            $scope.info = [{
                                unidadesFinanciera: $scope.unidadesFinanciera
                    }, {
                                adeudoTotal: $scope.adeudoTotal
                    }, {
                                totalInteresFinanciera: $scope.totalInteresFinanciera
                    }];
                            for (var i = 0; i < result.data.length; i++) {
                                $scope.financiera = result.data[i].financiera;
                                console.log($scope.financiera);
                                interestsRepository.getFinancialForUnit($scope.empresa, $scope.financiera).then(function (detalles) {
                                    if (detalles.data.length > 0) {
                                        for (var j = 0; j < detalles.data.length; j++) {
                                            $scope.detalles1 = detalles.data;
                                            $scope.unidadesFinanciera1 = detalles.data.length
                                            $scope.adeudoTotal1 += (detalles.data[j].precioCompra)
                                            $scope.totalInteresFinanciera1 += (detalles.data[j].interesAcumuladoActual)
                                        }
                                        $scope.detalles = $scope.detalles1;
                                        $scope.unidadesFinanciera = $scope.unidadesFinanciera1;
                                        $scope.adeudoTotal = $scope.adeudoTotal1;
                                        $scope.totalInteresFinanciera = $scope.totalInteresFinanciera1;
                                        var itemFinanciera = {
                                            finNombre: detalles.data[0].financiera,
                                            detalles: $scope.detalles1,
                                            unidadesFinanciera: $scope.unidadesFinanciera1,
                                            adeudoTotal: $scope.adeudoTotal1,
                                            totalInteresFinanciera: $scope.totalInteresFinanciera1
                                        };
                                        $scope.financierasNombre.push(itemFinanciera);
                                        console.log($scope.financierasNombre);
                                        alertFactory.success("Detalles de Financieras cargadas");
                                    }
                                });
                            }
                            alertFactory.success("Financieras cargadas");
                        } else {
                            alertFactory.info("No se encontraron Financieras");
                        }
                    }, function (error) {
                        alertFactory.error("Error al cargar Financieras");
                    });
                }
                // Función para traer la información de unidades por financiera
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
            };
            // Función para el ng-class en el campo días
            $scope.setClassDias = function (dias) {
                if (dias >= 180) {
                    return 'gridFontRed';
                } else {
                    return 'gridFontGreen';
                }
            };

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

            };
            // Función para filtro de todas las unidades
            $scope.getTotalInterest = function () {
                $('#min').val('');
                $('#max').val('');
                $scope.rangeFilter();
                $('#interestTable').DataTable().draw();
            };
            // Función para filtro unidades por vencer
            $scope.getAlmostEndingInterest = function () {
                $('#min').val(170);
                $('#max').val(179);
                $scope.rangeFilter();
                $('#interestTable').DataTable().draw();
            };

            $scope.set30days = function () {
                $('#min').val(0);
                $('#max').val(30);
                $scope.rangeFilter();
                $('#interestTable').DataTable().draw();
            };
            $scope.set60days = function () {
                $('#min').val(0);
                $('#max').val(60);
                $scope.rangeFilter();
                $('#interestTable').DataTable().draw();
            };
            $scope.set90days = function () {
                $('#min').val(0);
                $('#max').val(90);
                $scope.rangeFilter();
                $('#interestTable').DataTable().draw();
            };
            // Función para filtro unidades vencidas
            $scope.getEndingInterest = function () {
                $('#min').val(180);
                $('#max').val(360);
                $scope.rangeFilter();
                $('#interestTable').DataTable().draw();
            };

            $scope.set90Masdays = function () {
                $('#min').val(91);
                $('#max').val(360);
                $scope.rangeFilter();
                $('#interestTable').DataTable().draw();
            };

            // Función para filtro unidades restantes
            $scope.getNormalInterest = function () {
                $('#min').val(30);
                $('#max').val(169);
                $scope.rangeFilter();
                $('#interestTable').DataTable().draw();
            };
            // Función para llamar modal
            $scope.inicia = function (vehNumserie) {
                    $('#DetallesUnidadModal').appendTo("body").modal('show');
                    $scope.vehNumserie = vehNumserie;
                    $scope.getDetailsUnit();
                    $scope.detailsUnit = $scope.detailsUnit;
                }
                // Función para cerrar la modal
            $scope.cerrar = function () {
                $('#inicioModal').modal('toggle');
            };
            // Función para traer detalles de las unidades
            $scope.getDetailsUnit = function () {
                    $scope.promise = interestsRepository.getDetailsUnit($scope.vehNumserie).then(function (result) {
                        if (result.data.length > 0) {
                            $scope.detailsUnit = result.data;
                        }
                    });
                }
                // Función para mostrar los detalles de las financieras
            $scope.mostrarDetalles = function (financiera) {
                $scope.financieraselected = financiera;
                $scope.seleccionarSucursal.show = true;
                $scope.getInterestFinanciera();
                $scope.mostrarDetalles.show = true;
                $scope.getFinancial.show = false;
            }
            
        $scope.checkbox =  (function(){
            $('.i-checks').iCheck({
                checkboxClass: 'icheckbox_square-green',
                radioClass: 'iradio_square-green',
            });
        });
   
            

            });