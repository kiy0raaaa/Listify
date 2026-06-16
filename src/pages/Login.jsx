import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { login, loginGoogle } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await login(email, password);
            navigate('/');
        } catch (err) {
            setError(err.message || 'Gagal masuk');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setError('');
        setLoading(true);
        try {
            await loginGoogle();
            navigate('/');
        } catch (err) {
            setError(err.message || 'Gagal masuk dengan Google');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <div className="auth-header">
                    <h1 className="auth-title">Masuk ke Listify</h1>
                    <p className="auth-subtitle">Catat barang belanjaanmu di mana saja!</p>
                </div>

                {error && <div className="auth-error">{error}</div>}

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="auth-field">
                        <label className="auth-label">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled={loading}
                            placeholder="email@example.com"
                            className="auth-input"
                        />
                    </div>
                    <div className="auth-field">
                        <label className="auth-label">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            disabled={loading}
                            placeholder="••••••••"
                            className="auth-input"
                        />
                    </div>
                    <Button type="submit" disabled={loading} className="w-full">
                        {loading ? 'Loading...' : 'Masuk'}
                    </Button>
                </form>

                <div className="auth-divider">
                    <div className="auth-divider-line"></div>
                    <span className="auth-divider-text">Atau</span>
                    <div className="auth-divider-line"></div>
                </div>

                <Button type="button" onClick={handleGoogleLogin} disabled={loading} className="w-full" variant="secondary">
                    Masuk dengan Google
                </Button>

                <div className="auth-footer">
                    Belum punya akun? <Link to="/register" className="auth-link">Daftar</Link>
                </div>
            </div>
        </div>
    );
}
