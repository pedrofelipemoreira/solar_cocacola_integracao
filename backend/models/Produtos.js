import mongoose from "mongoose";

const { Schema } = mongoose;

const produtoSchema = new Schema({
        cod: {
            type: Number,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        descricao: {
            type: String,
            required: true
        },
        ml: {
            type: String,
            required: true
        },
        regiao: {
            type: String,
            required: true
        },
        tpCliente: {
            type: String,
            required: true
        },
        valor: {
            type: Number,
            required: true
        },

    },

    { timestamps: true }

);

const Produto = mongoose.model('Produto', produtoSchema);

export {Produto, produtoSchema}