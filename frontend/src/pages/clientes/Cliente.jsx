import React, { useState, useEffect } from 'react';
import api from '../../utils/api.js';
import { Space, Table, Button, Select, Modal, Form, Input, Row, Col } from 'antd';
import './cliente.css'; // Importe o arquivo de estilo
import functionClients from './functionsClients.jsx';
import useFlashMessage from '../../hooks/useFlashMessage.jsx';

const { Option } = Select;

const Cliente = () => {
    const [filtroRegiao, setFiltroRegiao] = useState(null);
    const [filtroTipoCliente, setFiltroTipoCliente] = useState(null);
    const [editandoClient, setEditandoClient] = useState(null);
    const [modalVisivel, setModalVisivel] = useState(false);

    const { setFlashMessage } = useFlashMessage();
    const [clients, setClients] = useState([]);
    const { removeClient } = functionClients();

    const columns = [
        {
            title: 'Data',
            dataIndex: 'updatedAt',
            key: 'date',
            filters: []
        },
        {
            title: 'Categoria',
            dataIndex: 'category',
            key: 'category',
            filters: []
        },
        {
            title: 'Nome',
            dataIndex: 'name',
            key: 'nome',
            filters: []
        },
        {
            title: 'CEP',
            dataIndex: 'cep',
            key: 'cep',
            filters: []
        },
        {
            title: 'UF',
            dataIndex: 'uf',
            key: 'uf',
            filters: [
                { text: 'PE', value: 'PE' },
                { text: 'BA', value: 'BA' },
                { text: 'RJ', value: 'RJ' },
                { text: 'SP', value: 'SP' },
            ],
            onFilter: (value, record) => record.uf.indexOf(value) === 0,
        },
        {
            title: 'Cidade',
            dataIndex: 'cidade',
            key: 'cidade',
            filters: []
        },
        {
            title: 'Bairro',
            dataIndex: 'bairro',
            key: 'bairro',
            filters: []
        },
        {
            title: 'Logradouro',
            dataIndex: 'logradouro',
            key: 'logradouro',
            filters: []
        },
        {
            title: 'Tipo de Cliente',
            dataIndex: 'tpCliente',
            key: 'tipoCliente',
            filters: [
                { text: 'Bronze', value: 'Bronze' },
                { text: 'Prata', value: 'Prata' },
                { text: 'Ouro', value: 'Ouro' },
            ],
            onFilter: (value, record) => record.tpCliente.indexOf(value) === 0,
        },
        {
            title: 'CNPJ',
            dataIndex: 'cnpj',
            key: 'cnpj',
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
                <div style={{ padding: 8 }}>
                    <Input
                        placeholder="Pesquisar CNPJ"
                        value={selectedKeys[0]}
                        onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                        onPressEnter={() => confirm()}
                        style={{ marginBottom: 8, display: 'block' }}
                    />
                    <Button
                        type="primary"
                        onClick={() => confirm()}
                        icon="search"
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
            onFilter: (value, record) => record.cnpj.toString().toLowerCase().includes(value.toLowerCase())
        }
    ];

    useEffect(() => {
        // Carrega os clientes quando o componente é montado
        fecharClients();
    }, []);

    const fecharClients = async () => {
        try {
            const response = await api.get('/clients');
            setClients(response.data.clients);
        } catch (error) {
            console.error('Erro ao carregar Clientes:', error);
        }
    };

    const abrirModalEdicao = (client) => {
        setEditandoClient(client);
        setModalVisivel(true);
    };

    const fecharModalEdicao = () => {
        setEditandoClient(null);
        setModalVisivel(false);
    };

    const handleSalvarEdicao = (values) => {
        // Lógica para salvar a edição do cliente
        console.log('Valores editados:', values);
        fecharModalEdicao();
    };

    return (
        <div className="main-content">
            <a href="/addCliente"><button className="btn" type="button">+ ADD CLIENTES</button></a>
            <Table
                columns={[
                    ...columns,
                    {
                        title: 'Ações',
                        key: 'action',
                        render: (_, record) => (
                            <Space size="middle">
                                <a onClick={() => abrirModalEdicao(record)}>Editar {record.cod}</a>
                                <a onClick={() => removeClient(record._id, clients)}>Excluir</a>
                            </Space>
                        ),
                    }
                ]}
                dataSource={clients}
                // Aplica os filtros de região e tipo de cliente
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
            <Modal
                title="Editar Cliente"
                open={modalVisivel}
                onCancel={fecharModalEdicao}
                footer={null}
            >
                {editandoClient && (
                    <Form className='editar' onFinish={handleSalvarEdicao} initialValues={editandoClient}>
                        <Row gutter={20}>
                            <Col span={12}>
                                <Form.Item label="Nome" name="name">
                                    <Input />
                                </Form.Item>
                                <Form.Item label="CEP" name="cep">
                                    <Input />
                                </Form.Item>
                                <Form.Item label="Cidade" name="cidade">
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="UF" name="uf">
                                    <Select>
                                        <Option value="PE">PE</Option>
                                        <Option value="BA">BA</Option>
                                        <Option value="RJ">RJ</Option>
                                        <Option value="SP">SP</Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item label="Bairro" name="bairro">
                                    <Input />
                                </Form.Item>
                                <Form.Item label="Logradouro" name="logradouro">
                                    <Input />
                                </Form.Item>
                                <Form.Item label="Tipo de Cliente" name="tpCliente">
                                    <Select>
                                        <Option value="Bronze">Bronze</Option>
                                        <Option value="Prata">Prata</Option>
                                        <Option value="Ouro">Ouro</Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item label="CNPJ" name="cnpj">
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit">Salvar</Button>
                                    <Button onClick={fecharModalEdicao}>Cancelar</Button>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                )}
            </Modal>
        </div>
    );
};

export default Cliente;
