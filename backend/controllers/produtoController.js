import { isValidObjectId } from "mongoose";
import {Produto} from '../models/Produtos.js'

const ProdutoModel = Produto

const PodutoController = {

    create: async (req, res) =>{

        try{

            const {cod, category, descricao, ml, regiao, tpCliente, valor} = req.body

            if(!cod){
                res.status(422).json({message: 'O Código é obrigatório'});
                return;
            }

            if(!category){
                res.status(422).json({message: 'A Categoria é obrigatória'});
                return;
            }
            
            if(!descricao){
                res.status(422).json({message: 'A Descrição é obrigatória'});
                return;
            }
            
            if(!ml){
                res.status(422).json({message: 'O ML é obrigatória'});
                return;
            }

            if(!regiao){
                res.status(422).json({message: 'A Região é obrigatória'});
                return;
            }

            if(!tpCliente){
                res.status(422).json({message: 'O Tipo Cliente é obrigatório'});
                return;
            }
            
            if(!valor){
                res.status(422).json({message: 'O Valor é obrigatório'});
                return;
            }

            const ProdutoExist = await ProdutoModel.findOne({cod: cod})

            if(ProdutoExist){
                res.status(422).json({message: 'Código já cadastrado'});
                return;
            }

            const produto = new ProdutoModel({
                cod, 
                category,
                descricao, 
                ml, 
                regiao, 
                tpCliente, 
                valor
            });

            try{

                const newProduto = await produto.save()

                res.status(201).json({newProduto, message:"Prodduto Criado com sucesso"})


            }catch(error){

                res.status(500).json({message: error})

            }



        }catch (error){


            res.status(500).json({message: error})
            console.log(error);
        }

    },

    showProduto: async (req, res) => {

        try{

            const Produtos = await ProdutoModel.find().sort('-createdAt')
            
            res.status(200).json({produtos: Produtos})

        }catch(error){

            console.log(error)

        }

    },

    getProdutoById: async(req, res) => {

        try{

            const id = req.params.id
            
            if(!isValidObjectId(id)){
                res.status(422).json({message: 'Id Invalido'});
                return; 
            }

            const produto = await ProdutoModel.findById(id);

            if(!produto){
                res.status(404).json({message: 'Produto não encontrado'})
                return;
            }

            const ProdutoExist = await ProdutoModel.findOne({cod: cod})

            if(ProdutoExist){
                res.status(422).json({message: 'Código já cadastrado'});
                return;
            }


            res.status(200).json({produto});


        }catch(error){

            console.log(error)

        }

    },

    removeProdutoById: async(req, res) =>{
        try{

            const id = req.params.id
            
            if(!isValidObjectId(id)){
                res.status(422).json({message: 'Id Invalido'});
                return; 
            }

            const produto = await ProdutoModel.findById(id);

            if(!produto){
                res.status(404).json({message: 'Produto não encontrado'})
                return;
            }

            const deleteProduto = await ProdutoModel.findByIdAndDelete(id)

            res.status(200).json({deleteProduto, message: "Produto Deletado com sucesso"})


        }catch (error){

            console.log(error);

        }
    },

    editProdutoUpdate: async(req, res) =>{
        
        try{

            const id = req.params.id

            const produto = {
                cod: req.body.cod, 
                category: req.body.category,
                descricao: req.body.decricao, 
                ml: req.body.ml, 
                regiao: req.body.regiao, 
                tpCliente: req.body.tpCliente, 
                valor: req.body.valor,
            }

            const updateProduto = await ProdutoModel.findByIdAndUpdate(id, produto)

            if(!updateProduto){
                res.status(404).json({message: 'Produto não encotrado'});
                return; 
            }



            res.status(200).json({produto, msg:"Produto Atualizado com sucesso"});


        }catch(error){

            console.log(error)

        }
    }

}

export default PodutoController;