import { useState, useEffect } from 'react';
import API_URL from './utils/api';

function App() {
  const [tareitas, setTareitas] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const [nuevaTareita, setNuevaTareita] = useState('');
  const [mostrarModal, setMostrarModal] = useState(false);

  useEffect(() => {
    fetchTareitas();
  }, []);

  const fetchTareitas = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setTareitas(data);
    } catch (error) {
      console.error('Error al obtener tareas:', error);
    }
  };

  const eliminarTareita = async (codigo) => {
    const response = await fetch(`${API_URL}/${codigo}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      const result = await response.json();
      setMensaje(result.message);
      fetchTareitas();
    } else {
      const error = await response.json();
      setMensaje(error.error || 'Error al eliminar tarea.');
    }
  };

  const agregarTareita = async () => {
    if (!nuevaTareita.trim()) {
      setMensaje('El título no puede estar vacío.');
      return;
    }

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ titulo: nuevaTareita }),
    });

    if (response.ok) {
      setNuevaTareita('');
      setMensaje('Tarea agregada correctamente.');
      fetchTareitas();
      setMostrarModal(false);
    } else {
      const error = await response.json();
      setMensaje(error.error || 'Error al agregar tarea.');
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', background: '#f8f9fa', padding: '2rem' }}>
      <div style={{ margin: '0 auto', background: '#fff', padding: '2rem'}}>
        <h1 style={{ color: '#ff0000ff', textAlign: 'center' }}>📋 TAREITAS</h1>

        <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
          <button
            onClick={() => setMostrarModal(true)}
            style={{
              background: '#ff0000ff',
              color: '#fff',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '1rem',
            }}
            onMouseOver={(e) => (e.target.style.background = '#b30000ff')}
            onMouseOut={(e) => (e.target.style.background = '#ff0000ff')}
          >
            ➕ Agregar Tareita
          </button>
        </div>

        {mensaje && (
          <p style={{ color: '#28a745', background: '#e9f7ef', padding: '0.5rem', borderRadius: '4px' }}>{mensaje}</p>
        )}

        <h2 style={{ borderBottom: '2px solid #ff0000ff', paddingBottom: '0.5rem' }}>Lista de Tareitas</h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {tareitas.map((t) => (
            <li
              key={t.codigo}
              style={{
                background: '#f1f1f1',
                margin: '0.5rem 0',
                padding: '0.75rem 1rem',
                borderRadius: '4px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              {t.titulo}
              <button
                onClick={() => eliminarTareita(t.codigo)}
                style={{
                  background: '#dc3545',
                  color: '#fff',
                  border: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
                onMouseOver={(e) => (e.target.style.background = '#b02a37')}
                onMouseOut={(e) => (e.target.style.background = '#dc3545')}
              >
                🗑 Eliminar
              </button>
            </li>
          ))}
        </ul>
      </div>

      {mostrarModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
          }}
        >
          <div
            style={{
              background: '#fff',
              padding: '2rem',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
              minWidth: '300px',
            }}
          >
            <h3 style={{ color: '#ff0000ff', marginBottom: '1rem' }}>Agregar Nueva Tareita</h3>
            <input
              value={nuevaTareita}
              onChange={(e) => setNuevaTareita(e.target.value)}
              placeholder="Título de la tarea"
              style={{
                width: '100%',
                padding: '0.75rem',
                marginBottom: '1rem',
                border: '1px solid #ccc',
                borderRadius: '4px',
                fontSize: '1rem',
              }}
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
              <button
                onClick={() => setMostrarModal(false)}
                style={{
                  background: '#6c757d',
                  color: '#fff',
                  border: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
                onMouseOver={(e) => (e.target.style.background = '#5a6268')}
                onMouseOut={(e) => (e.target.style.background = '#6c757d')}
              >
                Cancelar
              </button>
              <button
                onClick={agregarTareita}
                style={{
                  background: '#ff0000ff',
                  color: '#fff',
                  border: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
                onMouseOver={(e) => (e.target.style.background = '#870808ff')}
                onMouseOut={(e) => (e.target.style.background = '#ff0400ff')}
              >
                Agregar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
