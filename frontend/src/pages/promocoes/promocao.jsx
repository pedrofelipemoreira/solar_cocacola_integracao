import './promocao.css';
import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import { Space, Table, Button, Modal, Form, Input, Select, Row, Col } from 'antd';

import functionsProduto from '../Produtos/functionsProduto.jsx'

const Promocao = () => {
    const [promocao, setPromocao] = useState({ tpCliente: '' });
    const [novaPromocao, setNovaPromocao] = useState({});
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [produtoSelecionado, setProdutoSelecionado] = useState(null);

    const {register} = functionsProduto();

    function handleChangeTipoCliente(e) {
        setPromocao({ ...promocao, [e.target.name]: e.target.value });
    }

    const [filtroRegiao, setFiltroRegiao] = useState(null);
    const [filtroTipoCliente, setFiltroTipoCliente] = useState(null);

    var valor = 0;
    const [produtos, setProdutos] = useState([]);

    let columns = [
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
            title: 'Valor Original ',
            dataIndex: 'valor',
            key: 'valor',
            render: (_, record) => (
                <Space size='middle'>
                    <p>R$ {(record.valor).toFixed(2)}</p>
                </Space>
            )
        },
        {
            title: 'Valor Promocional',
            dataIndex: 'valor',
            key: 'valorPromocional',
            render: (_, record) => (
                <Space size='middle'>
                    <p>R$ {(record.valor * (1 - (promocao.tpCliente === "bronze" ? 5 : promocao.tpCliente === "prata" ? 10 : promocao.tpCliente === "ouro" ? 15 : 0) / 100)).toFixed(2)}</p>
                </Space>
            )
        },
        {
            title: 'Ações',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button onClick={() => showModal(record)}>Add Promoção</Button>
                </Space>
            ),
        }
    ];

    useEffect(() => {
        if (!promocao.tpCliente) { // Check if no client level is selected
            setProdutos([]); // Clear the products list
        } else {
            fecharProdutos(); // Fetch products only if client level is selected
        }
    }, [promocao.tpCliente]); // Re-run effect when client level changes

    const fecharProdutos = async () => {
        try {
            const response = await api.get('/produtos');
            setProdutos(response.data.produtos);
        } catch (error) {
            console.error('Erro ao carregar produtos:', error);
        }
    };

    function handleChangeNovaPromocao(e) {
        setNovaPromocao({ ...novaPromocao, [e.target.name]: e.target.value });
    }

    const showModal = (produto) => {
        setProdutoSelecionado(produto);
        setNovaPromocao({ ...produto, role: 'promocao' });  // Set initial values for novaPromocao
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setProdutoSelecionado(null);
    };

    const handleAddPromocao = () => {
        // Lógica para adicionar promoção
        setIsModalVisible(false);
        setProdutoSelecionado(null);

        console.log(novaPromocao);

        register(novaPromocao)
    };

    return (
        <div className='bodyPromocao'>
            <h1>Selecione o nível do cliente para ver suas promoções</h1>

            <select className="input" onChange={handleChangeTipoCliente} name="tpCliente" style={{ cursor: 'pointer' }}>
                <option value="">Selecione...</option>
                <option value="bronze">Bronze</option>
                <option value="prata">Prata</option>
                <option value="ouro">Ouro</option>
            </select>

            <div className="main-content-promocao">
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
        <Button key="add" type="primary" onClick={handleAddPromocao}>Adicionar Promoção</Button>
    ]}
>
    <Row gutter={[16, 16]}>
        <Col span={12}>
            <Form layout="vertical">
                <Form.Item label="Código">
                    <Input className='input_promocao' name='cod' value={produtoSelecionado?.cod || ''} readOnly />
                </Form.Item>
                <Form.Item label="Role">
                    <Input className='input_promocao' name='role' value={"promocao"} readOnly />
                </Form.Item>
                <Form.Item label="Categoria">
                    <Input className='input_promocao' name='category' value={produtoSelecionado?.category || ''} readOnly />
                </Form.Item>
                <Form.Item label="Descrição">
                    <Input className='input_promocao' name='descricao' value={produtoSelecionado?.descricao || ''} readOnly />
                </Form.Item>
            </Form>
        </Col>
        <Col span={12}>
            <Form layout="vertical">
                <Form.Item label="ML">
                    <Input className='input_promocao' name='ml' value={produtoSelecionado?.ml || ''} readOnly />
                </Form.Item>
                <Form.Item label="Região">
                    <Input className='input_promocao' name='regiao' value={produtoSelecionado?.regiao || ''} readOnly />
                </Form.Item>
                <Form.Item label="tpCliente">
                    <Input className='input_promocao' name='tpClient' value={promocao.tpCliente || ''} readOnly />
                </Form.Item>
                <Form.Item label="Preço">
                    <Input className='input_promocao' name='valor' value={novaPromocao.valor || produtoSelecionado?.valor || ''} onChange={handleChangeNovaPromocao} />
                </Form.Item>
            </Form>
        </Col>
    </Row>
</Modal>
        </div>
    );
}

export default Promocao;
