import React, { createContext, useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import authService from '../services/AuthService';

// Contexto de autenticacion. El token se mantiene en memoria del componente
// (no en localStorage), tal como indica la guia de la Clase 5: al recargar la
// pagina se pierde la sesion, es intencional.
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [token, setToken] = useState('');
    const [usuario, setUsuario] = useState(null);
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState('');

    // Mantiene el header Authorization sincronizado con el token en memoria.
    useEffect(() => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } else {
            delete axios.defaults.headers.common['Authorization'];
        }
    }, [token]);

    const login = useCallback(async (username, password) => {
        setCargando(true);
        setError('');
        try {
            const data = await authService.login(username, password);
            setToken(data.accessToken);
            const perfil = await authService.me(data.accessToken);
            setUsuario(perfil.username);
            return true;
        } catch (e) {
            setError('Credenciales incorrectas');
            setToken('');
            setUsuario(null);
            return false;
        } finally {
            setCargando(false);
        }
    }, []);

    const logout = useCallback(() => {
        setToken('');
        setUsuario(null);
        setError('');
    }, []);

    const consultarPerfil = useCallback(async () => {
        if (!token) return null;
        try {
            const perfil = await authService.me(token);
            setUsuario(perfil.username);
            return perfil;
        } catch (e) {
            // Token invalido o expirado: se cierra la sesion.
            logout();
            return null;
        }
    }, [token, logout]);

    const value = {
        token,
        usuario,
        cargando,
        error,
        isAuthenticated: Boolean(token),
        login,
        logout,
        consultarPerfil
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContext;
