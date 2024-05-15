import React, { useState } from "react";
import "./Sidebar.css";
import { Divider } from "antd";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaBoxOpen } from "react-icons/fa";
import { FaPeopleLine } from "react-icons/fa6";
import { BiBarChartAlt2 } from "react-icons/bi";
import { BiDollar } from "react-icons/bi";
import { IoMdPersonAdd } from "react-icons/io";
import Logo from "../../asserts/icones/solarcocacola.png"
import { BsPlusCircleFill } from "react-icons/bs";

const Navbar = () => {
    return (
        <aside className="sidebar">
        
        <img src={Logo} alt="logo" width={180} />
        <header className="sidebar-header">
          <img className="logo-perfil" src="https://thispersondoesnotexist.com/" alt="fotoexemplo"></img>
          <div className="info-perfil">
            <h2>Exemplo</h2> 
            <p>exemplo@gmail.com</p>
          </div>
        </header>
        <Divider style={{ margin: "10px 0", backgroundColor: "#9CA3AF" }} />
        <nav>
          <Link to="/">
            <button>
              <span>
                <FaHome />
                <span>Página inicial</span>
              </span>
            </button>
          </Link>

          <Link to="/produtos">
            <button>
              <span>
                <FaBoxOpen  />
                <span>Produtos</span>
              </span>
            </button>
          </Link>

          <button>
            <span>
              <FaPeopleLine/>
               <span>Clientes</span>
            </span>
          </button>

          <Link to="/">
          <button>
            <span>
            <BiBarChartAlt2/>
               <span>Relatórios</span>
            </span>
          </button>
          </Link>

          <Link to="/produtos">
          <button>
            <span>
            <BiDollar/>
               <span>Promoções</span>
            </span>
          </button>
          </Link>

          <Divider style={{ margin: "10px 0", backgroundColor: "#9CA3AF" }} />

          <Link to="/">
          <button>
            <span>
            <IoMdPersonAdd />
               <span>Add Cliente</span>
            </span>
          </button>
          </Link>

          <Link to="/addProdutos">
          <button>
            <span>
            <BsPlusCircleFill />
               <span>Add Produtos</span>
            </span>
          </button>
          </Link>
        </nav>
      </aside>
  )
}

export default Navbar