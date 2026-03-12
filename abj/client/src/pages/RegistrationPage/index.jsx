import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';


export default function RegistrationPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
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
        query: `mutation CreateUser($input: CreateUserInput!) { createUser(input: $input) { success message token user { id username } } }`,
        variables: { input: { username, email, password, clientMutationId: `reg-${Date.now()}` } },
      }),
    })
      .then((r) => r.json())
      .then((res) => {
        setLoading(false);
        const resp = res.data.createUser;
        if (resp?.success) {
          alert('Registration successful');
          navigate('/login');
        } else {
          alert(resp?.message || 'Failed to register');
        }
      })
      .catch((err) => {
        setLoading(false);
        console.error(err);
        alert('Error during registration');
      });
  };

  return (
    <Layout>
      <div style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
        <h2>Register</h2>
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
              Email:
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
      </div>
    </Layout>
  );
}