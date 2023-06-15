import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import AdminPage from './pages/AdminPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter> 
  <Routes>
  <Route path='/' element={<MainPage />} />
  <Route path='/admin-panel' element={<AdminPage />} />
  </Routes>
  </BrowserRouter>
);
reportWebVitals();
