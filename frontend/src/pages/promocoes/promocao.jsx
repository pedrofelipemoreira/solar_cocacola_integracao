import './promocao.css';
import React, { useState, useEffect } from 'react';

const Promocao = () => {
    const [promocao, setPromocao] = useState({});

    function handleChange(e) {
        setPromocao({ ...promocao, [e.target.name]: e.target.value });
    }

    useEffect(() => {
        if (promocao.tpCliente === "bronze") {
            console.log("aaaaaaaaaaa");
        } else if (promocao.tpCliente === "prata") {
            console.log("bbbbbbbbbbbb");
        } else if (promocao.tpCliente === "ouro") {
            console.log("ccccccccccc");
        }
    }, [promocao]);

    return (
        <div className='bodyPromocao'>
            <select className="input" onChange={handleChange} name="tpCliente" style={{ cursor: 'pointer' }}>
                <option value="">Selecione...</option>
                <option value="bronze">Bronze</option>
                <option value="prata">Prata</option>
                <option value="ouro">Ouro</option>
            </select>
        </div>
    );
}

export default Promocao;
