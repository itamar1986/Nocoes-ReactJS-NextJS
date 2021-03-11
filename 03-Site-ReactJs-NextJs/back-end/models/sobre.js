var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var sobre = new Schema({
    titulo: {
        type: String
    },
    descricao: {
        type: String
    },

    originalName: {
        type: String
    },
    fileName: {
        type: String
    }
},
    {
        timestamps: true
    }
);

mongoose.model("Sobre", sobre);