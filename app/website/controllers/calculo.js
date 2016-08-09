var CalculoView = require('../views/calculo'),
    CalculoModel = require('../models/dataAccess'),
    moment = require('moment');

var Calculo = function(conf) {
    this.conf = conf || {};

    this.view = new CalculoView();
    this.model = new CalculoModel({
        parameters: this.conf.parameters
    });

    this.response = function() {
        this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
    };
};

// Se obtine los días de gracia
Calculo.prototype.get_freedays = function(req, res, next) {
    //Con req.query se obtienen los parametros de la url
    //Ejemplo: ?p1=a&p2=b
    //Retorna {p1:'a',p2:'b'}
    //Objeto que envía los parámetros
    //var params = [];
    //Referencia a la clase para callback
    var self = this;
    //asignación de valores mediante parámetros del request
    var params = [{ name: 'nombreEmpresa', value: req.query.nombreEmpresa, type: self.model.types.STRING }];

    this.model.query('SEL_FREE_DAYS_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

Calculo.prototype.get_freedayssucursal = function(req, res, next) {
    //Con req.query se obtienen los parametros de la url
    //Ejemplo: ?p1=a&p2=b
    //Retorna {p1:'a',p2:'b'}
    //Objeto que envía los parámetros
    //var params = [];
    //Referencia a la clase para callback
    var self = this;
    //asignación de valores mediante parámetros del request
    var params = [{ name: 'nombreEmpresa', value: req.query.nombreEmpresa, type: self.model.types.STRING },
        { name: 'nombreSucursal', value: req.query.nombreSucursal, type: self.model.types.STRING }
    ];

    this.model.query('SEL_FREE_DAYS_SUCURSAL_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

// Se optiene los detalles de la unidad  SEL_DETALLE_UNIDAD_ESQUEMA_SP
Calculo.prototype.get_detailsUnit = function(req, res, next) {
    //Con req.query se obtienen los parametros de la url
    //Ejemplo: ?p1=a&p2=b
    //Retorna {p1:'a',p2:'b'}
    //Objeto que envía los parámetros
    //var params = [];
    //Referencia a la clase para callback
    var self = this;

    //asignación de valores mediante parámetros del request
    var params = [{ name: 'vehNumserie', value: req.query.vehNumserie, type: self.model.types.STRING }];

    this.model.query('SEL_DETALLE_UNIDAD_BY_ID_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

// Se optiene los detalles de la unidad  
Calculo.prototype.get_detailsUnitscheme = function(req, res, next) {
    //Con req.query se obtienen los parametros de la url
    //Ejemplo: ?p1=a&p2=b
    //Retorna {p1:'a',p2:'b'}
    //Objeto que envía los parámetros
    //var params = [];
    //Referencia a la clase para callback
    var self = this;

    //asignación de valores mediante parámetros del request
    var params = [{ name: 'vehNumserie', value: req.query.vehNumserie, type: self.model.types.STRING }];

    this.model.query('SEL_DETALLE_UNIDAD_ESQUEMA_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

//insertar nueva tiie
Calculo.prototype.post_addtiie = function(req, res, next) {
        //Referencia a la clase para callback
        var self = this;
        //Asigno a params el valor de mis variables
        var params = [{ name: 'fecha', value: req.body.fecha, type: self.model.types.DATE },
            { name: 'plazo', value: req.body.plazo, type: self.model.types.INT },
            { name: 'monto', value: req.body.monto, type: self.model.types.DECIMAL }
        ];
        this.model.post('INS_TIIE_SP', params, function(error, result) {
            //Callback
            self.view.expositor(res, {
                error: error,
                result: result
            });
        });
    }
    // Se obtine los intereses de las unidades por empresa
Calculo.prototype.get_interest = function(req, res, next) {
    //Con req.query se obtienen los parametros de la url
    //Ejemplo: ?p1=a&p2=b
    //Retorna {p1:'a',p2:'b'}
    //Objeto que envía los parámetros
    //var params = [];
    //Referencia a la clase para callback
    var self = this;
    //asignación de valores mediante parámetros del request
    var params = [{ name: 'idEmpresa', value: req.query.idEmpresa, type: self.model.types.INT }];
    this.model.query('[SEL_INTERES_COMPANY_SP]', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};
//Se obtiene los esquemas 
Calculo.prototype.get_esquemaFinanciera = function(req, res, next) {
    //Con req.query se obtienen los parametros de la url
    //Ejemplo: ?p1=a&p2=b
    //Retorna {p1:'a',p2:'b'}
    //Objeto que envía los parámetros
    //var params = [];
    //Referencia a la clase para callback
    var self = this;
    //asignación de valores mediante parámetros del request
    var params = [{ name: 'idFinanciera', value: req.query.idFinanciera, type: self.model.types.INT }];

    this.model.query('SEL_ESQUEMA_FINACIERA_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};
// Seleccionar los TIIE
Calculo.prototype.get_tiie = function(req, res, next) {
    //Con req.query se obtienen los parametros de la url
    //Ejemplo: ?p1=a&p2=b
    //Retorna {p1:'a',p2:'b'}
    //Objeto que envía los parámetros
    //var params = [];
    //Referencia a la clase para callback
    var self = this;
    //asignación de valores mediante parámetros del request
    var params = [];

    this.model.query('SEL_TIIE_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};
// Mostrar empresas   Cambiada
Calculo.prototype.get_company = function(req, res, next) {
    //Con req.query se obtienen los parametros de la url
    //Ejemplo: ?p1=a&p2=b
    //Retorna {p1:'a',p2:'b'}
    //Objeto que envía los parámetros
    //var params = [];
    //Referencia a la clase para callback
    var self = this;

    //asignación de valores mediante parámetros del request
    var params = [];

    this.model.query('SEL_EMPRESA_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};
// Se obtiene la lista de sucursales por empresa   Cambiada
Calculo.prototype.get_sucursal = function(req, res, next) {
    //Con req.query se obtienen los parametros de la url
    //Ejemplo: ?p1=a&p2=b
    //Retorna {p1:'a',p2:'b'}
    //Objeto que envía los parámetros
    //var params = [];
    //Referencia a la clase para callback
    var self = this;
    //asignación de valores mediante parámetros del request
    var params = [{ name: 'idEmpresa', value: req.query.idEmpresa, type: self.model.types.INT }];
    this.model.query('SEL_SUCURSAL_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};
// Se optiene los intereses por sucursal Cambiada
Calculo.prototype.get_interestsucursal = function(req, res, next) {
    //Con req.query se obtienen los parametros de la url
    //Ejemplo: ?p1=a&p2=b
    //Retorna {p1:'a',p2:'b'}
    //Objeto que envía los parámetros
    var params = [];
    //Referencia a la clase para callback
    var self = this;
    //asignación de valores mediante parámetros del request
    var params = [{ name: 'idEmpresa', value: req.query.idEmpresa, type: self.model.types.INT },
        { name: 'idSucursal', value: req.query.idSucursal, type: self.model.types.INT },
        { name: 'idFinanciera', value: req.query.idFinanciera, type: self.model.types.INT }
    ];
    this.model.query('SEL_INTERES_SUCURSAL_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

// Mostrar financieras por empresa Cambiada
Calculo.prototype.get_financieraselect = function(req, res, next) {
    //Con req.query se obtienen los parametros de la url
    //Ejemplo: ?p1=a&p2=b
    //Retorna {p1:'a',p2:'b'}
    //Objeto que envía los parámetros
    //var params = [];
    //Referencia a la clase para callback
    var self = this;
    //asignación de valores mediante parámetros del request
    var params = [{ name: 'idEmpresa', value: req.query.idEmpresa, type: self.model.types.INT }];
    this.model.query('SEL_RESUMEN_FINANCIERA_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

// Se optiene los detalles de las financieras por empresa
Calculo.prototype.get_interestfinanciera = function(req, res, next) {
    //Con req.query se obtienen los parametros de la url
    //Ejemplo: ?p1=a&p2=b
    //Retorna {p1:'a',p2:'b'}
    //Objeto que envía los parámetros
    //var params = [];
    //Referencia a la clase para callback
    var self = this;
    //asignación de valores mediante parámetros del request
    var params = [{ name: 'idEmpresa', value: req.query.idEmpresa, type: self.model.types.STRING },
        { name: 'idFinanciera', value: req.query.idFinanciera, type: self.model.types.STRING }
    ];

    this.model.query('SEL_INTERES_FINANCIERA_SP', params, function(error, result) {

        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

// SE valida que el usuario sea correcto
Calculo.prototype.get_validaUsuario = function(req, res, next) {
    //Con req.query se obtienen los parametros de la url
    //Ejemplo: ?p1=a&p2=b
    //Retorna {p1:'a',p2:'b'}
    //Objeto que envía los parámetros
    //var params = [];
    //Referencia a la clase para callback
    var self = this;
    //asignación de valores mediante parámetros del request
    var params = [{ name: 'usuario', value: req.query.usuario, type: self.model.types.STRING },
        { name: 'password', value: req.query.password, type: self.model.types.STRING }
    ];
    this.model.query('SEL_VALIDA_USUARIO_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

// Muestra todas las financieras
Calculo.prototype.get_financiera = function(req, res, next) {
    //Con req.query se obtienen los parametros de la url
    //Ejemplo: ?p1=a&p2=b
    //Retorna {p1:'a',p2:'b'}
    //Objeto que envía los parámetros
    //var params = [];
    //Referencia a la clase para callback
    var self = this;

    //asignación de valores mediante parámetros del request
    var params = [];

    this.model.query('SEL_FINANCIERAS_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

// Muestra los detalles de los esquemas
Calculo.prototype.get_detalleEsquema = function(req, res, next) {
    //Con req.query se obtienen los parametros de la url
    //Ejemplo: ?p1=a&p2=b
    //Retorna {p1:'a',p2:'b'}
    //Objeto que envía los parámetros
    //var params = [];
    //Referencia a la clase para callback
    var self = this;
    //asignación de valores mediante parámetros del request
    var params = [{ name: 'idEsquema', value: req.query.idEsquema, type: self.model.types.INT },
        { name: 'esfijo', value: req.query.esfijo, type: self.model.types.STRING }
    ];
    this.model.query('SEL_DETALLE_ESQUEMA_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

// inserta un nuevo esquema
Calculo.prototype.post_insertesquema = function(req, res, next) {
    //Objeto que almacena la respuesta
    var object = {};

    var params = {};
    //Referencia a la clase para callback
    var self = this;
    //Objeto que envía los parámetros
    //Asigno a params el valor de mis variables

    var params = [{ name: 'diasGracia', value: req.body.diasGracia, type: self.model.types.DECIMAL },
        { name: 'plazo', value: req.body.plazo, type: self.model.types.DECIMAL },
        { name: 'idFinanciera', value: req.body.idFinanciera, type: self.model.types.INT },
        { name: 'nombre', value: req.body.nombre, type: self.model.types.STRING },
        { name: 'descripcion', value: req.body.descripcion, type: self.model.types.STRING },
        { name: 'esFijo', value: req.body.esFijo, type: self.model.types.STRING },
        { name: 'abonoCapital', value: req.body.abonoCapital, type: self.model.types.INT }
    ];

    this.model.post('INS_ESQUEMA_SP', params, function(error, result) {
        //Callback

        self.view.expositor(res, {
            error: error,
            result: result
        });

    });
}

// Actualiza la financiera y el esquema de una unidad
Calculo.prototype.post_updatescheme = function(req, res, next) {
    //Objeto que almacena la respuesta
    var object = {};

    var params = {};
    //Referencia a la clase para callback
    var self = this;
    //Objeto que envía los parámetros
    //Asigno a params el valor de mis variables

    var params = [{ name: 'idEsquema', value: req.body.idEsquema, type: self.model.types.INT },
        { name: 'vehNumserie', value: req.body.vehNumserie, type: self.model.types.STRING }
    ];
    this.model.post('UPD_ESQUENA_UNIDAD_SP', params, function(error, result) {
        //Callback

        self.view.expositor(res, {
            error: error,
            result: result
        });

    });
}

// Muestra los detalles de los esquemas por unidad
Calculo.prototype.get_detalleEsquemaunidad = function(req, res, next) {
    //Con req.query se obtienen los parametros de la url
    //Ejemplo: ?p1=a&p2=b
    //Retorna {p1:'a',p2:'b'}
    //Objeto que envía los parámetros
    //var params = [];
    //Referencia a la clase para callback
    var self = this;
    //asignación de valores mediante parámetros del request
    var params = [{ name: 'idEsquema', value: req.query.idEsquema, type: self.model.types.INT }];
    this.model.query('SEL_DETALLE_ESQUEMA_UNIDAD_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

// Muestra los detalles de los esquemas por unidad
Calculo.prototype.get_detalleunidadesquema = function(req, res, next) {
    //Con req.query se obtienen los parametros de la url
    //Ejemplo: ?p1=a&p2=b
    //Retorna {p1:'a',p2:'b'}
    //Objeto que envía los parámetros
    //var params = [];
    //Referencia a la clase para callback
    var self = this;
    //asignación de valores mediante parámetros del request
    var params = [{ name: 'vehNumserie', value: req.query.vehNumserie, type: self.model.types.STRING }];
    this.model.query('SP_DETALLE_UNIDAD_ESQUEMA_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

Calculo.prototype.post_insertesquemarango = function(req, res, next) {
    //Objeto que almacena la respuesta
    var object = {};

    var params = {};
    //Referencia a la clase para callback
    var self = this;
    //Objeto que envía los parámetros
    //Asigno a params el valor de mis variables

    var params = [{ name: 'idEsquema', value: req.body.idEsquema, type: self.model.types.INT },
        { name: 'tasaInteres', value: req.body.tasaInteres, type: self.model.types.DECIMAL },
        { name: 'rango', value: req.body.rango, type: self.model.types.INT },
        { name: 'precedencia', value: req.body.precedencia, type: self.model.types.INT },
        { name: 'porcentajePenetracion', value: req.body.porcentajePenetracion, type: self.model.types.DECIMAL },
        { name: 'idTiieTipo', value: req.body.idTiieTipo, type: self.model.types.INT },
        { name: 'tiie', value: req.body.tiie, type: self.model.types.DECIMAL }

    ];
    this.model.post('INS_ESQUEMA_RANGO_SP', params, function(error, result) {
        //Callback

        self.view.expositor(res, {
            error: error,
            result: result
        });

    });
};

Calculo.prototype.post_insertesquemafecha = function(req, res, next) {
    //Objeto que almacena la respuesta
    var object = {};

    var params = {};
    //Referencia a la clase para callback
    var self = this;
    //Objeto que envía los parámetros
    //Asigno a params el valor de mis variables


    var params = [{ name: 'idEsquema', value: req.body.idEsquema, type: self.model.types.INT },
        { name: 'tasaInteres', value: req.body.tasaInteres, type: self.model.types.DECIMAL },
        { name: 'fechaInicio', value: req.body.fechaInicio, type: self.model.types.STRING },
        { name: 'fechaFin', value: req.body.fechaFin, type: self.model.types.STRING },
        { name: 'porcentajePenetracion', value: req.body.porcentajePenetracion, type: self.model.types.DECIMAL },
        { name: 'idTiieTipo', value: req.body.idTiieTipo, type: self.model.types.INT },
        { name: 'tiie', value: req.body.tiie, type: self.model.types.DECIMAL }

    ];




    this.model.post('INS_ESQUEMA_FIJO_SP', params, function(error, result) {
        //Callback

        self.view.expositor(res, {
            error: error,
            result: result
        });

    });
};

// Agrega una nueva financiera
Calculo.prototype.post_newfinancial = function(req, res, next) {
    //Objeto que almacena la respuesta
    var object = {};

    var params = {};
    //Referencia a la clase para callback
    var self = this;
    //Objeto que envía los parámetros
    //Asigno a params el valor de mis variables

    var params = [{ name: 'nombre', value: req.body.nombre, type: self.model.types.STRING }];
    this.model.post('INS_FINANCIERA_SP', params, function(error, result) {
        //Callback

        self.view.expositor(res, {
            error: error,
            result: result
        });

    });
}

// Muestra los detalles de pagos
Calculo.prototype.get_paymentreport = function(req, res, next) {

    var self = this;
    //asignación de valores mediante parámetros del request
    var params = [{ name: 'idStatus', value: req.query.idStatus, type: self.model.types.INT }];


    this.model.query('SEL_LOTE_PAGO_REPORTE_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

// Muestra los detalles de pagos
Calculo.prototype.get_paymentreportdetail = function(req, res, next) {

    var self = this;
    //asignación de valores mediante parámetros del request
    var params = [{ name: 'idLote', value: req.query.idLote, type: self.model.types.INT }];

    this.model.query('SEL_LOTE_PAGO_REPORTE_DETALLE_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};



// Actualiza los pagos modificados por el ususario 
Calculo.prototype.post_updateusrpayment = function(req, res, next) {
    //Objeto que almacena la respuesta
    var object = {};

    var params = {};
    //Referencia a la clase para callback
    var self = this;
    //Objeto que envía los parámetros
    //Asigno a params el valor de mis variables

    var params = [{ name: 'idDetallePago', value: req.body.idDetallePago, type: self.model.types.INT },
        { name: 'monto', value: req.body.monto, type: self.model.types.INT }
    ];

    this.model.post('UPD_USR_PAYMENT', params, function(error, result) {
        //Callback

        self.view.expositor(res, {
            error: error,
            result: result
        });

    });
};




// Se obtine los intereses de las unidades por empresa y sucursal
Calculo.prototype.get_interestcompanysucursal = function(req, res, next) {
    //Con req.query se obtienen los parametros de la url
    //Ejemplo: ?p1=a&p2=b
    //Retorna {p1:'a',p2:'b'}
    //Objeto que envía los parámetros
    //var params = [];
    //Referencia a la clase para callback
    var self = this;
    //asignación de valores mediante parámetros del request
    var params = [{ name: 'idEmpresa', value: req.query.idEmpresa, type: self.model.types.INT },
        { name: 'idSucursal', value: req.query.idSucursal, type: self.model.types.INT }
    ];
    this.model.query('[SEL_INTERES_COMPANY_SUCURSAL_SP]', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

// Se muestran las unidades nuevas que no tienen un esquema asignado
Calculo.prototype.get_newUnits = function(req, res, next) {

    var self = this;
    //asignación de valores mediante parámetros del request
    var params = [];

    this.model.query('SEL_UNIDADES_NUEVAS_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

// Muestra las unidades nuevas que no tienen esquema asignado
Calculo.prototype.get_newUnitsCompany = function(req, res, next) {

    var self = this;
    //asignación de valores mediante parámetros del request
    var params = [{ name: 'idEmpresa', value: req.query.idEmpresa, type: self.model.types.INT }];

    this.model.query('SEL_UNIDADES_NUEVAS_EMPRESA_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

// Muestra las unidades sin esquema por sucursal
Calculo.prototype.get_newUnitsSucursal = function(req, res, next) {

    var self = this;
    //asignación de valores mediante parámetros del request
    var params = [{ name: 'idEmpresa', value: req.query.idEmpresa, type: self.model.types.INT },
        { name: 'idSucursal', value: req.query.idSucursal, type: self.model.types.INT }
    ];

    this.model.query('SEL_UNIDADES_NUEVAS_SUCURSAL_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

// Actualiza el esquema nuevo a las unidades nuevas
Calculo.prototype.post_updateschemenews = function(req, res, next) {
    //Objeto que almacena la respuesta
    var object = {};

    var params = {};
    //Referencia a la clase para callback
    var self = this;
    //Objeto que envía los parámetros
    //Asigno a params el valor de mis variables

    var params = [{ name: 'idEsquema', value: req.body.idEsquema, type: self.model.types.INT },
        { name: 'vehNumserie', value: req.body.vehNumserie, type: self.model.types.STRING }
    ];
    this.model.post('UPD_ESQUEMA_UNIDAD_NUEVA_SP', params, function(error, result) {
        //Callback

        self.view.expositor(res, {
            error: error,
            result: result
        });

    });
}

// Muestra los detalles de los movimientos de las unidades
Calculo.prototype.get_unitsdetailspayment = function(req, res, next) {

    var self = this;
    //asignación de valores mediante parámetros del request
    var params = [{ name: 'idUnidad', value: req.query.idUnidad, type: self.model.types.INT }];

    this.model.query('SEL_UNIDAD_DETALLE_PAGO_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

// Agrega un movimiento por traspaso financiero
Calculo.prototype.post_insertmovementfinancial = function(req, res, next) {
    //Objeto que almacena la respuesta
    var object = {};

    var params = {};
    //Referencia a la clase para callback
    var self = this;
    //Objeto que envía los parámetros
    //Asigno a params el valor de mis variables


    var params = [{ name: 'idUnidad', value: req.body.idUnidad, type: self.model.types.INT },
        { name: 'idFinanciera', value: req.body.idFinanciera, type: self.model.types.DECIMAL },
        { name: 'fecha', value: req.body.fecha, type: self.model.types.STRING },
        { name: 'cargo', value: req.body.cargo, type: self.model.types.DECIMAL },
        { name: 'abono', value: req.body.abono, type: self.model.types.DECIMAL }
    ];
    this.model.post('INS_MOVIMIENTO_TRASPASO_FINANCIERO_ABONO_SP', params, function(error, result) {

        //Callback

        self.view.expositor(res, {
            error: error,
            result: result
        });

    });
};

// Agrega un movimiento por cambio de esquema
Calculo.prototype.post_insertmovementscheme = function(req, res, next) {
    //Objeto que almacena la respuesta
    var object = {};

    var params = {};
    //Referencia a la clase para callback
    var self = this;
    //Objeto que envía los parámetros
    //Asigno a params el valor de mis variables

    var params = [{ name: 'idUnidad', value: req.body.idUnidad, type: self.model.types.INT },
        { name: 'idFinanciera', value: req.body.idFinanciera, type: self.model.types.DECIMAL },
        { name: 'fecha', value: req.body.fecha, type: self.model.types.STRING },
        { name: 'cargo', value: req.body.cargo, type: self.model.types.DECIMAL },
        { name: 'abono', value: req.body.abono, type: self.model.types.DECIMAL }
    ];
    this.model.post('INS_MOVIMIENTO_ESQUEMA_SP', params, function(error, result) {
        //Callback

        self.view.expositor(res, {
            error: error,
            result: result
        });

    });
};

// Agrega un movimiento por traspaso financiero
Calculo.prototype.post_insertmovementfinancialdebit = function(req, res, next) {
    //Objeto que almacena la respuesta
    var object = {};

    var params = {};
    //Referencia a la clase para callback
    var self = this;
    //Objeto que envía los parámetros
    //Asigno a params el valor de mis variables

    var params = [{ name: 'idUnidad', value: req.body.idUnidad, type: self.model.types.INT },
        { name: 'idFinanciera', value: req.body.idFinanciera, type: self.model.types.DECIMAL },
        { name: 'fecha', value: req.body.fecha, type: self.model.types.STRING },
        { name: 'cargo', value: req.body.cargo, type: self.model.types.DECIMAL },
        { name: 'abono', value: req.body.abono, type: self.model.types.DECIMAL }
    ];
    this.model.post('INS_MOVIMIENTO_TRASPASO_FINANCIERO_CARGO_SP', params, function(error, result) {
        //Callback

        self.view.expositor(res, {
            error: error,
            result: result
        });

    });
};

module.exports = Calculo;
