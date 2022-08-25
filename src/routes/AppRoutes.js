import React from 'react'
import {
    Navigate,
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import AddForm from '../components/AddForm';
import Dashboard from '../components/Dashboard';
import List from '../components/List';
import NavBar from '../components/NavBar';

const AppRoutes = () => {
    return (
        <>
            <BrowserRouter >
                <NavBar />
                <Routes>
                    <Route path='/' element={<AddForm />} />
                    <Route path='/reporte' element={<Dashboard />} />
                    <Route path='/tabla-clientes' element={<List />} />
                    <Route path='*' element={<Navigate to="/" />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default AppRoutes