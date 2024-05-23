import api from "../../utils/api";
import useFlashMessage from '../../hooks/useFlashMessage'
import { useState, useContext } from "react";

export default function useProduto(){
    
    const [produtos, setProdutos] = useState({});
    const {setFlashMessage} = useFlashMessage()

    async function register (produto){
        
        let msgText = 'Cadastro Realizado com sucesso!'
        let msgType = 'success'

        try{

            const data = await api.post('/produtos/create', produto).then((response) =>{
                return response.data
            })
        

        }catch(error){

            console.log(error)
            msgText = error.response.data.message
            msgType = 'error'

        }

        setFlashMessage(msgText, msgType)

    }

    async function removeProduto (id, produtos){

        let msgType = 'success'

        const data = await api.delete(`/produtos/${id}`)
        .then((response) =>{

            const updateProdutos = produtos.filter((produto) => produto._id !== id)

            setProdutos(updateProdutos)
            return response.data


        }).catch((err) => {
            
            msgType = 'error'
            return err.response.data
        })

        setFlashMessage(data.message, msgType)
    }

    

    return{register, removeProduto}

}

