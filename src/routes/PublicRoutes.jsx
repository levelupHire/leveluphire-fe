import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom';

export default function PublicRoute() {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const navigate = useNavigate();
    return !isAuthenticated ? <Outlet /> : navigate('/dashboard');
  }