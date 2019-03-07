var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pessoaSchema = new Schema({
    nome: String,
    idade: Number,
    peso: Number
});

module.exports = mongoose.model('Pessoa',pessoaSchema);

