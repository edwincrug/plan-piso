registrationModule.controller('freeDaysController', function($scope, alertFactory, freeDaysRepository) {

    $scope.allDays = {};

    $scope.getFreeDays = function() {


        freeDaysRepository.getFreeDays().then(function(result) {
            if (result.data.length > 0) {
                $scope.allDays = result.data;
                setTimeout(function() {
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

                alertFactory.success("Datos cargados");
            } else {
                alertFactory.info("No se encontraron datos");
            }
        }, function(error) {
            alertFactory.error("Error al cargar datos");
        });

    };
});
