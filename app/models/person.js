var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var alunoSchema = new Schema({
    _id: String,
    ra: String,
    nome: String,
    idade: Number,
    curso_id: String
});

module.exports = mongoose.model('Aluno',alunoSchema);

