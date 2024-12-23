const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({
    numClient : {
        type : Number,
        required : true,
    },
    nameClient : {
        type : String,
        required : true,
    },
    cin : {
        type : String,
        required : true,
    },
    birthDate : {
        type : Date,
        required : true
    },
    tele : {
        type : Number,
        required : true
    },
    dateRegisterClient : {
        type : Date,
        default : new Date(),
    },
    companyId : {
        type : String,
        required : true
    }
});

module.exports = mongoose.model("Client", ClientSchema);
