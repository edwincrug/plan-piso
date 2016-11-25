registrationModule.controller('ConciliationController', function($scope, alertFactory, ConciliationRepository, interestsRepository, Upload, interestsRepository, localStorageService, $rootScope) {
    $scope.message = 'Cargando...';
    $scope.mostrar = false;
    $scope.uploadButton = false;
    $scope.closeButton = false;
    $scope.mostrarConci = false;
    $scope.interes = [];
    $scope.lstVinUsuario = [];
    $scope.financieras = [];
    $scope.idEmpresa = 0
    $scope.interes = [];
    $scope.interesesFinanciera = [];
    $scope.VinValidados = []
    $scope.subirDocumento = false;
    $scope.mostrarConcif = false;

    $scope.init = function() {
        $scope.getCompany();

    }


    //Carga de archivos
    $scope.upload = function(fileinput) {
        $('#interestTable').DataTable().destroy();
        $scope.mostrar = true;
        $scope.mostrarConci = true;
        $scope.mostrarConcif = false;
        totalDatosDocumento = 0;
        $scope.VinValidados = [];
        $scope.lstVinUsuario = [];
        $scope.promise = Upload.upload({
            url: 'http://localhost:4200/api/conciliacion/files', //webAPI exposed to upload the file
            data: {
                file: fileinput
            }
        }).then(function(resp) {

            if (resp.data.error_code === 0) { //validate success
                $scope.lstVinUsuario = resp.data.datos;
                $scope.totalDatosDocumento = resp.data.datos.length;
                $scope.hacerValidacione();

                // $('#interestTable').DataTable().destroy();
                //     setTimeout(function () {
                //         $('#interestTable').DataTable({
                //             dom: '<"html5buttons"B>lTfgitp',
                //             buttons: [{
                //                     extend: 'copy'
                //             }, {
                //                     extend: 'csv'
                //             }, {
                //                     extend: 'excel',
                //                     title: 'ExampleFile'
                //             }, {
                //                     extend: 'pdf',
                //                     title: 'ExampleFile'
                //             }

                //                 , {
                //                     extend: 'print',
                //                     customize: function (win) {
                //                         $(win.document.body).addClass('white-bg');
                //                         $(win.document.body).css('font-size', '10px');
                //                         $(win.document.body).find('table')
                //                             .addClass('compact')
                //                             .css('font-size', 'inherit');
                //                     }
                //             }
                //         ]
                //         });
                //     }, 1000);

            } else {

                console.log(resp + ' error de la condicion')
            }
        }, function(resp) { //catch error
            console.log('Error status: ' + resp.status);

        }, function(evt) {

        });
    };

    $scope.hacerValidacione = function() {
        $('#interestTable').DataTable().destroy();
        $scope.mostrarConcif = true;
        $scope.VinValidados = [];
        $scope.AdeudoPlanPiso = 0;
        $scope.AdeudoDocumento = 0;
        $scope.TotalUnidades = 0;
        $scope.errorr = 0;
        $scope.sumaPPe = 0;
        $scope.sumaPP = 0;
        $scope.lstVinUsuario.forEach(function(lstVinUsuario) {
            for (var h = 0; h < $scope.interesesFinanciera.length; h++) {
                //$scope.sumaPP += 1
                if (lstVinUsuario.vin == $scope.interesesFinanciera[h].vehNumserie) {
                    $scope.VinValidados.push({
                        vinPlanPiso: $scope.interesesFinanciera[h].vehNumserie,
                        vinFinanciera: lstVinUsuario.vin,
                        descModelo: $scope.interesesFinanciera[h].descModelo,
                        totalFinanciera: $scope.interesesFinanciera[h].precioCompra,
                        totalDocumento: lstVinUsuario.total,
                        marca: $scope.interesesFinanciera[h].marca,
                        esquema: $scope.interesesFinanciera[h].esquema,
                        status: ' existe vin',
                        fechaEfectiva: $scope.interesesFinanciera[h].fechaEfectiva
                    });
                    
                    $scope.AdeudoPlanPiso += $scope.interesesFinanciera[h].precioCompra;
                    $scope.AdeudoDocumento += lstVinUsuario.total;
                    $scope.TotalUnidades += 1
                    $scope.interesesFinanciera.splice((h - 1),1);
                } else {
                    
                
                }

            }
            
             if (lstVinUsuario.vin == $scope.VinValidados[($scope.VinValidados.length) - 1].vinFinanciera ) {

                    } else {
                        $scope.VinValidados.push({
                        vinPlanPiso: '',
                        vinFinanciera: lstVinUsuario.vin,
                        descModelo: '',
                        totalFinanciera: 0,
                        totalDocumento: lstVinUsuario.total,
                        marca: '',
                        esquema: '',
                        status: 'no existe vin',
                        fechaEfectiva: ''
                    });
                    }//   
                   

        });
         for (var i = 0; i < $scope.interesesFinanciera.length; i++) {      
            $scope.sumaPP += 1
             $scope.VinValidados.push({
                        vinPlanPiso: $scope.interesesFinanciera[i].vehNumserie,
                        vinFinanciera: '',
                        descModelo: $scope.interesesFinanciera[i].descModelo,
                        totalFinanciera: $scope.interesesFinanciera[i].precioCompra,
                        totalDocumento: '',
                        marca: $scope.interesesFinanciera[i].marca,
                        esquema: $scope.interesesFinanciera[i].esquema,
                        status: ' existe vin',
                        fechaEfectiva: $scope.interesesFinanciera[i].fechaEfectiva
                    });
            }
        setTimeout(function() {
            $('#interestTable').DataTable({
                dom: '<"html5buttons"B>lTfgitp',
                buttons: [{
                        extend: 'copy'
                    }, {
                        extend: 'csv'
                    }, {
                        extend: 'excel',
                        title: 'Conciliacion'
                    }, {
                        extend: 'pdf',
                        title: 'Conciliacion'
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
        
        console.log($scope.VinValidados);
        console.log($scope.errorr)
        console.log($scope.sumaPP + ' pp')
        console.log($scope.sumaPPe + ' ppo')
        console.log($scope.interesesFinanciera.length + ' lista final')
    };

$scope.setClassMargen = function (object) {
        var margen = object.totalFinanciera - object.totalDocumento 

        if (margen <= 0) {
            return 'gridFontRed';
        } else {
            return 'gridFontGreen';
        }
    };
    $scope.getCompany = function() {
        $scope.promise = interestsRepository.getCompany().then(function(result) {
            if (result.data.length > 0) {
                $scope.empresas = result.data;
            } else {
                alertFactory.info("No se encontraron Empresas");
            }
        }, function(error) {
            alertFactory.error("Error al cargar Empresas");
        });
    };

    $scope.seleccionarEmpresa = function(idEmpresa, nombreEmpresa) {
        $scope.idEmpresa = idEmpresa;
        $scope.nombreEmpresa = nombreEmpresa;
        $scope.getFinancieraEmpresa(idEmpresa);
        $scope.idFinanciera = null;
        $scope.subirDocumento = false;
        $scope.mostrarConci = false;
        $scope.mostrarConcif = false;
        totalDatosDocumento = 0;

    };

    $scope.seleccionarFinanciera = function(idFinanciera, nombreFinanciera) {
        $scope.idFinanciera = idFinanciera;
        console.log(idFinanciera + ' financiera')
        $scope.nombreFinanciera = nombreFinanciera;
        console.log($scope.idEmpresa + ' ' + $scope.idFinanciera)
        $scope.getInterestFinanciera($scope.idEmpresa, $scope.idFinanciera)
        $scope.subirDocumento = true;
    }

    $scope.getFinancieraEmpresa = function() {
        $scope.financieras = {};
        $scope.promise = ConciliationRepository.getFinancieraEmpresa($scope.idEmpresa).then(function(result) {
            if (result.data.length > 0) {
                $scope.financieras = result.data;
                console.log(result.data)
            } else {
                alertFactory.info("No se encontraron Financieras");
            }
        }, function(error) {
            alertFactory.error("Error al cargar Financieras");
        });
    };


    $scope.getInterestFinanciera = function() {
        $scope.interes = {};
        $scope.promise =
            interestsRepository.getInterestFinanciera($scope.idEmpresa, $scope.idFinanciera).then(function(result) {
                if (result.data.length > 0) {
                    $scope.interesesFinanciera = result.data;
                    console.log(result.data)

                } else {}
            }, function(error) {
                alertFactory.error("Error al cargar intereses");
            });
    };



    $scope.uploadInvoice = function() {

        //$scope.facturaSubida = true;
    }

    $scope.conciliacion = function() {
        $scope.mostrar = true;
    }
    $scope.concilacionValidar = function() {
        $scope.mostrarConci = true;
        dropzone.processQueue();

    }
    $scope.cerrar = function() {
        $scope.uploadButton = false;
        $scope.closeButton = false;
        dropzone.removeAllFiles();
    }

});
