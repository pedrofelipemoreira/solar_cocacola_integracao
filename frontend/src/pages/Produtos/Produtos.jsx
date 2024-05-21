import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import { Space, Table, Tag, Button, Select, Modal, Form, Input, Row, Col } from 'antd';
import './produtos.css'; // Importe o arquivo de estilo
import functionsProduto from './functionsProduto.jsx'

import useFlashMessage from '../../hooks/useFlashMessage.jsx';

import { Link } from 'react-router-dom'

const { Option } = Select;

const Produtos = () => {
    const [filtroRegiao, setFiltroRegiao] = useState(null);
    const [filtroTipoCliente, setFiltroTipoCliente] = useState(null);
    const [editandoProduto, setEditandoProduto] = useState(null);
    const [modalVisivel, setModalVisivel] = useState(false);
    const { Option } = Select;

    const {setFlashMessage} = useFlashMessage();

    const [produtos, setProdutos] = useState([]);
    const { removeProduto } = functionsProduto();


    const columns = [
        {
            title: 'Código',
            dataIndex: 'cod',
            key: 'cod',
            filters: []
        },
        {
            title: 'Data',
            dataIndex: 'updatedAt',
            key: 'data',
            filters: []
        },
        {
            title: 'Categoria',
            dataIndex: 'category',
            key: 'categoria',
            filters: []
        },
        {
            title: 'Descrição',
            dataIndex: 'descricao',
            key: 'descricao',
            filters: []
        },
        {
            title: 'ML',
            dataIndex: 'ml',
            key: 'ml',
            filters: []
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
            filters: [],
            render: (_, record) => (
                <Space size='middle'>
                    <p>R$ {record.valor}</p>
                </Space>
            )
        },
    ];

    useEffect(() => {
        // Carrega os produtos quando o componente é montado
        fecharProdutos();
    }, []);

    const fecharProdutos = async () => {
        try {
            const response = await api.get('/produtos');
            setProdutos(response.data.produtos);
        } catch (error) {
            console.error('Erro ao carregar produtos:', error);
        }
    };

    function abrirModalEdicao(produto) {

        setEditandoProduto(produto);
        setModalVisivel(true);
    };

    function fecharModalEdicao() {
        setEditandoProduto(undefined);
        setModalVisivel(false);
        console.log("Oii")
    };

    const handleSalvarEdicao = async(values) => {
        let msgText = 'Atualização Realizado com sucesso!';
        let msgType = 'success';
        try {
            // Envia uma solicitação para atualizar o produto
            const data = await api.put(`/produtos/edit/${editandoProduto._id}`, values).then((response) =>{
                return response.data
            });

            // Atualiza a lista de produtos
            fecharProdutos();
            // Fecha o modal de edição
            fecharModalEdicao();
        } catch (error) {
            console.error('Erro ao salvar edição:', error);
            msgText = error.response.data.message;
            msgType = 'error';
        }
        setFlashMessage(msgText, msgType)
    };

    return (
        <div className="main-content">
            <a href="/addProdutos"><button className="btn" type="button">+ ADD PRODUTOS</button></a>
            <Table
                columns={[
                    ...columns,
                    {
                        title: 'Ações',
                        key: 'action',
                        render: (_, record) => (
                            <Space size="middle">
                                <a onClick={() => {
                                    abrirModalEdicao(record) 
                                    console.log(record)
                                }}>Editar </a>
                                <a onClick={() => {
                                    removeProduto(record._id, produtos) 
                                    console.log(record._id)
                                }}>Excluir</a>
                            </Space>


                        ),
                    }
                ]}
                dataSource={produtos}
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
                title="Editar Produto:"
                open={modalVisivel}
                onCancel={fecharModalEdicao}
                footer={null}
            >
                {editandoProduto && (
                    <Form className='editar' onFinish={handleSalvarEdicao} initialValues={editandoProduto}>
                        <Row gutter={20}> {/* Define o espaçamento entre as colunas */}
                            <Col span={12}> {/* Define que esta coluna ocupará metade do espaço */}
                                <Form.Item label="Código" name="cod" type="number">
                                    <Input />
                                </Form.Item>
                                <Form.Item label="Categoria" name="category">
                                    <Select>
                                        <Option value="Suco">Suco</Option>
                                        <Option value="Refrigerante">Refrigerante</Option>
                                        <Option value="Energético">Energético</Option>
                                    </Select>
                                </Form.Item>
                                {/* Adicione mais itens de formulário conforme necessário */}
                            </Col>
                            <Col span={12}> {/* Define que esta coluna ocupará metade do espaço */}
                                <Form.Item label="ML" name="ml">
                                    <Input />
                                </Form.Item>
                                <Form.Item label="Valor" name="valor">
                                    <Input />
                                </Form.Item>
                                {/* Adicione mais itens de formulário conforme necessário */}
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label="Região" name="regiao">
                                    <Select>
                                        <Option value="PE">PE</Option>
                                        <Option value="BA">BA</Option>
                                        <Option value="RJ">RJ</Option>
                                        <Option value="SP">SP</Option>
                                    </Select>
                                </Form.Item>
                                {/* Adicione mais itens de formulário conforme necessário */}
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Tipo de Cliente" name="tpCliente">
                                    <Select>
                                        <Option value="Bronze">Bronze</Option>
                                        <Option value="Prata">Prata</Option>
                                        <Option value="Ouro">Ouro</Option>
                                    </Select>
                                </Form.Item>
                                {/* Adicione mais itens de formulário conforme necessário */}
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Form.Item label="Descrição" name="descricao" value={produtos.categoty}>
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

export default Produtos;