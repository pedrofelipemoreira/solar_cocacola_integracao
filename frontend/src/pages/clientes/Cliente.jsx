import React, { useState } from 'react';
import { Space, Table, Tag, Button, Select, Modal, Form, Input, Row, Col  } from 'antd';
import './cliente.css'; // Importe o arquivo de estilo

const { Option } = Select;

const columns = [
    {
        title: 'Código',
        dataIndex: 'cod',
        key: 'cod',
        filters: []
    },
    {
        title: 'Data',
        dataIndex: 'data',
        key: 'data',
        filters: []
    },

    {
        title: 'Nome',
        dataIndex: 'nome',
        key: 'nome',
        filters: []
    },
    {
        title: 'Cep',
        dataIndex: 'cep',
        key: 'cep',
        filters: []
    },
    {
        title: 'UF',
        dataIndex: 'uf',
        key: 'uf',
        filters: []
    },
    {
        title: 'Cidade',
        dataIndex: 'cidade',
        key: 'cidade',
        filters: [
            { text: 'PE', value: 'PE' },
            { text: 'BA', value: 'BA' },
            { text: 'RJ', value: 'RJ' },
            { text: 'SP', value: 'SP' },
        ],
        onFilter: (value, record) => record.regiao.indexOf(value) === 0,
        
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
        dataIndex: 'tipoCliente',
        key: 'tipoCliente',
        filters: [
            { text: 'Bronze', value: 'Bronze' },
            { text: 'Prata', value: 'Prata' },
            { text: 'Ouro', value: 'Ouro' },
        ],
        onFilter: (value, record) => record.tipoCliente.indexOf(value) === 0,
    },
    {
        title: 'CNPJ',
        dataIndex: 'cnpj',
        key: 'cnpj',
        filters: []
    },
];

const data = [
   
];

const Cliente = () => {
    const [filtroRegiao, setFiltroRegiao] = useState(null);
    const [filtroTipoCliente, setFiltroTipoCliente] = useState(null);
    const [editandoProduto, setEditandoProduto] = useState(null);
    const [modalVisivel, setModalVisivel] = useState(false);
    const { Option } = Select;

    const abrirModalEdicao = (produto) => {
        setEditandoProduto(produto);
        setModalVisivel(true);
    };

    const fecharModalEdicao = () => {
        setEditandoProduto(null);
        setModalVisivel(false);
    };

    const handleSalvarEdicao = (values) => {
        // Lógica para salvar a edição do produto
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
                                <a>Excluir</a>
                            </Space>
                        ),
                    }
                ]}
                dataSource={data}
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
                title="Editar Produto"
                visible={modalVisivel}
                onCancel={fecharModalEdicao}
                footer={null}
            >
                 {editandoProduto && (
                    <Form className='editar' onFinish={handleSalvarEdicao} initialValues={editandoProduto}>
                    <Row gutter={20}> {/* Define o espaçamento entre as colunas */}
                        <Col span={12}> {/* Define que esta coluna ocupará metade do espaço */}
                            <Form.Item label="Codigo" name="Cod" type="number">
                                <Input />
                            </Form.Item>
                            <Form.Item label="Data" name="data">
                                <Input />
                            </Form.Item> 
                            {/* Adicione mais itens de formulário conforme necessário */}
                        </Col>
                        <Col span={12}> {/* Define que esta coluna ocupará metade do espaço */}
                            <Form.Item label="Nome" name="nome">
                                <Input />
                            </Form.Item>
                            <Form.Item label="Cep" name="cep">
                                <Input />
                            </Form.Item>
                            <Form.Item label="UF" name="uf">
                                <Input />
                            </Form.Item>
                            {/* Adicione mais itens de formulário conforme necessário */}
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="Cidade" name="Cidade">
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
                            {/* Adicione mais itens de formulário conforme necessário */}
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Tipo de Cliente" name="TipoCliente">
                                <Select>
                                    <Option value="Bronze">Bronze</Option>
                                    <Option value="Prata">Prata</Option>
                                    <Option value="Ouro">Ouro</Option>
                                </Select>  
                            </Form.Item>
                            <Form.Item label="CNPJ" name="cnpj">
                                <Input />
                            </Form.Item>
                            {/* Adicione mais itens de formulário conforme necessário */}
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