import { gql } from '@apollo/client';
import client from './apolloClient';

const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
      userId
      firstName
      lastName
      role
    }
  }
`;

const REGISTER_MUTATION = gql`
  mutation Register($username: String!, $email: String!, $password: String!, $role: String!) {
    createUser(username: $username, email: $email, password: $password, role: $role) {
      id
      username
      email
      role
    }
  }
`;


export const login = async (data: { username: string; password: string }) => {
  try {
    const response = await client.mutate({
      mutation: LOGIN_MUTATION,
      variables: { email: data.username, password: data.password },
    });

    const { token, userId, firstName, lastName, role } = response.data.loginUser;
    // Store the token and user details in localStorage
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
    localStorage.setItem('firstName', firstName);
    localStorage.setItem('lastName', lastName);
    localStorage.setItem('role', role);
    localStorage.setItem('userName', `${firstName} ${lastName}`);
    localStorage.setItem('email', data.username);
    
    return { token, userId, firstName, lastName, role };
  } catch (error) {
    console.error('Login failed:', error);
    throw new Error('Login failed');
  }
};

// Register function
export const register = async (data:any) => {
  try {
    const response = await client.mutate({
      mutation: REGISTER_MUTATION,
      variables: { username: data.email, email: data.email, password: data.password, role: 'USER' },
    });
    return response.data.createUser;
  } catch (error) {
    console.error('Registration failed:', error);
    throw new Error('Registration failed');
  }
};

// Logout function
export const logout = () => {
  localStorage.clear();
};
