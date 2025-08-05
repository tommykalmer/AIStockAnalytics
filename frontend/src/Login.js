import React, { useState } from 'react';

const Login = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === 'banan') {
      localStorage.setItem('authenticated', 'true');
      onLogin();
    } else {
      setError('Fel lösenord.');
    }
  };

  return (
    <div style={{ maxWidth: 300, margin: 'auto', paddingTop: 100 }}>
      <h2>Logga in</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Lösenord"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: '100%', padding: 8, marginBottom: 10 }}
        />
        <button type="submit" style={{ width: '100%', padding: 8 }}>Logga in</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default Login;