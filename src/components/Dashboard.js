// src/components/Dashboard.js
import React from 'react';
import { Link, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Leads from './Leads';
import { Navigation } from 'react-minimal-side-navigation';
import LeadsAdd from './LeadsAdd';
import LeadsDetails from './LeadsDetails';
import Customers from './Customers';
import EmailLeads from './EmailLeads';
import DashboardHome from './DashboardHome';

const routes = [
    { path: '/', name: 'Dashboard', component: DashboardHome },
    { path: '/leads', name: 'Leads', component: Leads },
    { path: '/leads/create', name: 'Leads', component: LeadsAdd },
    { path: '/leads/email', name: 'Email Leads', component: EmailLeads },
    { path: '/leads/*', name: 'Leads Details', component: LeadsDetails },
    { path: '/customers/', name: 'Customers', component: Customers },
];


const Dashboard = ({ children }) => {
    const navigate = useNavigate();
    return (
        <div className="dashboard-container">
            <div className="sidebar">
                <Navigation
                    // you can use your own router's api to get pathname
                    activeItemId="/dashboard"
                    onSelect={({ itemId }) => {
                        // maybe push to the route
                        navigate(itemId);
                    }}
                    items={[
                        {
                            title: 'Dashboard',
                            itemId: '/dashboard',
                        },
                        {
                            title: 'Leads',
                            itemId: '/dashboard/leads',
                            subNav: [
                                {
                                    title: 'All Leads',
                                    itemId: '/dashboard/leads',
                                },
                                {
                                    title: 'Create',
                                    itemId: '/dashboard/leads/create',
                                },
                                {
                                    title: 'Email',
                                    itemId: '/dashboard/leads/email',
                                },
                            ],
                        },
                        {
                            title: 'Customers',
                            itemId: '/dashboard/customers',
                            subNav: [
                                {
                                    title: 'All Customers',
                                    itemId: '/dashboard/customers',
                                }
                            ],
                        }
                    ]}
                />
            </div>
            <div className="content">
                <main>
                    <Routes>
                        {routes.filter(route => route.component)
                            .map(({ path, component: Component }, idx) => (
                                <Route
                                    key={idx}
                                    path={path}
                                    element={<Component />}
                                />
                            ))}
                    </Routes>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
