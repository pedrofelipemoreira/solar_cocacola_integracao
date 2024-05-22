import './promocao.css';
import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import { Space, Table, Tag, Button, Select, Modal, Form, Input, Row, Col } from 'antd';

const Promocao = () => {
    const [promocao, setPromocao] = useState({ tpCliente: '' });

    function handleChange(e) {
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
                    <p>R$ {record.valor.toFixed(2)}</p>
                </Space>
            )
        },
    ];

    if(promocao.tpCliente === "bronze"){
        columns = [
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
                        
                        <p>R$ {(valor = record.valor * (1- (5 /100))).toFixed(2)}</p>
                    </Space>
                )
            },
        ];
    }

    if(promocao.tpCliente === "prata"){

        columns = [
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
                        <p>R$ {(valor = record.valor * (1- (10 /100))).toFixed(2)}</p>
                    </Space>
                )
            },
        ];


    }

    if(promocao.tpCliente === "ouro"){

        columns = [
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
                        <p>R$ {(valor = record.valor * (1- (15 /100))).toFixed(2)}</p>
                    </Space>
                )
            },
        ];


    }


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

    return (
        
        <div className='bodyPromocao'>

            <h1>Selecione o nivel do cliente para ver suas promoções</h1>

            <select className="input" onChange={handleChange} name="tpCliente" style={{ cursor: 'pointer' }}>
                <option value="">Selecione...</option>
                <option value="bronze">Bronze</option>
                <option value="prata">Prata</option>
                <option value="ouro">Ouro</option>
            </select>

            {promocao.tpCliente === "bronze" && (
                <div className="main-content-promocao">
                  
                    <Table
                        columns={[
                            ...columns,
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
                </div>
            )}

            {promocao.tpCliente === "prata" && (
                <div className="main-content-promocao">
                  
                <Table
                    columns={[
                        ...columns,
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
            </div>
            )}

            {promocao.tpCliente === "ouro" && (
                <div className="main-content-promocao">
                  
                <Table
                    columns={[
                        ...columns,
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
            </div>
            
            )}
        </div>
    );
}

export default Promocao;