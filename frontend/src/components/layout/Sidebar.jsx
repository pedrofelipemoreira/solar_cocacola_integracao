import React from "react";
import "./Sidebar.css";
import { Divider } from "antd";
import { AiOutlineAppstore, AiOutlineUsergroupAdd, AiOutlineDollarCircle, AiOutlineUserAdd } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import Logo from "../../asserts/icones/solarcocacola.png"

const Navbar = () => {
    const location = useLocation();
    
    // Função para truncar o e-mail
    const truncateEmail = (email) => {
      const maxLength = 14;
      if (email.length > maxLength) {
          return `${email.slice(0, maxLength)}...`;
      }
      return email;
  };

    const email = "exemplo@gmail.com";
    const truncatedEmail = truncateEmail(email);

    return (
        <aside className="sidebar">
            <img src={Logo} alt="logo" className="sidebar-logo" />
            <header className="sidebar-header">
                <img className="sidebar-logo-perfil" src="https://thispersondoesnotexist.com/" alt="fotoexemplo" />
                <div className="sidebar-info-perfil">
                    <h2>Exemplo</h2>
                    <p>{truncatedEmail}</p>
                </div>
            </header>
            <Divider className="sidebar-divider" />
            <nav className="sidebar-nav">
                <Link to="/produtos">
                    <button className={`sidebar-button ${location.pathname === "/produtos" ? "sidebar-selected" : ""}`}>
                        <AiOutlineAppstore className="sidebar-icon" />
                        <span>Produtos</span>
                    </button>
                </Link>
                <Link to="/cliente">
                    <button className={`sidebar-button ${location.pathname === "/cliente" ? "sidebar-selected" : ""}`}>
                        <AiOutlineUsergroupAdd className="sidebar-icon" />
                        <span>Clientes</span>
                    </button>
                </Link>
                <Link to="/promocoes">
                    <button className={`sidebar-button ${location.pathname === "/promocoes" ? "sidebar-selected" : ""}`}>
                        <AiOutlineDollarCircle className="sidebar-icon" />
                        <span>Promoções</span>
                    </button>
                </Link>
                <Divider className="sidebar-divider" />
                <Link to="/addcliente">
                    <button className={`sidebar-button ${location.pathname === "/addcliente" ? "sidebar-selected" : ""}`}>
                        <AiOutlineUserAdd className="sidebar-icon" />
                        <span>Add Cliente</span>
                    </button>
                </Link>
                <Link to="/addProdutos">
                    <button className={`sidebar-button ${location.pathname === "/addProdutos" ? "sidebar-selected" : ""}`}>
                        <AiOutlineAppstore className="sidebar-icon" />
                        <span>Add Produtos</span>
                    </button>
                </Link>
            </nav>
        </aside>
    );
};

export default Navbar;
