registrationModule.controller('interestsController', function ($scope, alertFactory, interestsRepository, schemeRepository) {
    //store an array of free days getting by getFreeDays function  
    $scope.message = 'Buscando...';
    //$scope.Marca = {};
    //$scope.vehNumserie = {};
    $scope.detailsUnit = {};
    $scope.fechaHoy = new Date();
    $scope.idEmpresa = {};
    // Primer metodo llamado al cargar la pagína
    $scope.init = function () {
            $scope.getCompany();
            $scope.seleccionarSucursal.show = false;
            $scope.seleccionarFinanciera.show = false;
            //$scope.checkbox();
            //$scope.transpasoFinanciera.show = false;
            //$scope.modalTraspasoFinanciera.show = false;
            //$scope.getScheme();


        }
    
        // Función para filtrar por empresa
    $scope.seleccionarEmpresa = function (idEmpresa, nombreEmpresa) {
            $scope.seleccionarSucursal.show = false;
            $scope.idEmpresa = idEmpresa;
            console.log($scope.idEmpresa)
            //$scope.nombreCorto = empresa;
            $scope.nombreEmpresa = nombreEmpresa;
            //$scope.getInterest();
            $scope.getFinancial();
            $scope.getSucursal();
            $scope.getFinancial.show = true;
            $scope.seleccionarFinanciera.show = false;
            //$scope.transpasoFinanciera.show = false;
            //$scope.modalTraspasoFinanciera.show = false;
        }
    
        // Función para filtrar por sucursal
    $scope.seleccionarSucursal = function (idSucursal, nombreSucursal) {
            $scope.idSucursal = idSucursal;
        //console.log($scope.idSucursal);
            //$scope.sucursal = empresa;
            $scope.nombreSucursal = nombreSucursal;
        //console.log($scope.nombreSucursal);
            //$scope.getInterestSucursal();
        }
    
    // Muestra los detalles de la financiera
    $scope.seleccionarFinanciera = function (idFinanciera, nombreFinanciera) {
        $scope.idFinanciera = idFinanciera;
        //console.log($scope.idFinanciera);
        $scope.nombreFinanciera = nombreFinanciera;
        //console.log($scope.nombreFinanciera);
        $scope.seleccionarSucursal.show = true;
        //$scope.getInterestFinanciera();
        $scope.seleccionarFinanciera.show = true;
        $scope.getFinancial.show = false;
        //$scope.transpasoFinanciera.show = true;
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
         //$scope.financieras = {};   
            $scope.promise = interestsRepository.getFinancial($scope.idEmpresa).then(function (result) {
                if (result.data.length > 0) {
                    $scope.financieras = result.data;
                    console.log($scope.financieras)
                    alertFactory.success("Financieras cargadas");
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
                    console.log(result.data);
                    alertFactory.success("Sucursales cargados");
                } else {
                    alertFactory.info("No se encontraron Sucursales");
                }
            }, function (error) {
                alertFactory.error("Error al cargar Sucursales");
            });
        }
    
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
    
    
        // Metodo para obtiener todos los intereses y los datos para llenar los dashboards
    /*$scope.getInterest = function () {
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
                        if (result.data[i].diasPlanPiso >= 180) {} else
                        if (result.data[i].interesAcumulado == result.data[i].interesPagado) {
                            $scope.unidadesPorVencer += 1;
                        }
                        $scope.unidadesPorVencer += 1;
                        $scope.total += (result.data[i].interesAcumulado)
                        $scope.porcentajeTotalUnidades = 100;
                        $scope.interesmespasado += (result.data[i].interesAcumulado);
                        $scope.unidadesRestantes = $scope.unidades - $scope.unidadesPorVencer - $scope.unidadesVencidas
                        $scope.interespagado += (result.data[i].interesPagado);
                        $scope.interesActual += (result.data[i].interesAcumuladoActual);
                        $scope.interesTotal = $scope.interesActual + $scope.interesmespasado;
                    }
                    $scope.interesnopagados = $scope.interesTotal;
                    alertFactory.success("Intereses cargados");
                } else {
                    $scope.unidades = 0;
                    $scope.unidadesVencidas = 0;
                    $scope.interesTotal = 0;
                    $scope.interesActual = 0;
                    $scope.unidadesPorVencer = 0;
                    $scope.unidadesRestantes = 0;
                    $scope.interesRestante = 0;
                    $scope.porcentajeRestante = 0;
                    $scope.total = 0;
                    alertFactory.info("No se encontraron intereses");
                }
            }, function (error) {
                alertFactory.error("Error al cargar intereses");
            });
    }*/



 

   
       // Función para mostrar intereses por financiera
    
    
        // Función para traer la información de unidades por financiera
    /*$scope.setClass = function (status) {
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
    }
    
    // Filtro para mostras unidades a 60 días de financiamiento
    $scope.set60days = function () {
        $('#min').val(0);
        $('#max').val(60);
        $scope.rangeFilter();
        $('#interestTable').DataTable().draw();
    }
    
    // Filtro para mostras unidades a 90 días de financiamiento
    $scope.set90days = function () {
        $('#min').val(0);
        $('#max').val(90);
        $scope.rangeFilter();
        $('#interestTable').DataTable().draw();
    }

    // Filtro para mostras unidades a mas de 90 días de financiamiento
    $scope.set90Masdays = function () {
        $('#min').val(91);
        $('#max').val(360);
        $scope.rangeFilter();
        $('#interestTable').DataTable().draw();
    }
    
    // Función para llamar modal
    /*$scope.inicia = function (vehNumserie) {
        $('#DetallesUnidadModal').appendTo("body").modal('show');
        $scope.vehNumserie = vehNumserie;
        $scope.getDetailsUnit();
        $scope.detailsUnit = $scope.detailsUnit;
    }
    
    // Función para cerrar la modal
    $scope.cerrar = function () {
        $('#inicioModal').modal('toggle');
    }
    
    // Función para traer detalles de las unidades
    /*$scope.getDetailsUnit = function () {
        $scope.promise = interestsRepository.getDetailsUnit($scope.vehNumserie).then(function (result) {
            if (result.data.length > 0) {
                $scope.detailsUnit = result.data;
            }
        });
    }*/
    
    // Función para mostrar los detalles de las financieras
    

    //Estilo de checkbox
    /*$scope.checkbox = (function () {
        $('.i-checks').iCheck({
            checkboxClass: 'icheckbox_square-green',
            radioClass: 'iradio_square-green',
        });
    })
    
    // Función para iniciar wizard
    $scope.wizard = function () {
        $("#wizard").steps();
        $("#form").steps({
            bodyTag: "fieldset",
            onStepChanging: function (event, currentIndex, newIndex) {
                // Always allow going backward even if the current step contains invalid fields!
                if (currentIndex > newIndex) {
                    return true;
                }
                // Forbid suppressing "Warning" step if the user is to young
                if (newIndex === 3 && Number($("#age").val()) < 18) {
                    return false;
                }
                var form = $(this);

                // Clean up if user went backward before
                if (currentIndex < newIndex) {
                    // To remove error styles
                    $(".body:eq(" + newIndex + ") label.error", form).remove();
                    $(".body:eq(" + newIndex + ") .error", form).removeClass("error");
                }
                // Disable validation on fields that are disabled or hidden.
                form.validate().settings.ignore = ":disabled,:hidden";

                // Start validation; Prevent going forward if false
                return form.valid();
            },
            onStepChanged: function (event, currentIndex, priorIndex) {
                // Suppress (skip) "Warning" step if the user is old enough.
                if (currentIndex === 2 && Number($("#age").val()) >= 18) {
                    $(this).steps("Siguiente");
                }
                // Suppress (skip) "Warning" step if the user is old enough and wants to the previous step.
                if (currentIndex === 2 && priorIndex === 3) {
                    $(this).steps("Anterior");
                }
            },
            onFinishing: function (event, currentIndex) {
                var form = $(this);
                // Disable validation on fields that are disabled.
                // At this point it's recommended to do an overall check (mean ignoring only disabled fields)
                form.validate().settings.ignore = ":disabled";
                // Start validation; Prevent form submission if false
                return form.valid();
            },
            onFinished: function (event, currentIndex) {
                var form = $(this);
                // Submit form input
                form.submit();
            }
        }).validate({
            errorPlacement: function (error, element) {
                element.before(error);
            },
            rules: {
                confirm: {
                    equalTo: "#password"
                }
            }
        });
    }

    // Función para mostrar la modal del wizard de transpaso de financiera
    $scope.transpasoFinanciera = function () {
        $scope.modalTraspasoFinanciera.show = true;
        $scope.transpasoFinanciera.show = false;
    }
    
    // Función para mostrar botones de modal de transpasos
    $scope.modalTraspasoFinanciera = function (modal) {
        $scope.modal = modal;
         console.log('hola', $scope.modal)
        $('#transpasoFinancieroModal').appendTo("body").modal('show');
        $scope.wizard();
        
    }
    
    // oculta los botones para transpaso de financiera
    /*$scope.cancelarTranspasoModal = function () {
        $scope.modalTraspasoFinanciera.show = false;
        $scope.transpasoFinanciera.show = true;
    }
    
    /*$scope.getScheme = function(){
        $scope.promise = schemeRepository.getScheme().then(function (result) {
            if (result.data.length > 0) {
                $scope.esquemas = result.data;
                //$scope.diasGracia = result.data.diasGracia;
                alertFactory.success("Esquemas cargados");
            } else {
                alertFactory.info("No se encontraron Esquemas");
            }
        }, function (error) {
            alertFactory.error("Error al cargar Esquemas");
        });
    }*/
    
     /*$scope.modalAgregarNuevoEsquemas = function () {      
         
        $('#modalAgregarNuevoEsquema').appendTo("body").modal('show');
    }
     // funcion de prueba para mostrar nombre de las financieras
     $scope.seleccionarFinanciera = function(financiera){
         $scope.nombreFinanciera = financiera;
         console.log($scope.nombreFinanciera);
         console.log('financiera');
     }*/
    
    /* Función para llamar el datepicker
    $scope.calendario = function(){
    $('#calendar .input-group.date').datepicker({
           todayBtn: "linked",
           keyboardNavigation: true,
           forceParse: false,
           calendarWeeks: true,
           autoclose: true,
           todayHighlight: true
       });
    }*/
});