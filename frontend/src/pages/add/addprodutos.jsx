import React, { useState } from 'react';
import { Divider } from 'antd';
import './addprodutos.css';

import functionsProduto from '../Produtos/functionsProduto.jsx'

const AddProdutos = () => {
  const [produto, setProduto] = useState({});
  
  const {register} = functionsProduto();

/*   const handleChange = (e) => {
    const { name, value } = e.target;
    setProduto({
      ...produto,
      [name]: value
    });
  }; */

  function handleChange(e){
    
    setProduto({...produto, [e.target.name]: e.target.value})
  
  }


  function handleSubmit(e) {

    e.preventDefault();

    console.log(produto)

    register(produto)

};

  return (
    <div className="fundo" style={{ marginLeft: '250px' }}>
      <h2 className="cadastro" style={{ margin: '20px' }}>Cadastro de Produtos </h2>
      <Divider style={{ backgroundColor: "#9CA3AF" }} />

      <form className='line'>
        <div className='smash'>Codigo*<input className="input" type="number" placeholder=" Novo" name="cod"  onChange={handleChange} /> </div>
        <div className='smash'>
          Categoria*
          <select className="input" name="category" value={produto.category} onChange={handleChange} style={{ cursor: 'pointer' }}>
            <option value="">Produto</option> 
            <option value="suco">Suco</option> 
            <option value="Refrigerante">Refrigerante</option>    
            <option value="Energetico">Energetico</option>  
            </select>
            </div>
        <div className='smash'>Descrição*<input className="desc" type="text" placeholder=" Descreva o nome do seu produto" name="descricao" onChange={handleChange} /></div>
      </form>
      <form className='line'>
        <div className='smash'>ML*<input className="input" type="text" placeholder=" 600" name="ml" value={produto.ml} onChange={handleChange} /> </div>
        <div className='smash'>
          Região*
          <select className="input" name="regiao" value={produto.regiao} onChange={handleChange} style={{ cursor: 'pointer' }}>
            <option value="">UF</option> 
            <option value="PE">PE</option>
            <option value="BA">BA</option>
            <option value="RJ">RJ</option>
            <option value="SP">SP</option>
          </select>
        </div>
        <div className='smash'>Valor*<input className="descr" type="number" placeholder=" R$1500,00..." name="valor" value={produto.valor} onChange={handleChange} /></div>
      </form>
      <button className="bt" type="button" onClick={handleSubmit}>ADICIONAR PRODUTO</button>
    </div>
  );
};

export default AddProdutos;
