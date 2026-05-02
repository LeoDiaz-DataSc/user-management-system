import { useState, useEffect, useRef } from 'react';
import { getUsuarios, getAuditLogs } from '../../services/api';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

export default function Dashboard() {
    const [usuarios, setUsuarios] = useState([]);
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const container = useRef();

    useEffect(() => {
        const fetchData = async () => {
            try {
                // For demo purposes, if API isn't running, we catch the error
                const usersRes = await getUsuarios().catch(() => ({ success: false, data: [] }));
                const logsRes = await getAuditLogs().catch(() => ({ success: false, data: [] }));

                setUsuarios(usersRes.success ? usersRes.data : []);
                setLogs(logsRes.success ? logsRes.data : []);
            } catch (error) {
                console.error("Error fetching data", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // GSAP Entry Animation
    useGSAP(() => {
        if (!loading) {
            const tl = gsap.timeline();
            tl.from('.page-title, .page-subtitle', {
                y: -50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: 'power3.out'
            })
            .from('.metric-card', {
                y: 50,
                opacity: 0,
                duration: 0.6,
                stagger: 0.15,
                ease: 'back.out(1.7)'
            }, "-=0.4")
            .from('.audit-table-container', {
                opacity: 0,
                scale: 0.95,
                duration: 0.5,
                ease: 'power2.out'
            }, "-=0.2");
        }
    }, { dependencies: [loading], scope: container });

    if (loading) return <div className="loading-spinner"><div className="spinner"></div></div>;

    // Dummy data for presentation if DB is empty
    const displayLogs = logs.length > 0 ? logs : [
        { ID_Log: 1, Username: 'admin', Accion: 'LOGIN_SUCCESS', Fecha_Hora: new Date().toISOString(), Direccion_IP: '192.168.1.5' },
        { ID_Log: 2, Username: 'admin', Accion: 'CREATE_USER', Fecha_Hora: new Date(Date.now() - 3600000).toISOString(), Direccion_IP: '192.168.1.5' },
        { ID_Log: 3, Username: null, Accion: 'LOGIN_FAILED', Fecha_Hora: new Date(Date.now() - 7200000).toISOString(), Direccion_IP: '10.0.0.99' }
    ];

    return (
        <div className="dashboard-container" ref={container}>
            <h1 className="page-title">Identity & Access Management</h1>
            <p className="page-subtitle">Panel de Control Global (IAM)</p>

            <div className="grid-container" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
                <div className="card metric-card">
                    <div className="card-header">
                        <h2 className="card-title">Usuarios Activos</h2>
                    </div>
                    <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--color-primary)' }}>
                        {usuarios.length || 1}
                    </div>
                </div>
                <div className="card metric-card">
                    <div className="card-header">
                        <h2 className="card-title">Roles Configurables</h2>
                    </div>
                    <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--color-success)' }}>
                        4
                    </div>
                </div>
                <div className="card metric-card">
                    <div className="card-header">
                        <h2 className="card-title">Alertas de Seguridad</h2>
                    </div>
                    <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--color-danger)' }}>
                        {displayLogs.filter(l => l.Accion.includes('FAILED')).length}
                    </div>
                </div>
            </div>

            <div className="card audit-table-container" style={{ marginTop: '2rem' }}>
                <div className="card-header">
                    <h2 className="card-title">Registro de Auditoría (Audit Logs)</h2>
                </div>
                <div style={{ overflowX: 'auto', marginTop: '1rem' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                                <th style={{ padding: '12px' }}>ID</th>
                                <th style={{ padding: '12px' }}>Usuario</th>
                                <th style={{ padding: '12px' }}>Acción</th>
                                <th style={{ padding: '12px' }}>IP Origen</th>
                                <th style={{ padding: '12px' }}>Fecha</th>
                            </tr>
                        </thead>
                        <tbody>
                            {displayLogs.map(log => (
                                <tr key={log.ID_Log} style={{ borderBottom: '1px solid var(--color-border)' }}>
                                    <td style={{ padding: '12px' }}>#{log.ID_Log}</td>
                                    <td style={{ padding: '12px', color: log.Username ? 'var(--color-primary)' : 'var(--color-text-muted)' }}>
                                        {log.Username || 'Desconocido'}
                                    </td>
                                    <td style={{ padding: '12px' }}>
                                        <span style={{ 
                                            padding: '4px 8px', 
                                            borderRadius: '4px', 
                                            fontSize: '0.85rem',
                                            background: log.Accion.includes('FAILED') ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)',
                                            color: log.Accion.includes('FAILED') ? 'var(--color-danger)' : 'var(--color-success)'
                                        }}>
                                            {log.Accion}
                                        </span>
                                    </td>
                                    <td style={{ padding: '12px', fontFamily: 'monospace' }}>{log.Direccion_IP}</td>
                                    <td style={{ padding: '12px', color: 'var(--color-text-muted)' }}>{new Date(log.Fecha_Hora).toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
