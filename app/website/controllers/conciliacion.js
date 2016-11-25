var ConciliacionView = require('../views/conciliacion'),
    ConciliacionModel = require('../models/dataAccess'),
    moment = require('moment')
multer = require('multer'),
    uuid = require('uuid'),
    xlsx = require('node-xlsx');
const fs = require('fs');



var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './app/static/files/')
    },
    filename: function(req, file, cb) {
        console.log(file)
        cb(null, uuid.v4() + ".xlsx")
    }
})

var upload = multer({ //multer settings
    storage: storage
}).single('file');



var Conciliacion = function(conf) {
    this.conf = conf || {};
    this.view = new ConciliacionView();
    this.model = new ConciliacionModel({
        parameters: this.conf.parameters
    });
    this.response = function() {
        this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
    }
}


Conciliacion.prototype.post_files = function(req, res, next) {
    var self = this;
    //Cargo el archivo
    //console.log(req.params.data);
    upload(req, res, function(err) {
        var obj = xlsx.parse('app/static/files/' + req.file.filename); // parses a file
        var obj = xlsx.parse(fs.readFileSync('app/static/files/' + req.file.filename));
        var totalPos = 0;
        var totalNeg = 0;
        var datos = []

        for (var i = 0; i < obj[0].data.length; i++) {
            if (obj[0].data[i].length >= 2 && (obj[0].data[i][0] != null || obj[0].data[i][0] != undefined) && (obj[0].data[i][1] != null || obj[0].data[i][1] != undefined) && obj[0].data[i][0].length == 17) {
                totalPos += 1
                datos.push({
                    vin: obj[0].data[i][0],
                    total: obj[0].data[i][1]
                })

            } else {
                totalNeg += 1
            }
        }
        if (err) {
            res.json({
                error_code: 1,
                err_desc: err
            });
            return;
        }
        res.json({
            error_code: 0,
            err_desc: null,
            datos: datos
        });

        fs.stat('app/static/files/' + req.file.filename, function(err, stats) {

            if (err) {
                return console.error(err);
            }

            fs.unlink('app/static/files/' + req.file.filename, function(err) {
                // if (err) return console.log(err);
                // console.log('file deleted successfully');
            });
        });
    })
}



//Conciliacion.prototype.get_excelDatosValidos = function(req, res, next) {

// var obj = xlsx.parse('app/static/files' + '/Libro1.xlsx'); // parses a file
// var obj = xlsx.parse(fs.readFileSync('app/static/files' + '/Libro1.xlsx'));
// var totalPos = 0;
// var totalNeg = 0;
// var datos = []

//      for (var i = 0; i < obj[0].data.length; i++) { 
//             if(obj[0].data[i].length >= 2  &&  (obj[0].data[i][0] != null || obj[0].data[i][0] != undefined ) &&  (obj[0].data[i][1] != null || obj[0].data[i][1] != undefined) && obj[0].data[i][0].length == 17){
//                 totalPos += 1
//                 datos.push({
//                             vin:obj[0].data[i][0],
//                             total: obj[0].data[i][1]
//                             })

//             }else{
//                 totalNeg +=1
//             }
//     }

// console.log(obj[0].data.length)
// console.log(obj[0].data[1][0].length+ ' tamaño')
// console.log(totalPos + '  total disponibles')
// console.log(totalNeg + '  total nulos')
// console.log(datos.length)
//};

// Muestra  los movimientos Mensuales de las unidades
Conciliacion.prototype.get_financieraEmpresa = function(req, res, next) {

    var self = this;
    //asignación de valores mediante parámetros del request
    var params = [{ name: 'idEmpresa', value: req.query.idEmpresa, type: self.model.types.INT }];

    this.model.query('SEL_FINANCIERAS_BY_EMPRESA_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

module.exports = Conciliacion;
