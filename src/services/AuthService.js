import axios from 'axios';

const API = 'http://localhost:8080';

class AuthService {
    async login(username, password) {
        const response = await axios.post(`${API}/api/auth/login`, {
            username,
            password
        });
        return response.data; // { accessToken, tokenType }
    }

    async me(token) {
        const response = await axios.get(`${API}/api/usuarios/me`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data; // { username }
    }
}

const authService = new AuthService();
export default authService;
