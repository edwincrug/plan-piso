registrationModule.controller('newUnitsController', function($scope, alertFactory, newUnitsRepository, interestsRepository, schemeRepository, $rootScope, localStorageService, loginRepository) {
    $scope.message = 'Buscando...';
    $scope.updateEsquemaUnidad = [];
    $scope.fechaHoy = new Date();
    $scope.listaUnidadesConValidacion = [];
    $scope.unidadesAcambiarEsquema = [];
    $scope.updateEsquemaUnidad = [];
    $scope.listaUnidadesConValidacion = [];
    $scope.idESquemaNueva = 0;
    $scope.nombreFinancieraCambio = "";
    $rootScope.currentEmployee = 0;
    $scope.userData = localStorageService.get('userData');
    $rootScope.empleadoNombre = "";

    $scope.editControl = true;
    $scope.disableControl = false;

    $scope.editDate = false;


    $scope.init = function() {
        //console.log($scope.userData);
        $rootScope.empleadoNombre = "";
        $scope.getEmpleados();
        //$scope.getUsuario();
        $scope.transpasoFinanciera.show = false;
        $scope.getSucursal.show = false;
        $scope.getFinanciera();
        $scope.getCompany();
        $scope.updateEsquemaUnidad = [];
        $scope.listaUnidadesConValidacion = [];
        $scope.unidadesAcambiarEsquema = [];
        $scope.updateEsquemaUnidad = [];
        $scope.listaUnidadesConValidacion = [];
        $scope.idESquemaNueva = 0;
        $scope.nombreFinancieraCambio = "";

        if (localStorageService.get('glbNewUnitsEmpresa') != null) {
            $scope.seleccionarEmpresa(localStorageService.get('glbNewUnitsEmpresa'), localStorageService.get('glbNewUnitsNombreEmpresa'));
        };


    };

    // Función para mostrar el nombre de usuario
    $scope.getUsuario = function() {
        $rootScope.empleadoNombre = [];
        loginRepository.getEmpleado($rootScope.currentEmployee).then(function(result) {
            if (result.data.length > 0) {
                $rootScope.empleadoNombre = result.data[0].nombre;
            } else {
                $rootScope.empleadoNombre = $scope.userData[0].nombre;
            }

        });

    };

    // Función para ver que usuario inicio sesión si por control de aplicaciones o login tradicional
    $scope.getEmpleados = function() {
        if (!($('#lgnUser').val().indexOf('[') > -1)) {
            localStorageService.set('lgnUser', $('#lgnUser').val());
            //$scope.getEmpleado();
        } else {
            if (($('#lgnUser').val().indexOf('[') > -1) && !localStorageService.get('lgnUser')) {
                if (getParameterByName('employee') != '') {
                    $rootScope.currentEmployee = getParameterByName('employee');
                    return;
                    $scope.getUsuario();
                    console.log('pasoaquidos')
                } else {
                    if ($scope.userData == null) {
                        alert('Inicie sesión desde panel de aplicaciones .');
                        //window.close(); 
                        location.href = '/';

                    } else {
                        $rootScope.empleadoNombre = [];
                        console.log('pasoaqui')
                        $rootScope.empleadoNombre = $scope.userData[0].nombre;

                    }
                }

            }
        }
        //Obtengo el empleado logueado
        $rootScope.currentEmployee = localStorageService.get('lgnUser');
    };

    // Función para seleccionar las empresas 
    $scope.seleccionarEmpresa = function(idEmpresa, nombreEmpresa) {
        $scope.seleccionarSucursal.show = false;
        $scope.idEmpresa = idEmpresa;
        $scope.getSucursal.show = true;
        $scope.nombreEmpresa = nombreEmpresa;
        $scope.getSucursal();
        $scope.getNewUnitsCompany();
        $scope.transpasoFinanciera.show = true;
        $scope.modalCambioFinanciera.show = false;

        localStorageService.set('glbNewUnitsEmpresa', idEmpresa);
        localStorageService.set('glbNewUnitsNombreEmpresa', nombreEmpresa);
    };

    // Función para filtrar por sucursal
    $scope.seleccionarSucursal = function(idSucursal, nombreSucursal) {
        $scope.idSucursal = idSucursal;
        $scope.nombreSucursal = nombreSucursal;
        $scope.modalCambioFinanciera.show = false;
        //$scope.modalTraspasoFinanciera.show = false;
        $scope.transpasoFinanciera.show = true;
        $scope.getNewUnitsSucursal();

    };
    // Función para filtrar compañias
    $scope.getCompany = function() {
        $scope.promise = interestsRepository.getCompany().then(function(result) {
            if (result.data.length > 0) {
                $scope.empresas = result.data;
                //alertFactory.success("Empresas cargados");
            } else {
                alertFactory.info("No se encontraron Empresas");
            }
        }, function(error) {
            alertFactory.error("Error al cargar Empresas");
        });
    };

    //Función para mostrar las sucursales por empresa
    $scope.getSucursal = function(idEmpresa) {
        $scope.promise = interestsRepository.getSucursal($scope.idEmpresa).then(function(result) {
            if (result.data.length > 0) {
                $scope.sucursales = result.data;
                //alertFactory.success("Sucursales cargados");
            } else {
                alertFactory.info("No se encontraron Sucursales");
            }
        }, function(error) {
            alertFactory.error("Error al cargar Sucursales");
        });
    };

    // Función para mostrar todas las unidades nuevas
    $scope.getNewUnits = function() {
        $scope.TotalUnidades = 0;
        $scope.newUnits = [];
        $('#newUnits').DataTable().destroy();
        $scope.promise = newUnitsRepository.getNewUnits().then(function(result) {
            if (result.data.length > 0) {
                $scope.newUnits = result.data;
                $scope.TotalUnidades = result.data.length;
                setTimeout(function() {
                    $('#newUnits').DataTable({
                        dom: '<"html5buttons"B>lTfgitp',
                        order: [
                            [0, 'desc']
                        ],
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
                                customize: function(win) {
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
        }, function(error) {
            alertFactory.error("Error al cargar Empresas");
        });
    };

    // Función para mostrar las unidades nuevas por empresa
    $scope.getNewUnitsCompany = function() {
        $scope.TotalUnidades = 0;
        $scope.newUnits = [];
        $('#newUnits').DataTable().destroy();
        $scope.promise = newUnitsRepository.getNewUnitsCompany($scope.idEmpresa).then(function(result) {
            if (result.data.length > 0) {
                $scope.newUnits = result.data;
                $scope.TotalUnidades = result.data.length;
                setTimeout(function() {
                    $('#newUnits').DataTable({
                        dom: '<"html5buttons"B>lTfgitp',
                        order: [
                            [0, 'desc']
                        ],
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
                                customize: function(win) {
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
        }, function(error) {
            alertFactory.error("Error al cargar Empresas");
        });
    };

    // Función para mostrar todas las unidades nuevas por sucursal
    $scope.getNewUnitsSucursal = function() {
        $scope.TotalUnidades = 0;
        $scope.newUnits = [];
        $('#newUnits').DataTable().destroy();
        $scope.promise = newUnitsRepository.getNewUnitsSucursal($scope.idEmpresa, $scope.idSucursal).then(function(result) {
            if (result.data.length > 0) {
                $scope.newUnits = result.data;
                $scope.TotalUnidades = result.data.length;
                setTimeout(function() {
                    $('#newUnits').DataTable({
                        dom: '<"html5buttons"B>lTfgitp',
                        order: [
                            [0, 'desc']
                        ],
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
                                customize: function(win) {
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
        }, function(error) {
            alertFactory.error("Error al cargar Empresas");
        });
    };

    // Función para mostrar todas las financieras disponibles
    $scope.getFinanciera = function() {
        $scope.promise = schemeRepository.getFinanciera().then(function(result) {
            if (result.data.length > 0) {
                $scope.financieraNueva = result.data;
                //alertFactory.success("financieras cargados");
            } else {
                alertFactory.info("No se encontraron financieras");
            }
        }, function(error) {
            alertFactory.error("Error al cargar financieras");
        });
    };

    // Función para abrir modal de asignanción de esquema
    $scope.modalCambioFinanciera = function(modal) {
        $scope.hacerCambioEsquemaTraspaso.show = false;
        $('#traspasoFinanciero').appendTo("body").modal('show');
        $scope.idEsquemaNuevoTraspaso.show = true;
        $scope.idESquemaNueva = 0;
        $scope.modal = modal;
        $scope.esquemas = {};
        $('#esquemasFinancieraNuevoTraspaso').DataTable().destroy();
    };

    // Función para ocultar las opciones de asignanción de esquema
    $scope.cancelFinancial = function() {
        $scope.nombreFinancieraCambio = "";
        $scope.transpasoFinanciera.show = true;
        $scope.modalCambioFinanciera.show = false;
        $scope.valorCheckBoxTabla.show = false;
        $scope.valorCheckBoxTabla = [];
        $('input[type=checkbox]').attr('checked', false);
    };


    $scope.transpasoFinanciera = function() {
        //$scope.modalTraspasoFinanciera.show = true;
        $scope.valorCheckBoxTabla.show = true;
        $scope.transpasoFinanciera.show = false;
        $scope.updateEsquemaUnidad = [];
        $scope.listaUnidadesConValidacion = [];
        $scope.idESquemaNueva = 0;
    };

    // Función para mostrar opciones de asignación de cambio de esquema
    $scope.selectFinancial = function() {
        //$scope.updateEsquemaUnidad = [];
        //$scope.listaUnidadesConValidacion = [];
        $scope.idESquemaNueva = 0;
        $scope.transpasoFinanciera.show = false;
        $scope.modalCambioFinanciera.show = true;
        $scope.valorCheckBoxTabla.show = true;
    };

    // Función para mostrar los esquemas por financiera
    $scope.getEsquemaFinanciera = function() {
        $('#esquemasFinancieraNuevoTraspaso').DataTable().destroy();
        $scope.esquemas = [];
        $scope.fechaInicio = [];
        $scope.fechaInicios = "";
        //$('#esquemasFinancieraNuevo').DataTable().destroy();
        $scope.promise = schemeRepository.getEsquemaFinanciera($scope.idFinancieraCambio).then(function(result) {
            if (result.data.length > 0) {
                $scope.esquemas = result.data;
                setTimeout(function() {
                    $('#esquemasFinancieraNuevoTraspaso').DataTable({
                        dom: '<"html5buttons"B>lTfgitp',
                        iDisplayLength: 5,
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
                        }, {
                            extend: 'print',
                            customize: function(win) {
                                $(win.document.body).addClass('white-bg');
                                $(win.document.body).css('font-size', '10px');
                                $(win.document.body).find('table')
                                    .addClass('compact')
                                    .css('font-size', 'inherit');
                            }
                        }]
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
        }, function(error) {
            alertFactory.error("Error al cargar Esquemas");
        });
    };

    // Función para guardar en una lista los id de unidades para asignación de esquema
    $scope.valorCheckBoxTabla = function(idUnidad, currentRow) {

        console.log(idUnidad);

        if (currentRow.vehNumserie == '0') {
            
            alertFactory.info("La unidad con vin 0 no se asignara");
            return;
        }


        if (idUnidad == false || idUnidad == undefined) {} else {
            $scope.updateEsquemaUnidad.push({
                vehNumserie: currentRow.vehNumserie,
                idUnidad: currentRow.idUnidad,
                fecha: new Date(),
                idCostoInventario: currentRow.valorInventario
            });
            // console.log($scope.updateEsquemaUnidad)
        }
    };


    // Función para seleccionar la financiera a hacer el cambio
    $scope.seleccionarFinancieraNuevaTraspaso = function(idFinanciera, nombre) {
        $scope.idFinancieraCambio = idFinanciera;
        $scope.nombreFinancieraCambio = nombre;
        $scope.getEsquemaFinanciera();
    };

    // Función para actualizar el esquema por unidad
    $scope.updateSchemeNews = function() {
        console.log($scope.unidadesAcambiarEsquema)
        $scope.updateEsquemaUnidad.forEach(function(updateEsquemaUnidad) {
            newUnitsRepository.updateSchemeNews($scope.idESquemaNueva, updateEsquemaUnidad.vehNumserie).then(function(result) {
                if (result.data.length > 0) {
                    newUnitsRepository.insertMovementScheme(updateEsquemaUnidad.idUnidad, $scope.idFinancieraCambio, updateEsquemaUnidad.fecha, updateEsquemaUnidad.idCostoInventario, 0).then(function(nuevos) {
                        if (nuevos.data.length > 0) {} else {}
                    });
                } else {}
            }, function(error) {
                alertFactory.error("Error al cambiar Esquema");
            });
        });
    };

    // Función para seleccionar el esquema a asignar
    $scope.idEsquemaNuevoTraspaso = function(idEsquema, nombre) {
        $scope.idESquemaNueva = idEsquema;
        $scope.nombreEsquemaNueva = nombre;
    };

    // Función para cancelar una asignación de esquema
    $scope.cancelarCambioFinancieraTraspaso = function() {
        $scope.updateEsquemaUnidad = [];
        $scope.listaUnidadesConValidacion = [];
        $scope.idESquemaNueva = 0;
        $scope.nombreFinancieraCambio = "";
        $scope.valorCheckBoxTabla.show = false;
        $('#unidadesCambioEsquemaNuevos').DataTable().destroy();
        $('#esquemasFinancieraNuevoTraspaso').DataTable().destroy();
        $scope.hacerCambioEsquemaTraspaso.show = false;
        $('input[type=checkbox]').attr('checked', false);
        $scope.modalCambioFinanciera.show = false;
        $scope.valorCheckBoxTabla.show = false;
        //$scope.idEsquemaNuevoTraspaso.show = true;
        $scope.transpasoFinanciera.show = true;
    };

    // Función para hacer validación de que unidades se les puede asignar un nuevo esquema
    $scope.hacerCambioEsquemaTraspaso = function(object) {
        console.log(object)
        angular.forEach(object, function(value, key) {
            if (value.check == true) {
                $scope.idESquemaNueva = value.idEsquema;
                $scope.nombreEsquemaNueva = value.nombre;
            }
        });
        console.log($scope.idESquemaNueva + ' :financiera ' + $scope.nombreEsquemaNueva + ' nombre')
        $scope.validationSchemaChange();
        $('input[type=checkbox]').attr('checked', false);
        $scope.valorCheckBoxTabla.show = false;
        $scope.modalCambioFinanciera.show = false;
        $scope.idEsquemaNuevoTraspaso.show = false;
        $scope.hacerCambioEsquemaTraspaso.show = true;
        setTimeout(function() {
            $('#unidadesCambioEsquemaNuevos').DataTable({
                dom: '<"html5buttons"B>lTfgitp',
                iDisplayLength: 5,
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
                }, {
                    extend: 'print',
                    customize: function(win) {
                        $(win.document.body).addClass('white-bg');
                        $(win.document.body).css('font-size', '10px');
                        $(win.document.body).find('table')
                            .addClass('compact')
                            .css('font-size', 'inherit');
                    }
                }]
            });
        }, 1000);
        $scope.transpasoFinanciera.show = true;
    };

    // Función que hace la asignanción del nuevo esquema a la unidad
    $scope.regresarInteresesTraspaso = function() {
        $scope.updateSchemeNews();
        $scope.getCompany();
        $scope.seleccionarSucursal.show = false;
        $scope.transpasoFinanciera.show = false;
        $scope.modalCambioFinanciera.show = false;
        $scope.getFinanciera();
        $scope.getSucursal.show = false;
        $('#unidadesCambioEsquemaNuevos').DataTable().destroy();
        $('#esquemasFinancieraNuevoTraspaso').DataTable().destroy();
        $scope.updateEsquemaUnidad = [];
        $scope.listaUnidadesConValidacion = [];
        $scope.idESquemaNueva = 0;
        $scope.nombreFinancieraCambio = "";
        window.scrollTo(0,0);
        alertFactory.info("Asignacion finalizada.");
    };

    $scope.getStringTasaFija = function(value) {
        if (value) return "FECHA";
        else return "RANGO";
    };

    $scope.getStringTipoTiie = function(value) {
        return $scope.lstTiie[value - 1].text;
    };

    $scope.lstTiie = [{
        value: 1,
        text: 'TIIE Actual'
    }, {
        value: 2,
        text: 'TIIE Promedio'
    }, {
        value: 3,
        text: 'TIIE Fija'
    }];

    // Validación para mostrar las unidades que pueden cambiar el esquema
    $scope.validationSchemaChange = function() {
            //$('#unidadesCambioEsquemaNuevos').DataTable().destroy();
            // $scope.listaUnidadesConValidacion = [];
            // $scope.updateEsquemaUnidad.forEach(function(updateEsquemaUnidad) {
            //     $scope.promise = interestsRepository.getDetalleUnidadEsquema(updateEsquemaUnidad.vehNumserie).then(function(result) {
            //         if (result.data.length > 0) {
            //             interestsRepository.getDetalleEsquemaUnidad($scope.idESquemaNueva).then(function(esquemaNuevo) {
            //                 if (esquemaNuevo.data.length > 0) {
            //                     if (esquemaNuevo.data[0].esFijo == 1) {
            //                         $scope.fechaIngresoInvetario = result.data[0].vehFecremisions;
            //                         $scope.fechaEsquemaNuevo = esquemaNuevo.data[0].fechaInicio;
            //                         if ($scope.fechaEsquemaNuevo <= $scope.fechaIngresoInvetario) {
            //                             $scope.listaUnidadesConValidacion.push({
            //                                 vehNumserie: updateEsquemaUnidad.vehNumserie,
            //                                 observaciones: "Esta Unidad se puede transferir a esquema de fechas",
            //                                 status: "OK",
            //                                 idUnidad: updateEsquemaUnidad.idUnidad,
            //                                 idFinanciera: $scope.idESquemaNueva,
            //                                 idCostoInventario: result.data[0].valorInventario
            //                             });
            //                             $scope.fechaIngresoInvetario = 0;
            //                         } else {
            //                             $scope.listaUnidadesConValidacion.push({
            //                                 vehNumserie: updateEsquemaUnidad.vehNumserie,
            //                                 observaciones: "Esta Unidad no se puede transferir, tiene un excedente de días",
            //                                 status: "EXCEEDED",
            //                                 idUnidad: updateEsquemaUnidad.idUnidad,
            //                                 idFinanciera: $scope.idESquemaNueva,
            //                                 idCostoInventario: result.data[0].valorInventario
            //                             });
            //                             $scope.fechaIngresoInvetario = 0;
            //                         }
            //                     } else {
            //                         $scope.listaUnidadesConValidacion.push({
            //                             vehNumserie: updateEsquemaUnidad.vehNumserie,
            //                             observaciones: "Esta Unidad se puede transferir",
            //                             status: "OK",
            //                             idUnidad: updateEsquemaUnidad.idUnidad,
            //                             idFinanciera: $scope.idESquemaNueva,
            //                             idCostoInventario: result.data[0].valorInventario
            //                         });
            //                     }
            //$scope.unidadesAutorizadas();
        }
        //});
        //     } else {
        //         alertFactory.info("Esquema no cambiado");
        //     }
        // }, function(error) {
        //     alertFactory.error("Error al cambiar Esquema");
        // });
        // });


    $scope.setClass = function(status) {
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



    $scope.calendario = function() {

        

        $('#calendar .input-group.date').datepicker({
            todayBtn: "linked",
            keyboardNavigation: true,
            forceParse: false,
            calendarWeeks: true,
            autoclose: true,
            todayHighlight: true,
            format: "dd/mm/yyyy"
        });
    };



    $scope.saveCalcDate = function(obj) {

        newUnitsRepository.updateFechaCalculo(obj.idUnidad, obj.fechaCalculo).then(function(result) {
            if (result.data.length > 0) {
                alertFactory.info("Actualización de fecha Correcto");
                
            } else {
                alertFactory.info("No se pudo cambiar la fecha");
            }
        }, function(error) {
            alertFactory.error("No se pudo cambiar la fecha");
        });

    };
});
