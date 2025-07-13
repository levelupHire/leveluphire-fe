import React from 'react'
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';

export default function PrivateRoute() {
    const navigate = useNavigate();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    return isAuthenticated ? <Outlet /> : navigate('/');
  }