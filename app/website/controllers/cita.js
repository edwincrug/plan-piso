var CitaView = require('../views/cita'),
	CitaModel = require('../models/dataAccess'),
	moment = require('moment');

var Cita = function(conf){
	this.conf = conf || {};

	this.view = new CitaView();
	this.model = new CitaModel({ parameters : this.conf.parameters});

	this.response = function(){
		this[this.conf.funcionalidad](this.conf.req,this.conf.res,this.conf.next);
	}
}

//obtiene el trabajo de la cita
Cita.prototype.get_trabajo_data = function(req, res, next){
	//Objeto que almacena la respuesta
	var object = {};
	//Objeto que envía los parámetros
	var params = {}; 
	//Referencia a la clase para callback
	var self = this;

	//Asigno a params el valor de mis variables
	params.name = 'idCita';
	params.value = req.params.data;
	params.type = 1;
	
	this.model.get('SEL_UNIDAD_TRABAJO',params,function(error,result){
		//Callback
		object.error = error;
		object.result = result[0];
		
		self.view.see(res, object);
	});
}

module.exports = Cita;