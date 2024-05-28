import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../utils/api';
import { Table, Button, Modal, Checkbox } from 'antd';
import './meusProdutos.css';
import useFlashMessage from '../../hooks/useFlashMessage.jsx';

function MeusProdutos() {
  const { id } = useParams(); // Obtenha o ID do cliente da URL
  const [produtosCliente, setProdutosCliente] = useState([]);
  const [produtosDisponiveis, setProdutosDisponiveis] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProdutos, setSelectedProdutos] = useState([]);

  const { setFlashMessage } = useFlashMessage();

  useEffect(() => {
    const fetchProdutosCliente = async () => {
      try {
        const response = await api.get(`/clients/${id}/products`);
        setProdutosCliente(response.data.produtos);
      } catch (error) {
        console.error('Erro ao carregar produtos do cliente:', error);
      }
    };

    const fetchProdutosDisponiveis = async () => {
      try {
        const response = await api.get('/produtos');
        setProdutosDisponiveis(response.data.produtos);
      } catch (error) {
        console.error('Erro ao carregar produtos disponíveis:', error);
      }
    };

    fetchProdutosCliente();
    fetchProdutosDisponiveis();
  }, [id]);

  const handleAddProdutos = () => {
    setIsModalVisible(true);
    setSelectedProdutos(produtosCliente.slice()); // Copia a lista de produtos do cliente para os selecionados inicialmente
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setSelectedProdutos([]); // Limpa a lista de produtos selecionados ao fechar o modal
  };

  const handleProdutoChange = (produto, isChecked) => {
    if (isChecked) {
      setSelectedProdutos(prevState => [...prevState, produto]);
    } else {
      setSelectedProdutos(prevState => prevState.filter(p => p._id !== produto._id));
    }
  };

  const handleSalvarSelecao = async () => {

    let msgText = 'Produto adicionado com sucesso!';
    let msgType = 'success';

    setIsModalVisible(false);

    try {
      const response = await api.post(`/clients/${id}/products`, 
      {
        productIds: selectedProdutos.map(p => p._id)

      });

      console.log(response.data);
      
      setProdutosCliente(selectedProdutos.slice()); // Atualiza a lista de produtos do cliente com os selecionados

    } catch (error) {
      console.error('Erro ao salvar seleção de produtos:', error);
      msgText = error.response.data.message;
      msgType = 'error';
    }
    setFlashMessage(msgText, msgType);
  };

  const columns = [
    { title: 'Código', dataIndex: 'cod', key: 'cod' },
    { title: 'Categoria', dataIndex: 'category', key: 'category' },
    { title: 'Descrição', dataIndex: 'descricao', key: 'descricao' },
    { title: 'ML', dataIndex: 'ml', key: 'ml' },
    { title: 'Região', dataIndex: 'regiao', key: 'regiao' },
    { title: 'Valor', dataIndex: 'valor', key: 'valor' },
  ];

  return (
    <div className='tt'>
      <div>
        <h1>Produtos do Cliente</h1>
        <Button type="primary" onClick={handleAddProdutos}>Adicionar Produtos ao Cliente</Button>
        {produtosCliente.length > 0 && (
          <Table 
          
          columns={columns} 
          
          dataSource={produtosCliente} />
        )}
      </div>

      <Modal
        title="Selecione os Produtos"
        open={isModalVisible}
        onCancel={handleModalCancel}
        footer={[
          <Button key="cancel" onClick={handleModalCancel}>Cancelar</Button>,
          <Button key="add" type="primary" onClick={handleSalvarSelecao}>Adicionar</Button>
        ]}
      >
        <h3>Produtos Disponíveis:</h3>
        <ul>
          {produtosDisponiveis.map(produto => (
            <li key={produto._id}>
              <Checkbox
                checked={selectedProdutos.some(p => p._id === produto._id)} // Verifica se o produto está presente nos produtos selecionados
                onChange={(e) => handleProdutoChange(produto, e.target.checked)}
              >
                {produto.descricao} - {produto.cod}
              </Checkbox>
            </li>
          ))}
        </ul>
      </Modal>
    </div>
  );
}

export default MeusProdutos;
