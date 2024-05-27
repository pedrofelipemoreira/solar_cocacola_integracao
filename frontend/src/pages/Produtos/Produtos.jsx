import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import { Space, Table, Button, Select, Modal, Form, Input, Row, Col } from 'antd';
import './produtos.css'; // Importe o arquivo de estilo
import functionsProduto from './functionsProduto.jsx'
import useFlashMessage from '../../hooks/useFlashMessage.jsx';

const { Option } = Select;

const Produtos = () => {
    const [filtroRegiao, setFiltroRegiao] = useState(null);
    const [filtroTipoCliente, setFiltroTipoCliente] = useState(null);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [produtoSelecionado, setProdutoSelecionado] = useState(null);

    const { setFlashMessage } = useFlashMessage();

    const [produtos, setProdutos] = useState([]);
    const { removeProduto } = functionsProduto();

    const columns = [
        {
            title: 'Código',
            dataIndex: 'cod',
            key: 'cod',
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
                <div style={{ padding: 8 }}>
                    <Input
                        placeholder="Pesquisar Código"
                        value={selectedKeys[0]}
                        onChange={e => {
                            setSelectedKeys(e.target.value ? [e.target.value] : []);
                            confirm({ closeDropdown: false });
                        }}
                        style={{ marginBottom: 8, display: 'block' }}
                    />
                    <Button
                        onClick={() => confirm()}
                        size="small"
                        style={{ width: 90, marginRight: 8 }}
                    >
                        Pesquisar
                    </Button>
                    <Button
                        onClick={() => {
                            clearFilters();
                            setSelectedKeys([]);
                            confirm({ closeDropdown: true });
                        }}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Limpar
                    </Button>
                </div>
            ),
            onFilter: (value, record) => record.cod.toString().toLowerCase().includes(value.toLowerCase())
        },
        {
            title: 'Data',
            dataIndex: 'updatedAt',
            key: 'data',
        },
        {
            title: 'Categoria',
            dataIndex: 'category',
            key: 'categoria',
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
            filters: [
                { text: 'PE', value: 'PE' },
                { text: 'BA', value: 'BA' },
                { text: 'RJ', value: 'RJ' },
                { text: 'SP', value: 'SP' },
            ],
            onFilter: (value, record) => record.regiao.indexOf(value) === 0,

        },
        {
            title: 'Valor',
            dataIndex: 'valor',
            key: 'valor',
            render: (_, record) => (
                <Space size='middle'>
                    <p>R$ {record.valor}</p>
                </Space>
            )
        },
        {
            title: 'Ações',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button onClick={() => showModal(record)}>Editar</Button>
                    <Button danger  onClick={() => removeProduto(record._id, produtos)}>Excluir</Button>
                </Space>
            ),
        }
    ];

    useEffect(() => {
        // Carrega os produtos quando o componente é montado
        fecharProdutos();
    }, []);

    const fecharProdutos = async () => {
        try {
            const response = await api.get('/produtos');
            const produtosFiltrados = response.data.produtos.filter(produto => produto.role === 'padrao');
            setProdutos(produtosFiltrados);
        } catch (error) {
            console.error('Erro ao carregar produtos:', error);
        }
    };

    const showModal = (produto) => {
        setProdutoSelecionado(produto);
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setProdutoSelecionado(null);
    };

    const handleSalvarEdicao = async () => {
        let msgText = 'Atualização Realizada com sucesso!';
        let msgType = 'success';
        try {
            // Envia uma solicitação para atualizar o produto
            const data = await api.put(`/produtos/edit/${produtoSelecionado._id}`, produtoSelecionado).then((response) => {

                setProdutos(prevProdutos => prevProdutos.map(produto =>
                    produto._id === produtoSelecionado._id ? produtoSelecionado : produto
                ));

                return response.data;
            });

        } catch (error) {
            console.error('Erro ao salvar edição:', error);
            msgText = error.response.data.message;
            msgType = 'error';
        }
        setFlashMessage(msgText, msgType);


        setIsModalVisible(false);
        setProdutoSelecionado(null);
    };



    return (

        <div >
            <div className="main-content">
                <a href="/addProdutos"><button className="btn" type="button">+ ADD PRODUTOS</button></a>
                <Table
                    columns={columns}
                    dataSource={produtos}
                    onChange={(pagination, filters) => {
                        if (filters.regiao && filters.regiao.length > 0) {
                            setFiltroRegiao(filters.regiao[0]);
                        } else {
                            setFiltroRegiao(null);
                        }
                        if (filters.tipoCliente && filters.tipoCliente.length > 0) {
                            setFiltroTipoCliente(filters.tipoCliente[0]);
                        } else {
                            setFiltroTipoCliente(null);
                        }
                    }}
                    filters={{ regiao: [filtroRegiao], tipoCliente: [filtroTipoCliente] }}
                />
            </div>

            <Modal
                title="Detalhes do Produto"
                open={isModalVisible}
                onCancel={handleCancel}
                footer={[
                    <Button key="cancel" onClick={handleCancel}>Cancelar</Button>,
                    <Button key="add" type="primary" onClick={handleSalvarEdicao}>Salvar Edição</Button>
                ]}
            >
                <Row gutter={[16, 16]}>
                    <Col span={12}>
                        <Form layout="vertical">
                            <Form.Item label="Código">
                                <Input className='input_promocao' name='cod' value={produtoSelecionado?.cod || ''} readOnly />
                            </Form.Item>
                            <Form.Item label="Categoria">
                                <Select name='category' value={produtoSelecionado?.category || ''} onChange={(value) => setProdutoSelecionado({ ...produtoSelecionado, category: value })}>
                                    <Option value="Suco">Suco</Option>
                                    <Option value="Refrigerante">Refrigerante</Option>
                                    <Option value="Energético">Energético</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item label="Descrição">
                                <Input className='input_promocao' name='descricao' value={produtoSelecionado?.descricao || ''} onChange={(e) => setProdutoSelecionado({ ...produtoSelecionado, descricao: e.target.value })} />
                            </Form.Item>
                        </Form>
                    </Col>
                    <Col span={12}>
                        <Form layout="vertical">
                            <Form.Item label="ML">
                                <Input className='input_promocao' name='ml' value={produtoSelecionado?.ml || ''} onChange={(e) => setProdutoSelecionado({ ...produtoSelecionado, ml: e.target.value })} />
                            </Form.Item>
                            <Form.Item label="Região">
                                <Select name='regiao' value={produtoSelecionado?.regiao || ''} onChange={(value) => setProdutoSelecionado({ ...produtoSelecionado, regiao: value })}>
                                    <Option value="PE">PE</Option>
                                    <Option value="BA">BA</Option>
                                    <Option value="RJ">RJ</Option>
                                    <Option value="SP">SP</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item label="Preço">
                                <Input className='input_promocao' name='valor' value={produtoSelecionado?.valor || ''} onChange={(e) => setProdutoSelecionado({ ...produtoSelecionado, valor: e.target.value })} />
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
            </Modal>

        </div>

    );
};

export default Produtos;
