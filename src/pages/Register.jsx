import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { register, loginGoogle } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Password tidak cocok');
            return;
        }

        setLoading(true);

        try {
            await register(email, password);
            navigate('/');
        } catch (err) {
            setError(err.message || 'Gagal mendaftar');
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
                    <h1 className="auth-title">Daftar di Listify</h1>
                    <p className="auth-subtitle">Buat akun untuk menyimpan catatanmu!</p>
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
                    <div className="auth-field">
                        <label className="auth-label">Konfirmasi Password</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            disabled={loading}
                            placeholder="••••••••"
                            className="auth-input"
                        />
                    </div>
                    <Button type="submit" disabled={loading} className="w-full">
                        {loading ? 'Loading...' : 'Daftar'}
                    </Button>
                </form>

                <div className="auth-divider">
                    <div className="auth-divider-line"></div>
                    <span className="auth-divider-text">Atau</span>
                    <div className="auth-divider-line"></div>
                </div>

                <Button type="button" onClick={handleGoogleLogin} disabled={loading} className="w-full" variant="secondary">
                    Daftar dengan Google
                </Button>

                <div className="auth-footer">
                    Sudah punya akun? <Link to="/login" className="auth-link">Masuk</Link>
                </div>
            </div>
        </div>
    );
}
