import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import { Table, Button, Modal, Checkbox } from 'antd';
import './meusProdutos.css';

const MeusProdutos = ({ clientId }) => {
    const [produtosCliente, setProdutosCliente] = useState([]);
    const [produtosDisponiveis, setProdutosDisponiveis] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        const fetchProdutosCliente = async () => {
            try {
                // Obter os produtos associados ao cliente
                const response = await api.get(`/clients/${clientId}/products`);
                setProdutosCliente(response.data.produtos);
            } catch (error) {
                console.error('Erro ao carregar produtos do cliente:', error);
            }
        };

        const fetchProdutosDisponiveis = async () => {
            try {
                // Obter todos os produtos disponíveis
                const response = await api.get('/produtos');
                setProdutosDisponiveis(response.data.produtos);
            } catch (error) {
                console.error('Erro ao carregar produtos disponíveis:', error);
            }
        };

        fetchProdutosCliente();
        fetchProdutosDisponiveis();
    }, [clientId]);

    const handleAddProdutos = () => {
        setIsModalVisible(true);
    };

    const handleModalCancel = () => {
        setIsModalVisible(false);
    };

    const handleSalvarSelecao = async () => {
        // Implemente a lógica para salvar a seleção dos produtos
        setIsModalVisible(false);
    };


    const columns = [
        {
            title: 'Código',
            dataIndex: 'cod',
            key: 'cod',
        },
        {
            title: 'Categoria',
            dataIndex: 'category',
            key: 'category',
        },
        {
            title: 'Descrição',
            dataIndex: 'descricao',
            key: 'descricao',
        },
        {
            title: 'ML',
            dataIndex: 'ml',
            key: 'ml',
        },
        {
            title: 'Região',
            dataIndex: 'regiao',
            key: 'regiao',
        },
        {
            title: 'Valor',
            dataIndex: 'valor',
            key: 'valor',
        },
    ];

    return (
        <div className='tt'>
            <div>

            <h1>Produtos do Cliente</h1>
            <Button type="primary" onClick={handleAddProdutos}>Adicionar Produtos ao Cliente</Button>
            <Table columns={columns} dataSource={produtosCliente} />
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
                            <Checkbox>{produto.descricao}</Checkbox>
                        </li>
                    ))}
                </ul>
            </Modal>
        </div>
        
    );
};

export default MeusProdutos;
