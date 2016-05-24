var CalculoView = require('../views/calculo'),
    CalculoModel = require('../models/dataAccess'),
    moment = require('moment');

var Calculo = function(conf) {
    this.conf = conf || {};

    this.view = new CalculoView();
    this.model = new CalculoModel({ parameters: this.conf.parameters });

    this.response = function() {
        this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
    };
};




Calculo.prototype.get_freedays = function(req, res, next) {
    //Con req.query se obtienen los parametros de la url
    //Ejemplo: ?p1=a&p2=b
    //Retorna {p1:'a',p2:'b'}
    //Objeto que envía los parámetros
    //var params = [];
    //Referencia a la clase para callback
    var self = this;

    //asignación de valores mediante parámetros del request
    var params = [];

    this.model.query('SEL_FREE_DAYS_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};




module.exports = Calculo;
