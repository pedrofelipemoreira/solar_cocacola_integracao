import { isValidObjectId } from 'mongoose';
import { Client } from '../models/Client.js';
import { Produto } from '../models/Produtos.js'

import { response } from 'express';

const ClientModel = Client;

const ClientController = {

    create: async (req, res) => {
        try {

            const { category, name, cep, uf, cidade, bairro, logradouro, tpCliente, cnpj} = req.body



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

    addProductsToClient: async (req, res) => {
        const id = req.params.id;
        const { productIds } = req.body;
    
        try {
            if (!isValidObjectId(id)) {
                return res.status(422).json({ message: 'ID inválido' });
            }
    
            const client = await ClientModel.findById(id);
    
            if (!client) {
                return res.status(404).json({ message: 'Cliente não encontrado' });
            }
    
            // Buscar os objetos completos de produtos usando os IDs
            const products = await Produto.find({ _id: { $in: productIds } });
    
            // Verificar se todos os produtos foram encontrados
            if (products.length !== productIds.length) {
                return res.status(400).json({ message: 'Alguns produtos não foram encontrados' });
            }
    
            // Verificar se algum dos produtos já está presente no array de produtos do cliente
            const existingProductIds = client.products.map(p => p._id.toString());
            const newProducts = products.filter(p => !existingProductIds.includes(p._id.toString()));
    
            // Se todos os produtos forem duplicados, retorne uma mensagem informando ao cliente
            if (newProducts.length === 0) {
                return res.status(400).json({ message: 'Todos os produtos já estão cadastrados para este cliente' });
            }
    
            // Adicionar os objetos completos de produtos ao array de produtos do cliente
            client.products.push(...newProducts);
            await client.save();
    
            res.status(200).json({ message: 'Produtos adicionados ao cliente com sucesso', products: newProducts });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao adicionar produtos ao cliente' });
        }
      },

      getClientProducts: async (req, res) => {
        const id = req.params.id
      
        try {
          // Encontrar o cliente pelo ID e popular o campo 'products' com os detalhes dos produtos
            if(!isValidObjectId(id)){
                res.status(422).json({message: 'Id Invalido'});
                return; 
            }

            const client = await ClientModel.findById(id);

            if(!client){
                res.status(404).json({message: 'Cliente não encotrado'});
                return; 
            }
      
          res.status(200).json({ produtos: client.products });
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Erro ao obter produtos do cliente' });
        }
      },

      deleteProductFromClient: async (req, res) => {
        const clientId = req.params.id;
        const productId = req.params.productId;
    
        try {
            if (!isValidObjectId(clientId) || !isValidObjectId(productId)) {
                return res.status(422).json({ message: 'ID inválido' });
            }
    
            const client = await ClientModel.findById(clientId);
    
            if (!client) {
                return res.status(404).json({ message: 'Cliente não encontrado' });
            }
    
            // Verificar se o produto está presente na lista de produtos do cliente
            const index = client.products.findIndex(product => product._id.toString() === productId);
    
            if (index === -1) {
                return res.status(404).json({ message: 'Produto não encontrado para este cliente' });
            }
    
            // Remover o produto da lista de produtos do cliente
            client.products.splice(index, 1);
            await client.save();
    
            res.status(200).json({ message: 'Produto removido do cliente com sucesso' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao remover produto do cliente' });
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

/*     addProductToClient: async (req, res) => {
        try {
            const { id } = req.params;
            const { produtoId } = req.body;

            // Verifica se o ID do cliente é válido
            if (!isValidObjectId(id)) {
                res.status(422).json({ message: 'ID de cliente inválido' });
                return;
            }

            // Verifica se o cliente existe
            const client = await ClientModel.findById(id);
            if (!client) {
                res.status(404).json({ message: 'Cliente não encontrado' });
                return;
            }

            // Verifica se o ID do produto é válido
            if (!isValidObjectId(produtoId)) {
                res.status(422).json({ message: 'ID de produto inválido' });
                return;
            }

            // Verifica se o produto existe
            const produto = await ProdutoModel.findById(produtoId);
            if (!produto) {
                res.status(404).json({ message: 'Produto não encontrado' });
                return;
            }

            // Adiciona o produto ao cliente
            client.produtos.push(produtoId);
            await client.save();

            res.status(200).json({ client, message: 'Produto adicionado ao cliente com sucesso' });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Erro interno do servidor' });
        }
    }, */

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