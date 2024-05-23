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

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [clienteSelecionado, setClienteSelecionado] = useState(null);


    const { setFlashMessage } = useFlashMessage();
    const [clients, setClients] = useState([]);
    const { removeClient } = functionClients();

    const columns = [
        {
            title: 'Data',
            dataIndex: 'updatedAt',
            key: 'date',
        },
        {
            title: 'Categoria',
            dataIndex: 'category',
            key: 'category',
        },
        {
            title: 'Nome',
            dataIndex: 'name',
            key: 'nome',
        },
        {
            title: 'CEP',
            dataIndex: 'cep',
            key: 'cep',
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
        },
        {
            title: 'Bairro',
            dataIndex: 'bairro',
            key: 'bairro',
        },
        {
            title: 'Logradouro',
            dataIndex: 'logradouro',
            key: 'logradouro',
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

    const showModal = (produto) => {
        setClienteSelecionado(produto);
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setClienteSelecionado(null);
    };

    const handleSalvarEdicao = async () => {

        let msgText = 'Atualização Realizada com sucesso!';
        let msgType = 'success';

        try{

            const data = await api.put(`/clients/edit/${clienteSelecionado._id}`, clienteSelecionado).then((response) =>{
                setClients(prevClients => prevClients.map(client =>
                    client._id === clienteSelecionado._id ? clienteSelecionado : client
                ));

                return response.data;
            });


        }catch(error){
            console.error('Erro ao salvar edição:', error);
            msgText = error.response.data.message;
            msgType = 'error';
        }
        setFlashMessage(msgText, msgType);


        setIsModalVisible(false);
        setProdutoSelecionado(null);

    };

    return (
        <div>
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
                                    <Button onClick={() => showModal(record)}>Editar</Button>
                                    <Button danger onClick={() => removeClient(record._id, clients)}>Excluir</Button>
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
                        <Form.Item label="Categoria">

                            <Select name='category' value={clienteSelecionado?.category || ''} onChange={(value) => setClienteSelecionado({ ...clienteSelecionado, category: value })}>
                                <Option value="Suco">Bar</Option>
                                <Option value="Refrigerante">Padaria</Option>
                                <Option value="Energético">Restaurante</Option>
                            </Select>

                        </Form.Item>

                        <Form.Item label="Nome">
                            <Input className='input_promocao' name='name' value={clienteSelecionado?.name || ''} onChange={(e) => setClienteSelecionado({ ...clienteSelecionado, name: e.target.value })} />
                        </Form.Item>

                        <Form.Item label="CEP">
                            <Input className='input_promocao' name='cep' value={clienteSelecionado?.cep || ''} onChange={(e) => setClienteSelecionado({ ...clienteSelecionado, cep: e.target.value })} />
                        </Form.Item>

                        <Form.Item label="Cidade">
                            <Input className='input_promocao' name='cidade' value={clienteSelecionado?.cidade || ''} onChange={(e) => setClienteSelecionado({ ...clienteSelecionado, cidade: e.target.value })} />
                        </Form.Item>

                        <Form.Item label="Bairro">
                            <Input className='input_promocao' name='bairro' value={clienteSelecionado?.bairro || ''} onChange={(e) => setClienteSelecionado({ ...clienteSelecionado, bairro: e.target.value })} />
                        </Form.Item>

                    </Form>
                </Col>
                <Col span={12}>
                    <Form layout="vertical">

                        <Form.Item label="Logradouro">
                            <Input className='input_promocao' name='logradouro' value={clienteSelecionado?.logradouro || ''} onChange={(e) => setClienteSelecionado({ ...clienteSelecionado, logradouro: e.target.value })} />
                        </Form.Item>

                        <Form.Item label="UF">
                            
                            <Select name='uf' value={clienteSelecionado?.uf || ''} onChange={(value) => setClienteSelecionado({ ...clienteSelecionado, uf: value })}>
                                <Option value="PE">PE</Option>
                                <Option value="BA">BA</Option>
                                <Option value="RJ">RJ</Option>
                                <Option value="SP">SP</Option>
                            </Select>

                        </Form.Item>

                        <Form.Item label="Tipo Cliente">
                            
                            <Select name='tpCliente' value={clienteSelecionado?.tpCliente || ''} onChange={(value) => setClienteSelecionado({ ...clienteSelecionado, tpCliente: value })}>
                                <Option value="Bronze">Bronze</Option>
                                <Option value="Prata">Prata</Option>
                                <Option value="Ouro">Ouro</Option>
                            </Select>
                            
                        </Form.Item>

                        <Form.Item label="CNPJ">
                            <Input className='input_promocao' name='cnpj' value={clienteSelecionado?.cnpj || ''} onChange={(e) => setClienteSelecionado({ ...clienteSelecionado, cnpj: e.target.value })} />
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
            </Modal>

        </div>
    );
};

export default Cliente;
