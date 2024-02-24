import React, { useState } from 'react';
import { commitMutation } from 'react-relay';
import environment1 from '../../network';
import graphql from 'babel-plugin-relay/macro';

// GraphQL mutation for registering a user
const mutation = graphql`
  mutation RegistrationFormMutation($input: RegisterInput!) {
    register(input: $input) {
      token
      user {
        username
        email
      }
    }
  }
`;

function RegistrationForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Call the function to create the input object
    const registerInput = createRegisterInput(username, email, password);

    // Send the `registerInput` object to your server using the register mutation
    commitMutation(environment1, {
      mutation,
      variables: {
        input: registerInput,
      },
      onCompleted: (response, errors) => {
        console.log('Registration successful:', response);
        // Handle successful registration, e.g., navigate to another page
      },
      onError: (error) => {
        console.error('Registration failed:', error);
        // Handle registration error, e.g., show an error message
      },
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <label>
        Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <button type="submit">Register</button>
    </form>
  );
}

function createRegisterInput(username, email, password) {
  return {
    input: {
      username: username,
      email: email,
      password: password,
    },
  };
}

export default RegistrationForm;
