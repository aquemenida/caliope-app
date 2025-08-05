export default function Page() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Bienvenido a Caliope</h1>
      <p style={styles.subtitle}>Tu asistente de desarrollo inteligente</p>
      <button style={styles.button}>Empezar</button>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f0f2f5',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    fontSize: '48px',
    color: '#333',
    marginBottom: '16px',
  },
  subtitle: {
    fontSize: '24px',
    color: '#666',
    marginBottom: '32px',
  },
  button: {
    padding: '12px 24px',
    fontSize: '18px',
    color: '#fff',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};
