import React, { useState } from 'react';
import { Divider } from 'antd';
import './addcliente.css';

import functionClients from '../clientes/functionsClients.jsx'

const AddCliente = () => {
  const [cliente, setCliente] = useState({});

  const { register } = functionClients();

  /*   const handleChange = (e) => {
      const { name, value } = e.target;
      setCliente({
        ...cliente,
        [name]: value
      });
    }; */

  // value={cliente.ml} onChange={handleChange}

  function handleChange(e) {

    setCliente({ ...cliente, [e.target.name]: e.target.value })

  }


  function handleSubmit(e) {

    e.preventDefault();

    console.log(cliente)

    register(cliente)

  };

  return (
    <div className="fundo" style={{ marginLeft: '250px' }}>
      <h2 className="cadastro" style={{ margin: '20px' }}>Cadastro de Clientes </h2>
      <Divider style={{ backgroundColor: "#9CA3AF" }} />

      <form className='line'>

        {/*  <div className='smash'>Codigo*<input className="input" type="number" placeholder=" Novo" name="cod"  onChange={handleChange} /> </div> */}
        <div className='smash'>
          Categoria*
          <select className="input" name="category" onChange={handleChange} style={{ cursor: 'pointer' }}>
            <option value="">Estabelecimento</option>
            <option value="Bar">Bar</option>
            <option value="Padaria">Padaria</option>
            <option value="Restaurante">Restaurante</option>
          </select>
        </div>

        <div className='smash'>Nome<input className="desc" type="text" placeholder=" Nome do Cliente" name="name" onChange={handleChange} /></div>
        <div className='smash'>CEP<input className="input" type="text" placeholder=" 12121232" name="cep" onChange={handleChange} /> </div>
      </form>
      <form className='line'>

        <div className='smash'>Cidade<input className="input" type="text" placeholder="Cidade do Cliente" name="cidade" onChange={handleChange} /> </div>
        <div className='smash'>Bairro<input className="input" type="text" placeholder="Bairro do Cliente" name="bairro" onChange={handleChange} /> </div>
        <div className='smash'>Logradouro<input className="input" type="text" placeholder="Ex:Rua São Paulo, Avenida Paulista, Praça da Sé" name="logradouro" onChange={handleChange} /> </div>
        <div className='smash'>
          UF
          <select className="input" name="uf" value={cliente.regiao} onChange={handleChange} style={{ cursor: 'pointer' }}>
            <option value="">UF</option>
            <option value="PE">PE</option>
            <option value="BA">BA</option>
            <option value="RJ">RJ</option>
            <option value="SP">SP</option>
          </select>
        </div>
        <div className='smash'>
          Tipo Cliente*
          <select className="input" name="tpCliente" value={cliente.tipoCliente} onChange={handleChange} style={{ cursor: 'pointer' }}>
            <option value="">Selecione...</option>
            <option value="bronze">Bronze</option>
            <option value="prata">Prata</option>
            <option value="ouro">Ouro</option>
          </select>
        </div>
        <div className='smash'>CNPJ<input className="cpnj" type="string" placeholder="12.345.678/0001-90" name="cnpj" onChange={handleChange} /></div>
      </form>
      <button className="bt" type="button" onClick={handleSubmit}>ADICIONAR CLIENTE</button>
    </div>
  );
};

export default AddCliente;