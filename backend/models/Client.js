import mongoose from "mongoose";

const { Schema } = mongoose;

const clientSchema = new Schema({

        category: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        cep: {
            type: String,
            required: true
        },
        uf: {
            type: String,
            required: true
        },
        cidade: {
            type: String,
            required: true
        },
        bairro: {
            type: String,
            required: true
        },
        logradouro: {
            type: String,
            required: true
        },
        tpCliente: {
            type: String,
            required: true
        },
        cnpj: {
            type: String,
            required: true
        }


    },

    { timestamps: true }

)

const Client = mongoose.model('Client', clientSchema);

export {Client, clientSchema};