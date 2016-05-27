registrationModule.controller('interestsController', function ($scope, alertFactory, interestsRepository) {
    //store an array of free days getting by getFreeDays function  
    $scope.allDays = {};
    $scope.message = 'Buscando...';
    // Primer metodo llamado al cargar la pagína
    $scope.init = function () {
        $scope.getInterest();
        //$scope.Detalle();
    }
    // Metodo para obtiener todos los intereses
    $scope.getInterest = function () {
        $scope.promise  =  interestsRepository.getInterest().then(function (result) {
            if (result.data.length > 0) {
                $scope.interes = result.data;
                $scope.unidades = result.data.length;
                $scope.total = 0;
                setTimeout(function () {
                    $('.dataTables-example').DataTable({
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
                }, 1000);
                for (var i = 0; i < result.data.length; i++) {
                    $scope.total += (result.data[i].interesAcumulado)
                }
                alertFactory.success("Intereses cargados");
            } else {
                alertFactory.info("No se encontraron intereses");
            }
        }, function (error) {
            alertFactory.error("Error al cargar intereses");
        });
    }
});


