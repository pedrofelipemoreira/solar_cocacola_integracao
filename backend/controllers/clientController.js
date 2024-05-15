import { isValidObjectId } from 'mongoose';
import { Client } from '../models/Client.js';

import { response } from 'express';

const ClientModel = Client;

const ClientController = {

    create: async (req, res) => {
        try {

            const {category, name, cep, uf, cidade, bairro, logradouro, tpCliente, cnpj} = req.body

            if(!category){
                res.status(422).json({message: 'A Categoria é obrigatória'});
                return;
            }

            if(!name){
                res.status(422).json({message: 'O Nome é obrigatório'});
                return;
            }

            if(!cep){
                res.status(422).json({message: 'O CEP é obrigatório'});
                return;
            }

            if(!uf){
                res.status(422).json({message: 'A UF é obrigatória'});
                return;
            }

            if(!cidade){
                res.status(422).json({message: 'A Cidade é obrigatória'});
                return;
            }

            if(!bairro){
                res.status(422).json({message: 'O Bairro é obrigatório'});
                return;
            }

            if(!logradouro){
                res.status(422).json({message: 'O Logradouro é obrigatório'});
                return;
            }

            if(!tpCliente){
                res.status(422).json({message: 'O Tipo Cliente é obrigatório'});
                return;
            }

            if(!cnpj){
                res.status(422).json({message: 'O CNPJ é obrigatório'});
                return;
            }

            const ClientExist = await ClientModel.findOne({cnpj: cnpj})

            if(ClientExist){
                res.status(422).json({message: 'CNPJ já cadastrado'});
                return;
            }

            const client = new ClientModel({
                category,
                name,
                cep,
                uf,
                cidade,
                bairro,
                logradouro,
                tpCliente,
                cnpj,
            });



            try{
                
                const newClient = await client.save();

                res.status(201).json({newClient, msg:"Cliente Criado com sucesso"})

            }catch(error){
                
                res.status(500).json({message: error})
            
            }



        } catch (error) { 

            console.log(error)

        }
    },

    showClient: async (req, res) =>{

        try{

            const Clients = await ClientModel.find().sort('-createdAt')

            res.status(200).json({clients:Clients})

        }catch(error){

            console.log(error)

        }
       
    }, 

    getClientById: async(req, res) =>{

        try{

            const id = req.params.id

            if(!isValidObjectId(id)){
                res.status(422).json({message: 'Id Invalido'});
                return; 
            }

            const client = await ClientModel.findById(id);

            if(!client){
                res.status(404).json({message: 'Cliente não encotrado'});
                return; 
            }

            res.status(200).json({client});

        }catch(error){

            console.log(error);

        }


    },

    removeClientById: async(req, res) => {

        try{

            const id = req.params.id;

            if(!isValidObjectId(id)){
                res.status(422).json({message: 'Id Invalido'});
                return; 
            }

            const client = await ClientModel.findById(id);

            if(!client){
                res.status(404).json({message: 'Cliente não encotrado'});
                return; 
            }

            const deleteClient = await ClientModel.findByIdAndDelete(id);

            res.status(200).json({deleteClient, message:"Cliente Deletado com sucesso"})

        }catch(error){

            console.log(error);

        }

    },

    editClientUpdate: async(req, res) =>{

        try{

            const id = req.params.id;

            const client = {
                category: req.body.category,
                name: req.body.name,
                cep: req.body.cep,
                uf: req.body.uf,
                cidade: req.body.cidade,
                bairro: req.body.bairro,
                logradouro: req.body.logradouro,
                tpCliente: req.body.tpCliente,
                cnpj: req.body.cnpj,
            };

            const updateClient = await ClientModel.findByIdAndUpdate(id, client);

            if(!updateClient){
                res.status(404).json({message: 'Cliente não encotrado'});
                return; 
            }

            res.status(200).json({client, msg:"Cliente Atualizado com sucesso"});



        }catch(error){

            console.log(error);

        }

    },

}

export default ClientController; 