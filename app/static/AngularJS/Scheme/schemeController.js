registrationModule.controller('schemeController', function($scope, $rootScope, alertFactory, schemeRepository, localStorageService) {

    $scope.message = 'Buscando...';
    $scope.userData = localStorageService.get('userData');
    $rootScope.empleadoNombre = "";
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
        $scope.getEmpleados();
        $scope.getFinanciera();
        $scope.getEsquemaFinanciera.show = false;
        //getEmpleado();

        if (localStorageService.get('glbSchemeFinanciera') != null) {
            $scope.seleccionarFinanciera(localStorageService.get('glbSchemeFinanciera'), localStorageService.get('glbSchemeNombre'));
        };

    };

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
                        console.log('pasoaqui')
                        $rootScope.empleadoNombre = $scope.userData[0].nombre;

                    }
                }

            }
        }
        //Obtengo el empleado logueado
        $rootScope.currentEmployee = localStorageService.get('lgnUser');
    };


    // Función para seleccionar las financieras y mostrar la tabla con los esquemas 
    $scope.seleccionarFinanciera = function(idFinanciera, nombreFinanciera) {
        $scope.idFinanciera = idFinanciera;
        $scope.nombreFinanciera = nombreFinanciera;
        $scope.getEsquemaFinanciera();
        $scope.getEsquemaFinanciera.show = true;

        localStorageService.set('glbSchemeFinanciera', $scope.idFinanciera);
        localStorageService.set('glbSchemeNombre', $scope.nombreFinanciera);
    };

    // Función para mostrar las financieras disponibles
    $scope.getFinanciera = function() {
        $scope.financieras = {};
        $('#Financieras').DataTable().destroy();
        $scope.promise = schemeRepository.getFinanciera().then(function(result) {
            if (result.data.length > 0) {
                $scope.financieras = result.data;
                setTimeout(function() {
                    $('#Financieras').DataTable({
                        iDisplayLength: 5,
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
                //alertFactory.success("Financieras cargados");
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
                        order: [
                            [0, "desc"]
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
                alertFactory.success("Esquemas cargados");
            } else {
                $scope.esquemas = [];
                alertFactory.info("No se encontraron Esquemas");
            }
        }, function(error) {
            alertFactory.error("Error al cargar Esquemas");
        });
    };

    // Función para mostrar detalles del esquema
    $scope.getDetalleEsquema = function(idEsquema, esFijo) {

        $scope.promise = schemeRepository.getDetalleEsquema(idEsquema, esFijo).then(function(result) {
            if (result.data.length > 0) {
                $scope.detalleEsquema = result.data;

                if (esFijo) {
                    $scope.inicializarTablaFecha();
                    $scope.checked = false;
                } else {
                    $scope.inicializarTablaRango();
                    $scope.checked = true;
                }

                //alertFactory.success("Detalles cargados");
            } else {
                alertFactory.info("No se encontraron detalles");
            }
        }, function(error) {
            alertFactory.error("Error al cargar detalles");
        });
    };

    // Función para llamar la modal
    $scope.nuevoEsquema = function(idEsquema, esFijo) {
        $scope.lstDateScheme = [];
        $scope.lstRangeScheme = [];
        $scope.checked = false;
        $scope.checkedReduccion = false;
        $scope.checkedMoratorio = false;
        $scope.checkedAmpliar = false;

        $scope.idEsquema = idEsquema;
        $scope.clearControls();
        $scope.clearControlsMain();

        $('#agregarNuevoEsquema').appendTo("body").modal('show');
        $scope.calendario();
        if (idEsquema > 0) {
            $scope.isAddMode = false;
            $scope.getDetalleEsquema(idEsquema, esFijo);
            $scope.titleHeader = "Editar Esquema";
        } else

        {
            $scope.isAddMode = true;
            $scope.titleHeader = "Agregar Esquema";
        }

    };

    $scope.inicializarTablaRango = function() {

        $scope.indexRange = 1;

        for (var i = 0; i < $scope.detalleEsquema.length; i++) {
            var scheme = {
                indexRange: $scope.indexRange,
                diasGracia: $scope.detalleEsquema[i].diasGracia,
                plazo: $scope.detalleEsquema[i].plazo,
                nombre: $scope.detalleEsquema[i].nombre,
                descripcion: $scope.detalleEsquema[i].descripcion,
                tasaInteres: $scope.detalleEsquema[i].tasaInteres,
                rango: $scope.detalleEsquema[i].rango,
                porcentajePenetracion: $scope.detalleEsquema[i].porcentajePenetracion,
                tiie: $scope.detalleEsquema[i].tiie,
                idTiieTipo: $scope.selectedOption.value,
                esPrecarga: true,
                idTipo: $scope.detalleEsquema[i].idTipo
            }

            $scope.lstRangeScheme.push(scheme);
            $scope.indexRange++;
        };



        if ($scope.detalleEsquema.length > 0) {
            $scope.esquema.diasGracia = $scope.detalleEsquema[0].diasGracia;
            $scope.esquema.plazo = $scope.detalleEsquema[0].plazo;
            $scope.esquema.nombre = $scope.detalleEsquema[0].nombre;
            $scope.esquema.descripcion = $scope.detalleEsquema[0].descripcion;
            $scope.esquema.porcentajePagoCapital = $scope.detalleEsquema[0].porcentajePagoCapital;
            $scope.esquema.interesMoratorio = $scope.detalleEsquema[0].interesMoratorio;
        }


    };

    $scope.inicializarTablaFecha = function() {

        $scope.indexDate = 1;

        for (var i = 0; i < $scope.detalleEsquema.length; i++) {


            var scheme = {
                indexDate: $scope.indexDate,
                diasGracia: $scope.detalleEsquema[i].diasGracia,
                plazo: $scope.detalleEsquema[i].plazo,
                nombre: $scope.detalleEsquema[i].nombre,
                descripcion: $scope.detalleEsquema[i].descripcion,
                tasaInteres: $scope.detalleEsquema[i].tasaInteres,
                porcentajePenetracion: $scope.detalleEsquema[i].porcentajePenetracion,
                fechaInicio: $scope.detalleEsquema[i].fechaInicio,
                fechaFin: $scope.detalleEsquema[i].fechaFin,
                tiie: $scope.detalleEsquema[i].tiie,
                idTiieTipo: $scope.selectedOption.value,
                esPrecarga: true,
                idTipo: $scope.detalleEsquema[i].idTipo
            }

            $scope.lstDateScheme.push(scheme);
            $scope.indexDate++;
        }

        if ($scope.detalleEsquema.length > 0) {
            $scope.esquema.diasGracia = $scope.detalleEsquema[0].diasGracia;
            $scope.esquema.plazo = $scope.detalleEsquema[0].plazo;
            $scope.esquema.nombre = $scope.detalleEsquema[0].nombre;
            $scope.esquema.descripcion = $scope.detalleEsquema[0].descripcion;
            $scope.esquema.porcentajePagoCapital = $scope.detalleEsquema[0].porcentajePagoCapital;
            $scope.esquema.interesMoratorio = $scope.detalleEsquema[0].interesMoratorio;
        }

        $scope.sortResults('idTipo', true);

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
            todayHighlight: true,
            format: "dd/mm/yyyy"
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
            // { value: $scope.esquema.porcentajePagoCapital, name: 'Abono Capital', regExp: expresion.decimal1 }
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
        $scope.esquema.porcentajePagoCapital = null;
        $scope.esquema.interesMoratorio = null;
        $scope.esquema.idTipo = null;

    };

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

        if ($scope.dateIsNotOK($scope.esquema.fechaInicio, $scope.esquema.fechaFin, $scope.lstDateScheme)) {
            alertFactory.info("El rango de fechas ya esta contenido en otro. verifique.");
            return;
        }

        var idTipo = 0;

        if ($scope.checkedAmpliar) {
            idTipo = 1;
        }



        var scheme = {
            indexDate: $scope.indexDate++,
            tasaInteres: $scope.esquema.tasaInteres,
            porcentajePenetracion: $scope.esquema.porcentajePenetracion,
            fechaInicio: $scope.esquema.fechaInicio,
            fechaFin: $scope.esquema.fechaFin,
            tiie: $scope.esquema.tiie,
            idTiieTipo: $scope.selectedOption.value,
            esPrecarga: false,
            idTipo: idTipo
        }




        $scope.lstDateScheme.push(scheme);
        $scope.clearControls();
        $scope.sortResults('idTipo', true);
    };

    $scope.dateIsNotOK = function(initDate, endDate, listObj) {
        var isOk = false;

        for (var i = 0; i < listObj.length; i++) {
            isOk = $scope.dateExist(initDate, endDate, listObj[i].fechaInicio, listObj[i].fechaFin);
            if (isOk) break;
        };

        return isOk;

    }

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
            alert("No hay registros");
        }

        $scope.lstDateScheme.splice(index, 1);



    };

    $scope.lstRangeScheme = [];
    $scope.indexRange = 1;

    $scope.addByRange = function() {

        var controlsToValidate = $scope.getControlByRange();

        if (!$scope.formIsValid(controlsToValidate)) return;

        if (!$scope.rangeIsOK($scope.esquema.rango, $scope.lstRangeScheme)) {
            alertFactory.info("El rango no puede exceder a los dias plazo. verifique.");
            return;
        }

        var idTipo = 0;

        if ($scope.checkedAmpliar) {
            idTipo = 1;
        }

        var scheme = {
            indexRange: $scope.indexRange,
            tasaInteres: $scope.esquema.tasaInteres,
            rango: $scope.esquema.rango,
            porcentajePenetracion: $scope.esquema.porcentajePenetracion,
            precedencia: $scope.indexRange++,
            tiie: $scope.esquema.tiie,
            idTiieTipo: $scope.selectedOption.value,
            esPrecarga: false,
            tipo: idTipo
        }


        $scope.lstRangeScheme.push(scheme);
        $scope.clearControls();

    };

    $scope.rangeIsOK = function(newRange, listObj) {

        var sum = 0;

        for (var i = 0; i < listObj.length; i++) {
            sum += parseInt(listObj[i].rango);
        };

        sum += parseInt(newRange);

        if ($scope.esquema.plazo > sum)
            return true;
        else
            return false;

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

        if (index === -1) alert("No hay registros");

        $scope.lstRangeScheme.splice(index, 1);
    };

    $scope.showConfirmSave = function() {

        if ($scope.isAddMode) {
            if (!$scope.formIsValid($scope.getControlMain())) return;
            var r = confirm("¿Estas seguro que deseas guardar?");
            if (r == true) {
                $scope.insertEsquema();
                $('#agregarNuevoEsquema').modal('toggle');
            }
        } else {
            var r = confirm("¿Estas seguro que deseas guardar?");
            if (r == true) {
                if (!$scope.checked) $scope.insertEsquemaFecha($scope.idEsquema);
                else $scope.insertEsquemaRango($scope.idEsquema);
            }
        }

    };

    $scope.showConfirmDelete = function(type, index) {

        var r = confirm("¿Estas seguro que deseas eliminar?");

        if (r == true) {

            if (type == 1) $scope.removeDateRow(index);
            else $scope.removeRangeRow(index);

        } else {
            alertFactory.warning("Cancelado");
        }

    };

    $scope.insertEsquema = function() {

        if (!$scope.formIsValid($scope.getControlMain())) return;

        $scope.esquema.idFinanciera = $scope.idFinanciera;
        $scope.esquema.esFijo = !$scope.checked;

        // console.log($scope.esquema);

        schemeRepository.insertEsquema($scope.esquema).then(function(result) {

            if (result.data.length > 0) {


                if ($scope.esquema.esFijo) $scope.insertEsquemaFecha(result.data[0].id);
                else $scope.insertEsquemaRango(result.data[0].id);

                $scope.clearControlsMain();
                $scope.getEsquemaFinanciera();

                alertFactory.success("Esquema Agregado");
            } else {
                alertFactory.info("Esquema No Agregado");
            }
        }, function(error) {
            alertFactory.error("Error al guardar Esquema");
        });
    };

    $scope.insertEsquemaFecha = function(idEsquema) {

        for (var i = 0; i < $scope.lstDateScheme.length; i++) {

            if ($scope.lstDateScheme[i].esPrecarga == true) {
                continue;
            }


            schemeRepository.insertEsquemaFecha(idEsquema, $scope.lstDateScheme[i]).then(function(result) {
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

        $scope.lstDateScheme = [];
        $scope.indexDate = 1;

    };

    $scope.insertEsquemaRango = function(idEsquema) {

        //console.log($scope.lstRangeScheme) ;


        for (var i = 0; i < $scope.lstRangeScheme.length; i++) {

            if ($scope.lstRangeScheme[i].esPrecarga == true) {
                continue;
            }

            schemeRepository.insertEsquemaRango(idEsquema, $scope.lstRangeScheme[i]).then(function(result) {
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

        $scope.lstRangeScheme = [];
        $scope.indexRange = 1;

    };

    $scope.dateExist = function(newIniDate, newEndDate, oldIniDate, oldEndDate) {

        var splitDateA = newIniDate.split('/');
        var splitDateB = newEndDate.split('/');
        var splitDateC = [];
        var splitDateD = [];


        var day = 0;
        var month = 1;
        var year = 2;


        var dateA = new Date(splitDateA[year], splitDateA[month] - 1, splitDateA[day]);
        var dateB = new Date(splitDateB[year], splitDateB[month] - 1, splitDateB[day]);
        var dateC = null;
        var dateD = null;

        if (oldIniDate.indexOf('/') > -1) {

            splitDateC = oldIniDate.split('/');
            splitDateD = oldEndDate.split('/');
            dateC = new Date(splitDateC[year], splitDateC[month] - 1, splitDateC[day]);
            dateD = new Date(splitDateD[year], splitDateD[month] - 1, splitDateD[day]);


        } else {
            var subC = oldIniDate.substring(0, 10);
            var subD = oldEndDate.substring(0, 10);

            splitDateC = subC.split('-');
            splitDateD = subD.split('-');
            dateC = new Date(splitDateC[0], splitDateC[1] - 1, splitDateC[2]);
            dateD = new Date(splitDateD[0], splitDateD[1] - 1, splitDateD[2]);
        }



        if (!(dateB <= dateC || dateA >= dateD))
            return true; // fecha traslapada
        else
            return false; //feha Ok        
    };

    $scope.abrirModalFinanciera = function() {
        $scope.getFinanciera();
        $('#nuevaFinanciera').appendTo("body").modal('show');
    }

    $scope.agregarNuevaFinanciera = function(nombreFinanciera) {
        $scope.nombreFinancieraNueva = nombreFinanciera;
        if (nombreFinanciera == '' || nombreFinanciera == undefined) {
            console.log('No se puede agregar un campo vacio');
        } else {
            $scope.newFinancial();
            $scope.getFinanciera();
            $scope.financiera.nombre = '';
        }
    }

    $scope.cerrarModalFinanciera = function() {
        if ($scope.nombreFinancieraNueva == '' || $scope.nombreFinancieraNueva == undefined) {
            console.log('vacio');
        } else {
            $scope.financiera.nombre = '';
        }
    }

    $scope.newFinancial = function(nombre) {
        schemeRepository.newFinancial($scope.nombreFinancieraNueva).then(function(result) {
            if (result.data.length > 0) {
                alertFactory.success("Financiera nueva agregada");
                $scope.clearControls();
            } else {
                alertFactory.info("Financiera no agregada");
            }
        }, function(error) {
            alertFactory.error("Error al guardar Financiera");
        });
    };


    $scope.getStringTasaFija = function(value) {
        if (value) return "FECHA";
        else return "RANGO";

    };

    $scope.getStringTipoTiie = function(value) {
        return $scope.lstTiie[value - 1].text;
    };

    $scope.setClass = function(objeto) {


        switch (objeto.idTipo) {
            case 0:
                return 'lazur-bg';
            case 1:
                return 'yellow-bg';
            case 2:
                return 'red-bg';
            default:
                return 'blue-bg';
        }
    };


    $scope.setTitle = function(objeto) {


        switch (objeto.idTipo) {
            case 0:
                return 'Normal';
            case 1:
                return 'Ampliación';
            case 2:
                return 'Moratorio';
            default:
                return 'NA';
        }
    };



    $scope.sortResults = function(prop, asc) {
        $scope.lstDateScheme = $scope.lstDateScheme.sort(function(a, b) {
            if (asc) {
                return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
            } else {
                return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
            }
        });
        // showResults();
    };

    $scope.deleteSchema = function(idEsquema) {

        console.log("cdesf:" + idEsquema);

        schemeRepository.deleteSchema(idEsquema).then(function(result) {
            if (result.data.length > 0) {
                alertFactory.success("Se elimino el esquema");
                $scope.init();
            } else {
                alertFactory.info("No se pudo eliminar");
            }
        }, function(error) {
            alertFactory.error("Error al eliminar Esquema");
        });

    };

    $scope.alertDeleteSchema = function (idEsquema){

        var r = confirm("¿Estas seguro que deseas eliminar el esquema?");

        if (r === true) {
            $scope.deleteSchema(idEsquema);
        } else {
            alertFactory.warning("Cancelado");
        }

    };




});
