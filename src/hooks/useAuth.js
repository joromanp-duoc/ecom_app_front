import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

// Hook de autenticacion. Se mantiene en hooks/ por coherencia con el resto
// del proyecto (ver hooks/useCarrito.js).
export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) {
        throw new Error('useAuth debe usarse dentro de un AuthProvider');
    }
    return ctx;
}

export default useAuth;
