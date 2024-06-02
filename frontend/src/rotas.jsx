import { BrowserRouter, Route, Routes } from "react-router-dom";
import PaginaInicial from "./pages/paginaInicial/PaginaInicial";
import Produtos from "./pages/Produtos/Produtos";
import Sidebar from "./components/layout/Sidebar";
import AddProdutos from "./pages/add/addprodutos";
import Cliente from "./pages/clientes/Cliente"; 
import Promocao from "./pages/promocoes/promocao";
import MeusProdutos from "./pages/meusProdutos/MeusProdutos"

import Message from './layout/Message'
import AddCliente from "./pages/addCliente/AddCliente";



function Rotas() {
  return (
    <BrowserRouter>
      <Sidebar />

      <Message/>

      <Routes>

        <Route path="/" element={<Produtos />} />
        <Route path="/produtos" element={<Produtos />} />
        <Route path="/addProdutos" element={<AddProdutos />} />
        <Route path="/cliente" element={<Cliente />} />
        <Route path="/AddCliente" element={<AddCliente />} />
        <Route path="/promocoes" element={<Promocao />} />
        <Route path="/cliente/meusprodutos/:id" element={<MeusProdutos/>}/>

      </Routes>
    </BrowserRouter>
  );
}

export default Rotas;
