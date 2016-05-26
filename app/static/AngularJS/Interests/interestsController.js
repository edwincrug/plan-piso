registrationModule.controller('interestsController', function ($scope, alertFactory, interestsRepository) {
    
    // Primer metodo llamado al cargar la pagína
    $scope.init = function () {
        $scope.getInterest();
    }
    // Metodo para obtiener todos los intereses
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
                alertFactory.success("Intereses cargados");
            } else {
                alertFactory.info("No se encontraron intereses");
            }
        }, function (error) {
            alertFactory.error("Error al cargar intereses");
        });
    };
});