import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../utils/api';
import { Space, Table, Button, Modal, Checkbox } from 'antd';
import './meusProdutos.css';
import useFlashMessage from '../../hooks/useFlashMessage.jsx';

function MeusProdutos() {
  const { id } = useParams();
  const [cliente, setCliente] = useState({})
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

    const fetchCliente = async () => {
      const response = await api.get(`/clients/${id}`)
      setCliente(response.data.client)
    }

    const fetchProdutosDisponiveis = async () => {
      try {
        const response = await api.get('/produtos');
        setProdutosDisponiveis(response.data.produtos);
      } catch (error) {
        console.error('Erro ao carregar produtos disponíveis:', error);
      }
    };

    fetchCliente();
    fetchProdutosCliente();
    fetchProdutosDisponiveis();
  }, [id]);

  const handleAddProdutos = () => {
    setIsModalVisible(true);
    setSelectedProdutos(produtosCliente.slice());
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setSelectedProdutos([]);
    console.log(cliente.uf)
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
      const response = await api.post(`/clients/${id}/products`, {
        productIds: selectedProdutos.map(p => p._id)
      });
      setProdutosCliente(selectedProdutos.slice());
    } catch (error) {
      console.error('Erro ao salvar seleção de produtos:', error);
      msgText = error.response.data.message;
      msgType = 'error';
    }
    setFlashMessage(msgText, msgType);
  };

  const handleExcluirProduto = async (id, productId) => {
    let msgType = 'success';
    const data = await api.delete(`/clients/${id}/products/${productId}`)
      .then((response) => {
        const updateProducts = produtosCliente.filter((produto) => produto._id !== productId);
        setProdutosCliente(updateProducts);
        return response.data;
      }).catch((err) => {
        msgType = 'error';
        return err.response.data;
      });
    setFlashMessage(data.message, msgType);
  };

  const columns = [
    { title: 'Código', dataIndex: 'cod', key: 'cod' },
    { title: 'Categoria', dataIndex: 'category', key: 'category' },
    { title: 'Descrição', dataIndex: 'descricao', key: 'descricao' },
    { title: 'ML', dataIndex: 'ml', key: 'ml' },
    { title: 'Região', dataIndex: 'regiao', key: 'regiao' },
    { title: 'Valor', dataIndex: 'valor', key: 'valor' },
    {
      title: 'Ações',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button danger onClick={() => handleExcluirProduto(id, record._id)}>Excluir </Button>
        </Space>
      ),
    }
  ];

  const tableLocale = {
    emptyText: 'Nenhum Produto Cadastrado',
  };

  // Filtrar os produtos disponíveis com base na região do cliente
  const produtosFiltrados = produtosDisponiveis.filter(produto => produto.regiao === cliente.uf && produto.role === 'padrao');

  return (
    <div className='tt'>
      <div>
        <h1>Produtos de {cliente.name}</h1>
        <Button type="primary" onClick={handleAddProdutos}>Adicionar Produtos ao Cliente</Button>
        <Table
          columns={columns}
          dataSource={produtosCliente}
          locale={tableLocale}
        />
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
          {produtosFiltrados.map(produto => (
            <li key={produto._id}>
              <Checkbox
                checked={selectedProdutos.some(p => p._id === produto._id)}
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
