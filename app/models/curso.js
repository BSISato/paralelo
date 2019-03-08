var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var cursoSchema = new Schema({
    _id: String,
    nome: String,
    duracao: Number,
    coordenador: String
});

module.exports = mongoose.model('Curso',cursoSchema);