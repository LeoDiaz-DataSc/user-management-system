import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { login } from '../../services/api';

gsap.registerPlugin(useGSAP);

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const container = useRef();
    const navigate = useNavigate();

    useGSAP(() => {
        const tl = gsap.timeline();
        tl.from('.login-card', {
            y: 30,
            opacity: 0,
            duration: 0.6,
            ease: 'power3.out'
        })
        .from('.login-element', {
            y: 20,
            opacity: 0,
            duration: 0.4,
            stagger: 0.1,
            ease: 'power2.out'
        }, "-=0.2");
    }, { scope: container });

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const data = await login(username, password);
            if (data.success) {
                localStorage.setItem('iam_user', JSON.stringify(data.user));
                gsap.to('.login-card', {
                    scale: 0.95,
                    opacity: 0,
                    duration: 0.3,
                    onComplete: () => navigate('/dashboard')
                });
            } else {
                setError(data.message || 'Error de autenticación');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Credenciales inválidas');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div 
            ref={container} 
            style={{ 
                minHeight: '100vh', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                background: 'var(--color-bg-primary)' 
            }}
        >
            <div className="login-card card" style={{ maxWidth: '400px', width: '100%', padding: '2rem' }}>
                <div className="login-element" style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🛡️</div>
                    <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--color-primary)' }}>IAM System</h1>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginTop: '0.5rem' }}>Identity Access Management</p>
                </div>

                {error && (
                    <div className="login-element" style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'var(--color-danger)', padding: '0.75rem', borderRadius: '4px', marginBottom: '1rem', fontSize: '0.9rem', textAlign: 'center', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin}>
                    <div className="login-element" style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>Usuario</label>
                        <input 
                            type="text" 
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid var(--color-border)', background: 'var(--color-bg-secondary)', color: 'var(--color-text)' }}
                            required
                            autoFocus
                        />
                    </div>
                    <div className="login-element" style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>Contraseña</label>
                        <input 
                            type="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid var(--color-border)', background: 'var(--color-bg-secondary)', color: 'var(--color-text)' }}
                            required
                        />
                    </div>
                    <button 
                        className="login-element btn btn-primary" 
                        type="submit" 
                        disabled={loading}
                        style={{ width: '100%', padding: '0.75rem', justifyContent: 'center', fontWeight: 'bold' }}
                    >
                        {loading ? 'Autenticando...' : 'Iniciar Sesión'}
                    </button>
                </form>
            </div>
        </div>
    );
}
