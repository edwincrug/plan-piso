registrationModule.controller('interestsController', function ($scope, alertFactory, interestsRepository) {
    
      $scope.message = 'Buscando...';

    $scope.init = function () {
        $scope.getInterest();
    }
    // Se obtiene los intereses de las unidades
    $scope.getInterest = function () {
      $scope.promise  =  interestsRepository.getInterest().then(function (result) {
            if (result.data.length > 0) {
                $scope.interes = result.data;
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
                alertFactory.success("Clientes cargados");
            } else {
                alertFactory.info("No se encontraron clientes");
            }
        }, function (error) {
            alertFactory.error("Error al cargar clientes");
        });
    };
});