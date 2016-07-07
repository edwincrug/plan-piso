registrationModule.controller('schemeController', function($scope, alertFactory, schemeRepository) {

    $scope.message = 'Buscando...';
    $scope.tasaFecha = '';
    $scope.tasaRango = '';
    $scope.esquema = [];

    $scope.lstTiie = [
        { value: 1, text: 'TIIE Actual' },
        { value: 2, text: 'TIIE Promedio' },
        { value: 3, text: 'TIIE Fija' }
    ];

    $scope.selectedOption = $scope.lstTiie[0];

    // Primer metodo llamado al cargar la pagína
    $scope.init = function() {
        $scope.getFinanciera();
        $scope.getEsquemaFinanciera.show = false;
    };
    // Función para seleccionar las financieras y mostrar la tabla con los esquemas 
    $scope.seleccionarFinanciera = function(idFinanciera, nombreFinanciera) {
        $scope.idFinanciera = idFinanciera;
        $scope.nombreFinanciera = nombreFinanciera;
        $scope.getEsquemaFinanciera();
        $scope.getEsquemaFinanciera.show = true;
    };
    // Función para mostrar las financieras disponibles
    $scope.getFinanciera = function() {
        $scope.promise = schemeRepository.getFinanciera().then(function(result) {
            if (result.data.length > 0) {
                $scope.financieras = result.data;
                alertFactory.success("financieras cargados");
            } else {
                alertFactory.info("No se encontraron financieras");
            }
        }, function(error) {
            alertFactory.error("Error al cargar financieras");
        });
    };




    // Metodo para mostrar los esquemas por financiera
    $scope.getEsquemaFinanciera = function() {
        $('#esquemasFinanciera').DataTable().destroy();
        $scope.promise = schemeRepository.getEsquemaFinanciera($scope.idFinanciera).then(function(result) {
            if (result.data.length > 0) {
                $scope.esquemas = result.data;
                setTimeout(function() {
                    $('#esquemasFinanciera').DataTable({
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
                alertFactory.success("Esquemas cargados");
            } else {
                alertFactory.info("No se encontraron Esquemas");
            }
        }, function(error) {
            alertFactory.error("Error al cargar Esquemas");
        });
    }

    // Función para mostrar detalles del esquema
    $scope.getDetalleEsquema = function(idEsquema, esFijo) {

        $scope.promise = schemeRepository.getDetalleEsquema(idEsquema, esFijo).then(function(result) {
            if (result.data.length > 0) {
                $scope.detalleEsquema = result.data;
                if(esFijo) $scope.inicializarTablaFecha();
                 else $scope.inicializarTablaRango();
                
                alertFactory.success("destalles cargados");
            } else {
                alertFactory.info("No se encontraron destalles");
            }
        }, function(error) {
            alertFactory.error("Error al cargar destalles");
        });
    }

    // Función para llamar la modal
    $scope.nuevoEsquema = function(idEsquema, esFijo) {
        $scope.lstDateScheme = [];
        $scope.lstRangeScheme =[];

        $('#agregarNuevoEsquema').appendTo("body").modal('show');
        $scope.calendario();
        if(idEsquema > 0 ) $scope.getDetalleEsquema(idEsquema, esFijo);
    };


    $scope.inicializarTablaRango = function() {


        for (var i = 0; i < $scope.detalleEsquema.length; i++) {
            var scheme = {
                indexRange: $scope.indexRange++,
                diasGracia: $scope.detalleEsquema[i].diasGracia,
                plazo: $scope.detalleEsquema[i].plazo,
                nombre: $scope.detalleEsquema[i].nombre,
                descripcion: $scope.detalleEsquema[i].descripcion,
                tasaInteres: $scope.detalleEsquema[i].tasaInteres,
                rango: $scope.detalleEsquema[i].rango,                
                porcentajePenetracion: $scope.detalleEsquema[i].porcentajePenetracion,
                idTiieTipo: $scope.selectedOption.value,
                esPrecarga: true
            }

            $scope.lstRangeScheme.push(scheme);
            //console.log(scheme);
        };
    };




    $scope.inicializarTablaFecha = function() {    

        for (var i = 0; i < $scope.detalleEsquema.length; i++) {


            var scheme = {
                indexDate: $scope.indexDate++,
                diasGracia: $scope.detalleEsquema[i].diasGracia,
                plazo: $scope.detalleEsquema[i].plazo,
                nombre: $scope.detalleEsquema[i].nombre,
                descripcion: $scope.detalleEsquema[i].descripcion,
                tasaInteres: $scope.detalleEsquema[i].tasaInteres,
                porcentajePenetracion: $scope.detalleEsquema[i].porcentajePenetracion,
                fechaInicio: $scope.detalleEsquema[i].fechaInicio,
                fechaFin: $scope.detalleEsquema[i].fechaFin,
                tiie: $scope.detalleEsquema[i].tiie,
                esPrecarga: true
            }

            $scope.lstDateScheme.push(scheme);
        }

    };



    // Función para cerrar la modal
    $scope.cerrar = function() {
        $('#inicioModal').modal('toggle');
    };
    // Función para cargar calendario
    $scope.calendario = function() {
        $('#calendar .input-group.date').datepicker({
            todayBtn: "linked",
            keyboardNavigation: true,
            forceParse: false,
            calendarWeeks: true,
            autoclose: true,
            todayHighlight: true
        });
    }


    //Expresiones Regulares 
    var expresion = {
        todo: '.',
        entero: '^\\d+$',
        entero1: '^\\d{1,3}$',
        decimal: '^-?[0-9]+([,\\.][0-9]*)?$',
        decimal1: '^\\d{1,2}(\\.\\d{1,4})?$'

    };




    $scope.getControlMain = function() {

        var controlesPorRango = [
            { value: $scope.esquema.diasGracia, name: 'Días de gracia', regExp: expresion.entero1 },
            { value: $scope.esquema.plazo, name: 'Plazo', regExp: expresion.entero1 },
            { value: $scope.esquema.nombre, name: 'Nombre', regExp: expresion.todo },
            { value: $scope.esquema.descripcion, name: 'Descripción', regExp: expresion.todo }            
        ];

        return controlesPorRango;
    };



    $scope.getControlByRange = function() {

        var controlesPorRango = [
            { value: $scope.esquema.tasaInteres, name: 'Tasa interes', regExp: expresion.decimal1 },
            { value: $scope.esquema.rango, name: 'Rango', regExp: expresion.entero1 },            
            { value: $scope.esquema.porcentajePenetracion, name: 'Porcentaje penetración', regExp: expresion.decimal1 },
            { value: $scope.esquema.tiie, name: 'TIIE', regExp: expresion.decimal1 },
            { value: $scope.selectedOption.value, name: 'TIIE tipo', regExp: expresion.entero1 }
        ];

        return controlesPorRango;
    };


    $scope.getControlByDate = function() {
        var controlesPorFecha = [            
            { value: $scope.esquema.tasaInteres, name: 'Tasa interes', regExp: expresion.decimal1 },
            { value: $scope.esquema.porcentajePenetracion, name: 'Porcentaje penetración', regExp: expresion.decimal1 },
            { value: $scope.esquema.fechaInicio, name: 'Fecha inicio', regExp: expresion.todo },
            { value: $scope.esquema.fechaFin, name: 'Fecha fin', regExp: expresion.todo },
            { value: $scope.esquema.tiie, name: 'TIIE', regExp: expresion.decimal1 },
            { value: $scope.selectedOption.value, name: 'TIIE tipo', regExp: expresion.entero1 }
        ];

        return controlesPorFecha;
    };




    $scope.formIsValid = function(controls) {

        var esValido = false;

        for (i = 0; i < controls.length; i++) {

            if (controls[i].value == null || controls[i].value == '') {
                alertFactory.info(controls[i].name + ' es requerido');
                esValido = false;
                break;
            }

            var pattern = new RegExp(controls[i].regExp);

            if (pattern.test(controls[i].value) == false) {
                alertFactory.info(controls[i].name + ' formato no correcto');
                esValido = false;
                break;
            }

            esValido = true;
        }

        return esValido;

    };


$scope.clearControlsMain = function() {
        $scope.esquema.diasGracia = null;
        $scope.esquema.plazo = null;
        $scope.esquema.nombre = null;
        $scope.esquema.descripcion = null;
    }


    $scope.clearControls = function() {
        $scope.esquema.tasaInteres = null;
        $scope.esquema.rango = null;        
        $scope.esquema.porcentajePenetracion = null;
        $scope.esquema.idTiieTipo = null;
        $scope.esquema.fechaInicio = null;
        $scope.esquema.fechaFin = null;
        $scope.esquema.tiie = null;
    };



    $scope.lstDateScheme = [];
    $scope.indexDate = 1;

    $scope.addByDate = function() {

        var controlsToValidate = $scope.getControlByDate();

        if (!$scope.formIsValid(controlsToValidate)) return;


        var scheme = {
            indexDate: $scope.indexDate++,            
            tasaInteres: $scope.esquema.tasaInteres,
            porcentajePenetracion: $scope.esquema.porcentajePenetracion,
            fechaInicio: $scope.esquema.fechaInicio,
            fechaFin: $scope.esquema.fechaFin,
            tiie: $scope.esquema.tiie,
            idTiieTipo: $scope.selectedOption.value,
            esPrecarga: true
        }


        $scope.lstDateScheme.push(scheme);
        $scope.clearControls();
    };


    $scope.removeDateRow = function(value) {

        var index = -1;
        var dataArr = eval($scope.lstDateScheme);

        for (var i = 0; i < dataArr.length; i++) {
            if (dataArr[i].indexDate === value) {
                index = i;
                break;
            }
        }
        if (index === -1) {
            alert("Something gone wrong");
        }

        $scope.lstDateScheme.splice(index, 1);



    };


    $scope.lstRangeScheme = [];
    $scope.indexRange = 1;

    $scope.addByRange = function() {

        var controlsToValidate = $scope.getControlByRange();

        if (!$scope.formIsValid(controlsToValidate)) return;


        var scheme = {
            indexRange: $scope.indexRange,           
            tasaInteres: $scope.esquema.tasaInteres,
            rango: $scope.esquema.rango,            
            porcentajePenetracion: $scope.esquema.porcentajePenetracion,
            precedencia:$scope.indexRange++,  
            tiie: $scope.esquema.tiie,
            idTiieTipo: $scope.selectedOption.value,
            esPrecarga: true
        }


        $scope.lstRangeScheme.push(scheme);
        $scope.clearControls();

    };


    $scope.removeRangeRow = function(value) {

        var index = -1;
        var dataArr = eval($scope.lstRangeScheme);

        for (var i = 0; i < dataArr.length; i++) {
            if (dataArr[i].indexRange === value) {
                index = i;
                break;
            }
        }
        if (index === -1) {
            alert("Something gone wrong");
        }

        $scope.lstRangeScheme.splice(index, 1);


    };



    $scope.showConfirmSave = function() {

        if (!$scope.formIsValid($scope.getControlMain())) return;
        var r = confirm("¿Estas seguro que deseas guardar?");
        if (r == true) $scope.insertEsquema();

    };





    $scope.showConfirmDelete = function(type, index) {

        var r = confirm("¿Estas seguro que deseas eliminar?");

        if (r == true) {
            $scope.removeDateRow(index);
            alertFactory.success("Eliminado");
        } else {
            alertFactory.warning("Cancelado");
        }


    };


    $scope.insertEsquema = function() 
    {   

                
        if (!$scope.formIsValid($scope.getControlMain())) return;

        $scope.esquema.idFinanciera = $scope.idFinanciera;
        $scope.esquema.esFijo = !$scope.checked;

        schemeRepository.insertEsquema($scope.esquema).then(function(result) {

            if (result.data.length > 0) {
                
                
                alertFactory.success("Esquema Agregado");

                if($scope.esquema.esFijo)
                {
                    $scope.insertEsquemaFecha(result.data[0].id); 
                }
                else{
                    $scope.insertEsquemaRango(result.data[0].id); 
                }
            
                $scope.clearControlsMain();
                $scope.getEsquemaFinanciera();
            } else {
                alertFactory.info("Esquema No Agregado");
            }
        }, function(error) {
            alertFactory.error("Error al guardar Esquema");
        });


    };


    $scope.insertEsquemaFecha = function(idEsquema) 
    {

            for (var i = 0; i < $scope.lstDateScheme.length; i++) {                

                    schemeRepository.insertEsquemaFecha(idEsquema,$scope.lstDateScheme[i]).then(function(result) {
                        if (result.data.length > 0) {
                            alertFactory.success("Detalle Esquema Agregado");
                            $scope.clearControls();                            
                        } else {
                            alertFactory.info("Detalle Esquema No Agregado");
                        }
                        }, function(error) {
                            alertFactory.error("Error al guardar Esquema");
                    });

            };

        $scope.lstDateScheme= [];

    };



    $scope.insertEsquemaRango = function(idEsquema)
    {

            for (var i = 0; i < $scope.lstRangeScheme.length; i++) {

                    schemeRepository.insertEsquemaRango(idEsquema,$scope.lstRangeScheme[i]).then(function(result) {
                        if (result.data.length > 0) {
                            alertFactory.success("Detalle Esquema Agregado");
                            $scope.clearControls();                            
                        } else {
                            alertFactory.info("Detalle Esquema No Agregado");
                        }
                        }, function(error) {
                            alertFactory.error("Error al guardar Esquema");
                    });

            };

        $scope.lstRangeScheme= [];

    };







});
