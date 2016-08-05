registrationModule.controller('newUnitsController', function($scope, alertFactory, newUnitsRepository, interestsRepository, schemeRepository) {
    
    $scope.message = 'Buscando...';
    $scope.updateEsquemaUnidad =[];
    $scope.fechaHoy = new Date();
    
    $scope.init = function(){
        //$scope.getNewUnits();
        $scope.transpasoFinanciera.show = false;
        $scope.getFinanciera();
        $scope.getCompany();
        $scope.getSucursal.show = false;
    }
    
    $scope.seleccionarEmpresa = function (idEmpresa, nombreEmpresa) {
        $scope.seleccionarSucursal.show = false;
        $scope.idEmpresa = idEmpresa;
        $scope.getSucursal.show = true;
        $scope.nombreEmpresa = nombreEmpresa;
        $scope.getSucursal();
         $scope.getNewUnitsCompany();
        $scope.transpasoFinanciera.show = true;
        $scope.modalCambioFinanciera.show = false;
        
    }

    // Función para filtrar por sucursal
    $scope.seleccionarSucursal = function (idSucursal, nombreSucursal) {
        $scope.idSucursal = idSucursal;
        $scope.nombreSucursal = nombreSucursal;
        $scope.modalCambioFinanciera.show = false;
        //$scope.modalTraspasoFinanciera.show = false;
        $scope.transpasoFinanciera.show = true;
        $scope.getNewUnitsSucursal();

    }
        // Función para filtrar compañias
    $scope.getCompany = function () {
            $scope.promise = interestsRepository.getCompany().then(function (result) {
                if (result.data.length > 0) {
                    $scope.empresas = result.data;
                    //alertFactory.success("Empresas cargados");
                } else {
                    alertFactory.info("No se encontraron Empresas");
                }
            }, function (error) {
                alertFactory.error("Error al cargar Empresas");
            });
        }
    
    $scope.getSucursal = function (idEmpresa) {
        $scope.promise = interestsRepository.getSucursal($scope.idEmpresa).then(function (result) {
            if (result.data.length > 0) {
                $scope.sucursales = result.data;
                //alertFactory.success("Sucursales cargados");
            } else {
                alertFactory.info("No se encontraron Sucursales");
            }
        }, function (error) {
            alertFactory.error("Error al cargar Sucursales");
        });
    }
    
    $scope.getNewUnits = function(){
        $scope.TotalUnidades = 0;
        $scope.newUnits = [];
        $('#newUnits').DataTable().destroy();
        $scope.promise = newUnitsRepository.getNewUnits().then(function (result) {
                if (result.data.length > 0) {
                    $scope.newUnits = result.data;
                    $scope.TotalUnidades = result.data.length;
                    setTimeout(function () {
                        $('#newUnits').DataTable({
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
                } else {
                    alertFactory.info("No se encontraron Empresas");
                }
            }, function (error) {
                alertFactory.error("Error al cargar Empresas");
            });
    }
    
    $scope.getNewUnitsCompany = function(){
        $scope.TotalUnidades = 0;
        $scope.newUnits = [];
        $('#newUnits').DataTable().destroy();
        $scope.promise = newUnitsRepository.getNewUnitsCompany($scope.idEmpresa).then(function (result) {
                if (result.data.length > 0) {
                    $scope.newUnits = result.data;
                    $scope.TotalUnidades = result.data.length;
                    setTimeout(function () {
                        $('#newUnits').DataTable({
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
                } else {
                    alertFactory.info("No se encontraron Empresas");
                }
            }, function (error) {
                alertFactory.error("Error al cargar Empresas");
            });
    }
    
    $scope.getNewUnitsSucursal = function(){
        $scope.TotalUnidades = 0;
         $scope.newUnits = [];
        $('#newUnits').DataTable().destroy();
        $scope.promise = newUnitsRepository.getNewUnitsSucursal($scope.idEmpresa, $scope.idSucursal).then(function (result) {
                if (result.data.length > 0) {
                    $scope.newUnits = result.data;
                    $scope.TotalUnidades = result.data.length;
                    setTimeout(function () {
                        $('#newUnits').DataTable({
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
                } else {
                    alertFactory.info("No se encontraron Empresas");
                }
            }, function (error) {
                alertFactory.error("Error al cargar Empresas");
            });
    }
    
    $scope.getFinanciera = function () {
        $scope.promise = schemeRepository.getFinanciera().then(function (result) {
            if (result.data.length > 0) {
                $scope.financieraNueva = result.data;
                //alertFactory.success("financieras cargados");
            } else {
                alertFactory.info("No se encontraron financieras");
            }
        }, function (error) {
            alertFactory.error("Error al cargar financieras");
        });
    }
    
    $scope.modalCambioFinanciera = function(modal){
        $scope.hacerCambioEsquemaTraspaso.show = false;
        $('#traspasoFinanciero').appendTo("body").modal('show');  
        $scope.idEsquemaNuevoTraspaso.show = true;
        $scope.idESquemaNueva = 0;
        $scope.modal = modal;
        $scope.esquemas = {};
        $('#esquemasFinancieraNuevoTraspaso').DataTable().destroy();
    }
    
    $scope.cancelFinancial = function(){
        $scope.nombreFinancieraCambio = "";
        $scope.transpasoFinanciera.show = true;
        $scope.modalCambioFinanciera.show = false;
        $scope.valorCheckBoxTabla.show= false;
        $('input[type=checkbox]').attr('checked', false);
    }
    
    $scope.transpasoFinanciera = function () {
        //$scope.modalTraspasoFinanciera.show = true;
        $scope.valorCheckBoxTabla.show = true;
        $scope.transpasoFinanciera.show = false;
        $scope.updateEsquemaUnidad = [];
        $scope.listaUnidadesConValidacion = [];
        $scope.idESquemaNueva = 0;
    }
    
    $scope.selectFinancial = function(){
        //$scope.updateEsquemaUnidad = [];
        //$scope.listaUnidadesConValidacion = [];
        $scope.idESquemaNueva = 0;
        $scope.transpasoFinanciera.show = false;
        $scope.modalCambioFinanciera.show = true;
        $scope.valorCheckBoxTabla.show = true;
    }
    
    $scope.getEsquemaFinanciera = function () {
        $scope.esquemas = [];
        $('#esquemasFinancieraNuevoTraspaso').DataTable().destroy();
        $scope.fechaInicio = [];
        $scope.fechaInicios = "";
        //$('#esquemasFinancieraNuevo').DataTable().destroy();
        $scope.promise = schemeRepository.getEsquemaFinanciera($scope.idFinancieraCambio).then(function (result) {
            if (result.data.length > 0) {
                $scope.esquemas = result.data;
                setTimeout(function () {
                    $('#esquemasFinancieraNuevoTraspaso').DataTable({
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
                for (var i = 0; i < result.data.length; i++) {
                $scope.idEsquema = result.data[i].idEsquema;
                $scope.esFijo = result.data[i].esFijo;
                //$scope.getDetalleEsquema();
                }                
                alertFactory.success("Esquemas cargados");
            } else {
                alertFactory.info("No se encontraron Esquemas");
            }
        }, function (error) {
            alertFactory.error("Error al cargar Esquemas");
        });
    }
    
    $scope.valorCheckBoxTabla = function (idUnidad,idu) {
        if (idUnidad == false || idUnidad == undefined) {} else {
            $scope.updateEsquemaUnidad.push({
                vehNumserie: idUnidad,
                idUnidad: idu
            });
        }
    }
    
    $scope.seleccionarFinancieraNuevaTraspaso = function (idFinanciera, nombre) {
        $scope.idFinancieraCambio = idFinanciera;
        $scope.nombreFinancieraCambio = nombre;
        $scope.getEsquemaFinanciera();
        
        
        
    }
    
    $scope.updateSchemeNews = function () {
        $scope.updateEsquemaUnidad.forEach(function (updateEsquemaUnidad) {
            newUnitsRepository.updateSchemeNews($scope.idESquemaNueva, updateEsquemaUnidad.vehNumserie).then(function (result) {
                if (result.data.length > 0) {
                } else {
                }
            }, function (error) {
                alertFactory.error("Error al cambiar Esquema");
            });
        });
    }
     
    $scope.idEsquemaNuevoTraspaso = function (idEsquema, nombre) {
        $scope.idESquemaNueva = idEsquema;
        $scope.nombreEsquemaNueva = nombre;
    }
    
    $scope.cancelarCambioFinancieraTraspaso = function () {
        $('#unidadesCambioEsquemaNuevo').DataTable().destroy();
        $('#esquemasFinancieraNuevoTraspaso').DataTable().destroy();
        $scope.nombreFinancieraCambio = "";
        $scope.valorCheckBoxTabla.show= false;
        $scope.idEsquemaNuevoTraspaso.show = true;
        $scope.hacerCambioEsquemaTraspaso.show = false;
        $('input[type=checkbox]').attr('checked', false);
        $scope.modalCambioFinanciera.show = false;
        $scope.valorCheckBoxTabla.show = false;
        $scope.transpasoFinanciera.show = true;
        $scope.updateEsquemaUnidad = [];
        $scope.listaUnidadesConValidacion = [];
        $scope.idESquemaNueva = 0;       
    }
    
    $scope.hacerCambioEsquemaTraspaso = function () {     
        $scope.hacerCambioEsquemaTraspaso.show = true;
        $scope.idEsquemaNuevoTraspaso.show = false;
        $('input[type=checkbox]').attr('checked', false);
        $scope.valorCheckBoxTabla.show = false;  
        setTimeout(function () {
                    $('#unidadesCambioEsquemaNuevo').DataTable({
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
    }
    
    $scope.regresarInteresesTraspaso = function () {
        $scope.updateSchemeNews();
        $scope.getCompany();
        $scope.seleccionarSucursal.show = false;
        $scope.transpasoFinanciera.show = false;
        $scope.modalCambioFinanciera.show = false;
        $scope.getFinanciera();
        $scope.getCompany();
        $scope.getSucursal.show = false;
        $('#unidadesCambioEsquemaNuevo').DataTable().destroy();
        $('#esquemasFinancieraNuevoTraspaso').DataTable().destroy();
        $scope.updateEsquemaUnidad = [];
        $scope.idESquemaNueva = 0;
        $scope.nombreFinancieraCambio = "";
    }
    
    $scope.getStringTasaFija = function (value) {
        if (value) return "FECHA";
        else return "RANGO";
    };

    $scope.getStringTipoTiie = function (value) {
        return $scope.lstTiie[value - 1].text;
    };

    $scope.lstTiie = [
        {
            value: 1,
            text: 'TIIE Actual'
        },
        {
            value: 2,
            text: 'TIIE Promedio'
        },
        {
            value: 3,
            text: 'TIIE Fija'
        }
    ];
      
});