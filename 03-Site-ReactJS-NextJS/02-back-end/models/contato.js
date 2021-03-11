var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var contato = new Schema({
    nome: {
        type: String
    },
    email: {
        type: String
    },

    assuntoMsg: {
        type: String
    },
    conteudoMsg: {
        type: String
    }
},
    {
        timestamps: true
    }
);

mongoose.model("Contato", contato);