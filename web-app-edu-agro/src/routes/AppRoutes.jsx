import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Login } from '../pages/Login';
import { Register } from '../pages/Register';
import { Home } from '../pages/Home';
import { RecuperarSenha } from '../pages/RecuperarSenha';
import { Contato } from '../pages/Contato';
import { Catalogo } from '../pages/Catalogo';
import { Sobre } from '../pages/Sobre';
import { Admin } from '../pages/Admin';

//Adicionando rotas

export function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<Home />} />
                <Route path="/recuperarSenha" element={<RecuperarSenha />} />
                <Route path="/contato" element={<Contato />} />
                <Route path="/catalogo" element={<Catalogo />} />
                <Route path="/sobre" element={<Sobre />} />
                <Route path="/admin" element={<Admin />} />
            </Routes>
        </BrowserRouter>
    )
}