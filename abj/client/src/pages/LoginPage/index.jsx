import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';
import Auth from '../../utils/auth';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    fetch('/graphql/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `mutation Login($input: LoginInput!) { login(input: $input) { success message token user { id username role } } }`,
        variables: { input: { username, password, clientMutationId: `login-${Date.now()}` } },
      }),
    })
      .then((r) => r.json())
      .then((res) => {
        setLoading(false);
        const resp = res.data.login;
        if (resp?.success) {
          Auth.login(resp.token);
          navigate('/');
        } else {
          alert(resp?.message || 'Login failed');
        }
      })
      .catch((err) => {
        setLoading(false);
        console.error(err);
        alert('Error during login');
      });
  };

  return (
    <Layout>
      <div style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              Username:
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </label>
          </div>
          <div>
            <label>
              Password:
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
          </div>
          <button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        </form>
      </div>
    </Layout>
  );
}