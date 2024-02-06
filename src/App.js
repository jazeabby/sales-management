// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Switch } from 'react-router-dom';


import Login from './components/Login';
import Dashboard from './components/Dashboard';

function OnlyAuth(Component) {
  const isAuthenticated = localStorage.getItem('login-token') ? true : false;
  console.log(isAuthenticated);
  if (!isAuthenticated)
    return <Navigate to="/" />;
  return <Component />;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* <Route path="/leads" element={OnlyAuth(Leads)} /> */}
        {/* <Route path="/dashboard" exact> */}
        {/* <Route path="/dashboard/leads" element={<Leads/>} /> */}
        <Route path="/dashboard" element={OnlyAuth(Dashboard)} />
        <Route path="/dashboard/*" element={OnlyAuth(Dashboard)} />
      </Routes>
    </Router>
  );
}

export default App;
