var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var cursoSchema = new Schema({
    _id: String,
    nome: String,
    duracao: Number,
    coordenador: String,
    coordenador_adjunto: String
});

module.exports = mongoose.model('Curso',cursoSchema);